import Header from "@/components/Header";
import { useScheduled } from "@/hooks/scheduled";
import { useUpdateRegister } from "@/hooks/updateRegister";
import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import DrawerHeader from "@/components/DrawerHeader";

export default function Teste1() {
  return (
    <>
      <DrawerHeader title="Testeeeee 1" />

      <View>
        <Header title="Testeeeee 1" />
        <Text>Teste1</Text>
      </View>
    </>
  );
}
