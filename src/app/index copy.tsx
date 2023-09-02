import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Button, FlatList } from "react-native";
import ButtonRN from "@/components/ButtonFile";
import { useScheduled } from "@/hooks/scheduled";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { ApiService } from "@/service";

export default function Home() {
  const url = "https://web-production-90e2a.up.railway.app/api/";

  const refreshList = () => {
    ApiService.get("/api")
      .then((res) => console.log("DATA"))
      .catch((err) => console.log("errrr", err));
  };

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        {/* <Link href="/Calendar/[calendar]">Calendar</Link> */}
        <Link href="/(drawer)/profile" asChild>
          <Button title="Drawer" />
        </Link>
        <Link href="/testeId/3" asChild>
          <Button title="Acessar outra Rota passando parametro" />
        </Link>
        <Link href="/calendar/" asChild>
          <Button title="Calendário" />
        </Link>

        {/* <Link href="/(tabs)/Login" asChild>
          <Button title="Login" />
        </Link> */}
        <Link href="/(tabs)/imageUpload" asChild>
          <Button title="Image Updaload" />
        </Link>
        <Link href="/(tabs)/CadUnico" asChild>
          <Button title="First page" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
