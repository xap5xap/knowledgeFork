import { Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface CommonColors {
    black: string;
    white: string;
    orange: string;
    orangeLight: string;
    orangeDark: string;
    darkGrayBackground: string;
    gray: string;
  }
}

const common = {
  black: "#1a1a1a",
  white: "#ffffff",
  orange: "#ff8a33",
  orangeLight: "#f9e2d1",
  orangeDark: "#ff6d00",
  darkGrayBackground: "#28282A",
  gray: "#D3D3D3"
};

const grey = {
  50: "#fafafa",
  100: "#f8f8f8",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121"
};

const systemFont = ["Roboto", "sans-serif"];

export const getMetaThemeColor = (mode: "light" | "dark") => {
  const themeColor = {
    light: common.orange,
    dark: common.orangeDark
  };
  return themeColor[mode];
};

export const getDesignTokens = (mode: "light" | "dark") =>
  ({
    palette: {
      primary: {
        main: common.orange,
        ...(mode === "dark" && {
          main: grey[500]
        })
      },
      warning: {
        main: "#ffc071",
        dark: "#ffb25e"
      },
      divider: mode === "dark" ? grey[400] : grey[400],
      mode,
      background: {
        default: "#FAFAFA",
        paper: common.white
      },
      ...(mode === "dark" && {
        background: {
          default: grey[600],
          paper: grey[700]
        }
      }),
      common,
      ...(mode === "light" && {
        text: {
          primary: common.black,
          secondary: grey[700]
        }
      }),
      ...(mode === "dark" && {
        text: {
          primary: common.white,
          secondary: grey[300]
        }
      }),
      grey
    },
    spacing: 5,
    typography: {
      fontFamily: [...systemFont].join(","),
      fontFamilySystem: systemFont.join(","),
      h3: {},
      button: {
        textTransform: "initial"
      }
    }
  } as ThemeOptions);

export function getThemedComponents(): {
  components: Theme["components"];
} {
  return {
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true
        }
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true
          // variant: "contained",
        },
        styleOverrides: {
          containedPrimary: {
            backgroundColor: "common.orange",
            color: common.white
          }
        },
        variants: [
          {
            props: { variant: "contained" },
            style: {
              "&:hover, &.Mui-focusVisible": {
                backgroundColor: common.orangeDark
              },
              "&.Mui-disabled .MuiLoadingButton-loadingIndicator": {
                // backgroundColor: common.orangeDark,
                color: common.orangeLight
              }
            }
          }
        ]
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: common.darkGrayBackground
          }
        }
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true
        }
      },
      MuiSelect: {
        variants: [
          {
            props: { variant: "standard" },
            style: {
              ".MuiSelect-standard:focus": {
                backgroundColor: "transparent"
              },
              padding: "10px",
              "&:after": { borderBottom: "none" },
              "&:before": {
                borderBottom: "none"
              },
              "&:hover": {
                color: grey[800]
              },
              [`&:hover:not(.disabled):before`]: {
                borderBottom: "none",
                "@media (hover: none)": {
                  borderBottom: "none"
                }
              }
            }
          }
        ]
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            "&": {
              paddingTop: "0px",
              paddingBottom: "0px"
            },
            "&:last-child": {
              paddingTop: "0px",
              paddingBottom: "0px"
            }
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          icon: {
            color: common.orange
          }
        }
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff"
          }
        }
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: "none"
          }
        }
      }
    }
  };
}
