import { theme } from "@/theme";
import { Drawer } from "expo-router/drawer";
import { NativeBaseProvider } from "native-base";
import * as SplashScreen from "expo-splash-screen";
import {
  Lato_400Regular,
  Lato_700Bold,
  Lato_100Thin_Italic,
  useFonts,
} from "@expo-google-fonts/lato";

SplashScreen.preventAutoHideAsync();

export default function DrawerRoutesLayout() {

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
      <Drawer screenOptions={{ headerShown: false, swipeEdgeWidth: 0 }}>
        <Drawer.Screen
          name="Home/[codLoja]"
          options={{ title: "Bem vindo", drawerLabel: "Home" }}
        />
        <Drawer.Screen name="(tabs)" options={{ title: "Continuar o fluxo" }} />
        <Drawer.Screen name="Login/index" options={{ title: "Logout" }} />
        <Drawer.Screen name="profile" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="Login/layout" options={{ drawerItemStyle: { display: 'none' } }} />
      </Drawer>
    </NativeBaseProvider>
  );
}
