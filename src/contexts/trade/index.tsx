import { ReactNode, createContext, useReducer } from "react";

import FlareIcon from "@mui/icons-material/Flare";
import AnimationIcon from "@mui/icons-material/Animation";
import BedroomBabyIcon from "@mui/icons-material/BedroomBaby";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import CycloneIcon from "@mui/icons-material/Cyclone";

import { TCurrencySymbols } from "../../types";

const GC_SYMBOL = "GC"; // "Galactic Credits" symbol
const WP_SYMBOL = "WP"; // "Wupiupi" symbol
const PG_SYMBOL = "PG"; // "Peggats" symbol
const YC_SYMBOL = "YC"; // "Yoda coins" symbol
const NL_SYMBOL = "NL"; // "Nebula" symbol

type TCurrency = {
  [Key in TCurrencySymbols as string]: {
    id: TCurrencySymbols;
    name: string;
    Sign: ReactNode;
    baseValue: number;
    amount: number;
    amountFree: number;
    history: string;
  };
};

type TWallet = {
  [Key in TCurrencySymbols as string]: number;
};

type DispatchProps = { type: "updated"; props?: Partial<TState> };

// baseValue - the price for 100 kg of Coaxium

export type TState = {
  from: TCurrencySymbols;
  to: TCurrencySymbols;
  amount: number;
  wallet: TWallet;
  currencies: TCurrency;
};

const initialState: TState = {
  from: GC_SYMBOL,
  to: WP_SYMBOL,
  amount: 0,
  wallet: {
    [GC_SYMBOL]: 1000000,
    [WP_SYMBOL]: 0,
    [PG_SYMBOL]: 0,
    [YC_SYMBOL]: 0,
    [NL_SYMBOL]: 0,
  },
  currencies: {
    [GC_SYMBOL]: {
      id: GC_SYMBOL,
      name: "Galactic Credits",
      Sign: <FlareIcon />,
      baseValue: 60000000,
      amount: 21029771,
      amountFree: 20929771,
      history:
        "The galactic credit standard was established on Sojourn. From its inception, the credit was backed by the immense natural resources of the planet Aargau which was claimed by the InterGalactic Banking Clan (IGBC). During the Clone Wars, the IGBC provided loans and financial aid to both sides, as it would do again decades later for the New Republic and Imperial Remnant.",
    },
    [WP_SYMBOL]: {
      id: WP_SYMBOL,
      name: "Wupiupi",
      Sign: <AnimationIcon />,
      baseValue: 96000000,
      amount: 1099101,
      amountFree: 1099101,
      history:
        "The wupiupi is a type of golden currency used by the Hutts on the planet Tatooine. Around the time of the Invasion of Naboo, large amphibians called gorgs were sold in the Mos Espa Market for seven wupiupi apiece, which was considered a princely sum.",
    },
    [PG_SYMBOL]: {
      id: PG_SYMBOL,
      name: "Peggats",
      Sign: <BedroomBabyIcon />,
      baseValue: 1500000,
      amount: 3175848,
      amountFree: 3175848,
      history:
        "The peggat was a Huttese currency made of gold. During the last decades of the Galactic Republic, it was used in the Outer Rim Territories on Hutt-dominated planets such as Tatooine.",
    },
    [YC_SYMBOL]: {
      id: YC_SYMBOL,
      name: "Yoda coins",
      Sign: <ChildCareIcon />,
      baseValue: 53000000,
      amount: 1000000,
      amountFree: 1000000,
      history:
        "A currency created in honor of Yoda. Yoda was a legendary Jedi Master who led the Jedi Order through the time of the High Republic, in the years leading up to its destruction by the Sith, and during the transformation of the Galactic Republic into the Galactic Empire. Small in stature but revered for his wisdom and power, Yoda trained generations of Jedi, ultimately serving as the Jedi Order's Grand Master.",
    },
    [NL_SYMBOL]: {
      id: NL_SYMBOL,
      name: "Nebula",
      Sign: <CycloneIcon />,
      baseValue: 127000000,
      amount: 1200500,
      amountFree: 1200500,
      history:
        "A currency incarnaited with the powerful, outstanding, out of this space sound of Nebula as a big thanks for their legacy.",
    },
  },
};

export const TradeContext = createContext(initialState);

export const TradeDispatchContext = createContext<
  ((props: DispatchProps) => void) | null
>(null);

const reducer = (context: TState, { type, props }: DispatchProps): TState => {
  switch (type) {
    case "updated": {
      return { ...context, ...props };
    }
    default: {
      throw Error(`Unknown action: ${type}`);
    }
  }
};

export const TradeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TradeContext.Provider value={state}>
      <TradeDispatchContext.Provider value={dispatch}>
        {children}
      </TradeDispatchContext.Provider>
    </TradeContext.Provider>
  );
};
