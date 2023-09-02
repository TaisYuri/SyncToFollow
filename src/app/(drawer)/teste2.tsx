import DrawerHeader from "@/components/DrawerHeader";
import { useScheduled } from "@/hooks/scheduled";
import { useUpdateRegister } from "@/hooks/updateRegister";
import { useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function Teste2() {
  return (
    <View>
      <DrawerHeader title="Testeeeee 2" />

      <Text>Teste2</Text>
    </View>
  );
}
