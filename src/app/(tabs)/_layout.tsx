import { Stack } from "expo-router";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { theme } from "@/theme";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
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
        {/* <Stack.Screen name="Login" options={{ title: "Login" }} /> */}
        <Stack.Screen name="index" options={{ title: "Inicio" }} />
        <Stack.Screen name="profile" options={{ title: "Perfil" }} />
        <Stack.Screen name="imageUpload" options={{ title: "ImageUpload" }} />
      </Stack>
    </NativeBaseProvider>
  );
}
