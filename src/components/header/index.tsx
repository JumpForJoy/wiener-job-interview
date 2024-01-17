import React, { useContext } from "react";
import { useGo } from "@refinedev/core";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import Favorite from "@mui/icons-material/Favorite";
import Calculate from "@mui/icons-material/Calculate";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";

import { ColorModeContext } from "../../contexts/color-mode";

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { mode, setMode } = useContext(ColorModeContext);
  const go = useGo();

  return (
    <AppBar position={sticky ? "sticky" : "relative"}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <HamburgerMenu />

          <Stack
            spacing={1}
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <IconButton
              title="Favorites"
              color="inherit"
              onClick={() => go({ to: "/favorites" })}
            >
              <Favorite />
            </IconButton>

            <IconButton
              title="Galactic Trade"
              color="inherit"
              onClick={() => go({ to: "/trade" })}
            >
              <Calculate />
            </IconButton>

            <IconButton
              title="Toggle theme"
              color="inherit"
              onClick={() => {
                setMode();
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
