import { Refine } from "@refinedev/core";
import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import GroupsIcon from "@mui/icons-material/Groups";
import AdbIcon from "@mui/icons-material/Adb";
import SnowmobileIcon from "@mui/icons-material/Snowmobile";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LiveTvIcon from "@mui/icons-material/LiveTv";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { ColorModeContextProvider } from "./contexts/color-mode";
import { TradeProvider } from "./contexts/trade";
import { Header } from "./components/header";
import { Sider } from "./components/sider";
import { List } from "./pages/list";

import { Home } from "./pages/home";
import { PlanetsShow } from "./pages/planets";
import { PeopleShow } from "./pages/people";
import { SpeciesShow } from "./pages/species";
import { VehiclesShow } from "./pages/vehicles";
import { StarshipsShow } from "./pages/starships";
import { FilmsShow } from "./pages/films";
import { Favorites } from "./pages/favorites";
import { Trade } from "./pages/trade";

import { dataProvider } from "./rest-data-provider";

const API_URL = "https://swapi.dev/api";

const resourcesData = [
  {
    name: "planets",
    Icon: TravelExploreIcon,
    ShowPage: PlanetsShow,
  },
  {
    name: "people",
    Icon: GroupsIcon,
    ShowPage: PeopleShow,
  },
  {
    name: "species",
    Icon: AdbIcon,
    ShowPage: SpeciesShow,
  },
  {
    name: "vehicles",
    Icon: SnowmobileIcon,
    ShowPage: VehiclesShow,
  },
  {
    name: "starships",
    Icon: RocketLaunchIcon,
    ShowPage: StarshipsShow,
  },
  {
    name: "films",
    Icon: LiveTvIcon,
    ShowPage: FilmsShow,
  },
];

function App() {
  return (
    <BrowserRouter>
      <ColorModeContextProvider>
        <TradeProvider>
          <CssBaseline />

          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />

          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider(API_URL)}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              resources={resourcesData.map(({ name, Icon }) => ({
                name,
                list: `/${name}`,
                show: `/${name}/:id`,
                meta: {
                  icon: <Icon />,
                },
              }))}
              options={{
                syncWithLocation: true,
                useNewQueryKeys: true,
                projectId: "xPlnvx-lOGjvJ-PUVA6C",
              }}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2
                      initialSiderCollapsed
                      Header={() => <Header sticky />}
                      Sider={() => <Sider />}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route index element={<Home />} />

                  {resourcesData.map(({ name, ShowPage }) => (
                    <Route key={`parent-route-${name}`} path={`/${name}`}>
                      <Route index element={<List />} />

                      <Route path=":id" element={<ShowPage />} />
                    </Route>
                  ))}

                  <Route path="favorites" element={<Favorites />} />

                  <Route path="trade" element={<Trade />} />

                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>

              <UnsavedChangesNotifier />

              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </TradeProvider>
      </ColorModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
