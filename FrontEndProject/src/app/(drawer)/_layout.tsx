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
import { useCompanyStepsStore } from "@/states/companyStepStore";

SplashScreen.preventAutoHideAsync();

export default function DrawerRoutesLayout() {
  const { companyStepsStore } = useCompanyStepsStore();

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
        <Drawer.Screen name="(tabs)" options={{ title: "Minha instalação" }} />
        <Drawer.Screen name="calendar" options={{ title: "Realizar agendamento", drawerItemStyle: { display: companyStepsStore?.steps?.impostos ? 'flex' : 'none' } }} />
        <Drawer.Screen name="mySchedules" options={{ title: "Meus agendamentos", drawerItemStyle: { display: companyStepsStore?.steps?.impostos ? 'flex' : 'none' } }} />
        <Drawer.Screen name="Logout/index" options={{ title: "Sair" }} />
        <Drawer.Screen name="Login/layout" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="Login/index" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="Ticket/index" options={{ drawerItemStyle: { display: 'none' } }} />
      </Drawer>
    </NativeBaseProvider>
  );
}
