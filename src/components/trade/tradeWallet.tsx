import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { useTrade } from "../../contexts/trade/hooks";

export const TradeWallet = () => {
  const { from, to, wallet, currencies } = useTrade();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>

            <TableCell align="right">Sign</TableCell>

            <TableCell align="right">Name</TableCell>

            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Object.entries(wallet).map(([id, amount]) => {
            const { Sign, name } = currencies[id];

            return (
              <TableRow
                key={`wallet-row-${id}`}
                sx={{
                  boxShadow:
                    id === from || id === to
                      ? `inset ${
                          id === from ? "" : "-"
                        }5px 0 0 rgb(25, 118, 210)`
                      : "none",
                }}
              >
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>

                <TableCell align="right">{Sign}</TableCell>

                <TableCell align="right">{name}</TableCell>

                <TableCell align="right">{amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
