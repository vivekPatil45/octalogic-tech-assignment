import { IconButton, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useThemeContext } from "./ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ThemeToggle = () => {
  const theme = useTheme();
  const { toggleColorMode } = useThemeContext();

  return (
    <Tooltip title="Toggle theme">
      <IconButton
        onClick={toggleColorMode}
        sx={{
          color: theme.palette.mode === "dark" ? "#81C784" : "#2E7D32", // light green in dark mode, deep green in light
          border: "1px solid",
          borderColor: theme.palette.divider,
          borderRadius: "50%",
          transition: "all 0.3s ease",
          "&:hover": {
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(129, 199, 132, 0.15)" // soft green tint in dark
                : "rgba(46, 125, 50, 0.1)", // soft deep green tint in light
          },
        }}
      >
        {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
