import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { theme } from "@/theme";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Lato_400Regular,
  Lato_700Bold,
  Lato_100Thin_Italic,
} from "@expo-google-fonts/lato";

SplashScreen.preventAutoHideAsync();

export default function TabRoutesLayout() {
  let [fontsLoaded, fontError] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
    Lato_100Thin_Italic,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }


  return (

    <NativeBaseProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Welcome/[codLoja]" options={{ title: "Home" }} /> */}
        {/* <Stack.Screen name="Login/index" options={{ title: "Login" }} /> */}
        {/* <Stack.Screen
          name="CadUnico/[platFiscal]"
          options={{ title: "Cadastro Inicial" }}
        /> */}
        {/* <Stack.Screen name="/(drawer)/Login/" options={{ title: "teste" }} /> */}
      </Stack>
    </NativeBaseProvider>
  );
}
