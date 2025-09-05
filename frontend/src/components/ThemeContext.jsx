import { createContext, useMemo, useState, useContext, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ThemeContext = createContext();

export function ThemeProviderWrapper({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("appTheme") || "light";
    }
    return "light";
  });
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("appTheme", newMode); // persist to localStorage
          return newMode;
        });
      },
    }),
    []
  );
  useEffect(() => {
    localStorage.setItem("appTheme", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                //  Light Mode
                primary: {
                  main: "#2E7D32", 
                  light: "#66BB6A", 
                  dark: "#1B5E20", 
                },
                secondary: {
                  main: "#388E3C", 
                },
                background: {
                  default: "#F9FAF9", 
                  paper: "#FFFFFF",
                },
                text: {
                  primary: "#1B1B1B",
                  secondary: "#4F4F4F",
                },
              }
            : {
                //  Dark Mode
                primary: {
                  main: "#81C784",
                  light: "#A5D6A7",
                  dark: "#388E3C",
                },
                secondary: {
                  main: "#66BB6A",
                },
                background: {
                  default: "#121212",
                  paper: "#1E1E1E",
                },
                text: {
                  primary: "#EAEAEA",
                  secondary: "#BDBDBD",
                },
              }),
        },
        typography: {
          fontFamily: `'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
          h6: {
            fontWeight: 700,
          },
          button: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 10,
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
