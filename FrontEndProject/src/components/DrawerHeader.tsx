import {
  DrawerNavigationOptions,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { theme } from "@/theme";

export interface DrawerHeaderProps extends DrawerNavigationOptions {
  title: string;
  showProfileRoute?: boolean;
}

export default function DrawerHeader({ title, showProfileRoute = true, ...props }: DrawerHeaderProps) {

  return (
    <Drawer.Screen
      options={{
        title: title,
        headerTitleStyle: { fontSize: 18 },
        headerShown: true,
        headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        drawerActiveBackgroundColor: theme.colors.blues["800"],
        headerStyle: { backgroundColor: theme.colors.blues["800"] },
        drawerItemStyle: { display: showProfileRoute ? 'flex' : 'none' }
      }}
      {...props}
    />
  );
}
