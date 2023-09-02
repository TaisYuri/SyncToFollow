import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    blues: {
      800: "#16214A",
      400: "#047AF5",
    },
    background: "#F9F9F9",
    black: "#0C0C0F",
  },
  fontConfig: {
    Lato: {
      400: {
        normal: "Lato_400Regular",
      },
      700: {
        normal: "Lato_700Bold",
      },
    },
  },
  fonts: {
    heading: "Lato",
    body: "Lato",
    mono: "Lato",
  },
});
