import { createTheme, ThemeProvider } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { RootState } from "./store/Store";

type Props = {
  children: React.ReactChild;
};
const GaThemeProvider: React.FC<Props> = ({ children }) => {
  const mode = useSelector<RootState, boolean | null>(
    (state) => state.app.darkMode
  );
  const GaTheme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
      primary: {
        main: orange[400],
        dark: "rgba(255, 255, 255, 0.12)",
      },
      secondary: {
        main: orange[100],
      },
      warning: {
        dark: "#FF9933",
        main: "#FFFBBC",
      },
      success: {
        dark: "#128807",
        main: "#BBFFB5",
      },
      error: {
        main: "#F9DCDD",
        dark: "#E56B6F",
      },
      info: {
        main: "#F2F2F9",
        dark: "#515190",
      },

      common: {
        white: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: [
        "Nunito",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ].join(","),
    },
  });

  return <ThemeProvider theme={GaTheme}>{children}</ThemeProvider>;
};

export default GaThemeProvider;
