import { Drawer } from "expo-router/drawer";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";

import { NativeBaseProvider } from "native-base";

export default function DrawerRoutesLayout() {
  return (
    <NativeBaseProvider>
      <Drawer screenOptions={{ headerShown: false, swipeEdgeWidth: 0 }}>
        <Drawer.Screen
          name="Welcome/[codLoja]"
          options={{ title: "Bem vindo", drawerLabel: "Home" }}
        />
        <Drawer.Screen name="profile" options={{ title: "Perfil" }} />
        <Drawer.Screen name="(tabs)" options={{ title: "tabs" }} />
        <Drawer.Screen name="teste2" options={{ title: "Teste2" }} />
      </Drawer>
    </NativeBaseProvider>
  );
}
