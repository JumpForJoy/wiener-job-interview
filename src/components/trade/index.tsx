import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

import MonetizationOn from "@mui/icons-material/MonetizationOn";

import { Title } from "../title";

import { TradeInfo } from "./tradeInfo";
import { TradeExchange } from "./tradeExchange";
import { TradeWallet } from "./tradeWallet";

export const Trade = () => {
  return (
    <Stack spacing={4}>
      <Card>
        <CardHeader title={<Title label="Galactic Trade" />} />
      </Card>

      <Divider>
        <MonetizationOn />
      </Divider>

      <Card>
        <CardHeader title={<Title label="Currencies" />} />

        <CardContent>
          <TradeInfo />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <CardHeader title={<Title label="Exchange" />} />

              <TradeExchange />
            </Grid>

            <Grid item xs={12} md={8}>
              <CardHeader title={<Title label="Wallet" />} />

              <TradeWallet />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};
