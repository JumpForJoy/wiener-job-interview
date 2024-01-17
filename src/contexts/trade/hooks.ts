import { useContext } from "react";

import { TradeContext, TradeDispatchContext, TState } from "./";

export const useTrade: () => TState = () => {
  return useContext(TradeContext);
};

export const useTradeDispatch = () => {
  return useContext(TradeDispatchContext);
};
