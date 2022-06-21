import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, IconButton, Tab, Tabs } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import React, { FC } from "react";

import LogoDarkMode from "../public/DarkModeLogo.svg";
import SECTIONS from "../src/navbarSections";
import AppHeaderSearchBar from "./AppHeaderSearchBar";

type Props = {
  showApply?: boolean;
  showMenu: boolean;
  showSearch: boolean;
  onCloseMenu: () => void;
  onShowMenu: () => void;
};
const AppAppBar: FC<Props> = ({ showApply = true, showMenu = false, showSearch = false, onCloseMenu, onShowMenu }) => {
  const router = useRouter();

  return (
    <AppBar data-testid="app-nav-bar">
      <Toolbar sx={{ height: "var(--navbar-height)", justifyContent: "space-between" }}>
        <LightTooltip title="1Cademy's Landing Page">
          <Box
            color="inherit"
            onClick={() => open("https://1cademy.us/home#LandingSection", "_blank")}
            sx={{
              fontSize: 24,
              margin: "4px 0px 0px 0px",
              cursor: "pointer",
              mr: { xs: "20px", md: "0px" }
            }}
          >
            <img src={LogoDarkMode.src} alt="logo" width="52px" />
          </Box>
        </LightTooltip>
        <Tabs
          value={SECTIONS.findIndex(cur => cur.route === router.route)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs navigation bar"
          sx={{
            px: "25px",
            marginLeft: "auto",
            fontWeight: 400,
            display: { xs: "none", md: "flex" },
            "& .MuiTab-root": {
              color: "#AAAAAA"
            },
            "& .MuiTab-root.Mui-selected": {
              color: "common.white"
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "common.orange"
            }
          }}
        >
          {SECTIONS.map((page, idx) => (
            <LightTooltip key={idx} title={page.title}>
              <Tab
                onClick={event => {
                  event.preventDefault();
                  if (page.label !== "NODE") open(page.route, "_blank");
                }}
                color="inherit"
                label={page.label}
                aria-label={page.title}
                sx={{
                  fontFamily: "Work Sans,sans-serif",
                  fontSize: "15px",
                  letterSpacing: "-1px"
                }}
              />
            </LightTooltip>
          ))}
        </Tabs>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          {(router.route !== "/" || (router.route === "/" && showSearch)) && (
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <AppHeaderSearchBar />
            </Box>
          )}
          {showApply && (
            <LightTooltip title="Apply to join 1Cademy">
              <Button
                variant="contained"
                color="primary"
                href="https://1cademy.us/home#JoinUsSection"
                target="_blank"
                rel="noreferrer"
                sx={{
                  minWidth: "80px",
                  display: { xs: "none", md: "block" },
                  fontSize: 16,
                  color: "common.white",
                  py: "15px",
                  px: "16px",
                  borderRadius: 40
                }}
              >
                APPLY!
              </Button>
            </LightTooltip>
          )}

          {showMenu && (
            <LightTooltip title="Account">
              <IconButton
                size="large"
                edge="end"
                onClick={onCloseMenu}
                color="inherit"
                sx={{
                  display: { xs: "flex", md: "none" }
                }}
              >
                <CloseIcon sx={{ color: theme => theme.palette.common.white, m: "auto" }} fontSize="large" />
              </IconButton>
            </LightTooltip>
          )}

          {!showMenu && (
            <LightTooltip title="Account">
              <IconButton
                size="large"
                edge="end"
                onClick={onShowMenu}
                color="inherit"
                sx={{
                  display: { xs: "flex", md: "none" }
                }}
              >
                <MenuIcon sx={{ color: theme => theme.palette.common.white }} fontSize="large" />
              </IconButton>
            </LightTooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
    // </div >
  );
};

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: "0px 10px 30px 5px rgba(0,0,0,0.5)",
    fontSize: 12
  }
}));

export default AppAppBar;
