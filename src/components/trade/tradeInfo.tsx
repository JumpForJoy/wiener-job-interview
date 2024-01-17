import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useTrade } from "../../contexts/trade/hooks";

import { FeatureRow } from "../featureRow";

export const TradeInfo = () => {
  const { currencies } = useTrade();

  return (
    <Box>
      {Object.values(currencies).map(
        ({ id, name, Sign, baseValue, amount, amountFree, history }) => (
          <Accordion
            key={`currency-${id}`}
            sx={{ border: "1px solid rgba(255, 255, 255, 0.3)" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Stack flexDirection="row" alignItems="center" gap={1}>
                {Sign}

                <Typography fontWeight="bold" color="primary">
                  {name}
                </Typography>
              </Stack>
            </AccordionSummary>

            <AccordionDetails>
              <Stack spacing={3}>
                <FeatureRow title="Symbol" value={id} />

                <FeatureRow title="Base value" value={baseValue} />

                <FeatureRow title="Amount - total" value={amount} />

                <FeatureRow title="Amount - free to buy" value={amountFree} />

                <FeatureRow title="History" value={history} />
              </Stack>
            </AccordionDetails>
          </Accordion>
        )
      )}

      <br />

      <Typography variant="caption">
        * Base value - the price for 100kg of Coaxium
      </Typography>
    </Box>
  );
};
