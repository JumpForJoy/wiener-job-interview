import { useNotification } from "@refinedev/core";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { roundToPrecision, exchange } from "../../utils/trade";
import { TState } from "../../contexts/trade";
import { useTrade, useTradeDispatch } from "../../contexts/trade/hooks";

export const TradeExchange = () => {
  const { open } = useNotification();
  const { from, to, amount, wallet, currencies } = useTrade();
  const dispatch = useTradeDispatch();

  const baseFrom = currencies[from].baseValue;
  const baseTo = currencies[to].baseValue;

  const rate = roundToPrecision(baseFrom / baseTo);
  const total = roundToPrecision(rate * amount);

  const { amountFree } = currencies[to];
  const hasErrorTo = amountFree < amount;
  const hasErrorFrom = wallet[from] < total;
  const hasError = hasErrorTo || hasErrorFrom;

  const onDispatch = (props: Partial<TState>) =>
    dispatch && dispatch({ type: "updated", props });

  const onChange = (event: SelectChangeEvent, prop = "from") => {
    onDispatch({ [prop]: event.target.value as string });
  };

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={(event) => {
          event.preventDefault();

          const { status, data, error } = exchange({
            from,
            to,
            amount,
            amountFree,
            baseFrom,
            baseTo,
            wallet,
          });

          if (status === "success" && data) {
            const { changes, ...rest } = data;
            const currencyFrom = currencies[from];
            const currencyTo = currencies[to];
            const { moreFrom } = changes;

            open?.({
              key: "transaction-success",
              message: `You bought ${amount} ${to} for ${moreFrom} ${from}.`,
              description: "Your transaction succeeded",
              type: "success",
            });

            onDispatch({
              ...rest,
              currencies: {
                ...currencies,
                [from]: {
                  ...currencyFrom,
                  baseValue: Math.round(baseFrom + (1 * baseFrom) / 100),
                  amountFree: currencyFrom.amountFree + moreFrom,
                },
                [to]: {
                  ...currencyTo,
                  baseValue: Math.round(baseTo - (1 * baseTo) / 100),
                  amountFree: currencyTo.amountFree - changes.lessTo,
                },
              },
            });
          } else {
            open?.({
              key: "transaction-success",
              message: error,
              description: "We could not proceed you transaction",
              type: "error",
            });
          }
        }}
      >
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="currency-from-label">From</InputLabel>

            <Select
              labelId="currency-from-label"
              id="currency-from"
              value={from}
              label="Age"
              onChange={(event) => onChange(event)}
            >
              {Object.values(currencies).map(({ id, name }) => (
                <MenuItem
                  key={`from-${id}`}
                  value={id}
                >{`${name} (${id})`}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="currency-to-label">To</InputLabel>

            <Select
              labelId="currency-to-label"
              id="currency-to"
              value={to}
              label="Age"
              onChange={(event) => onChange(event, "to")}
            >
              {Object.values(currencies).map(({ id, name }) => (
                <MenuItem
                  key={`to-${id}`}
                  value={id}
                >{`${name} (${id})`}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="amount"
              name="amount"
              variant="outlined"
              label="Amount"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Amount"
              value={amount}
              onChange={({ currentTarget: { value } }) =>
                onDispatch({
                  amount: value ? Number(value.replace(/[^\d]/g, "")) : 0,
                })
              }
            />

            <FormHelperText>Only integer values are accepted.</FormHelperText>
          </FormControl>

          {hasError && (
            <FormHelperText error>
              {hasErrorTo
                ? "There are not enought free currency units to buy."
                : "There are not enough currency units in your wallet."}
            </FormHelperText>
          )}

          <Button
            type="submit"
            disabled={hasError || amount === 0}
            variant="contained"
          >
            Exchange
          </Button>
        </Stack>
      </Box>

      <p>Rate: {rate}</p>

      <p>Total amount to pay: {total}</p>
    </>
  );
};
