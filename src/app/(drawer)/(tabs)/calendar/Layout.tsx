import { Text, View, ListRenderItem, FlatList } from "react-native";
import { ScheduledSchema } from "@/hooks/scheduled/types";
import { Link } from "expo-router";
import { CalendarViewProps } from "./types";

export function Layout({
  dataScheduled,
  getScheduled,
  loading,
}: CalendarViewProps) {
  const renderItem: ListRenderItem<ScheduledSchema> = ({ item }) => (
    <View
      style={{ flexDirection: "row", margin: 10, backgroundColor: "#c2c2c2" }}
    >
      <Text>codLoja: {item?.codLoja}</Text>
      <View style={{ width: "100%", height: 10 }} />
      <Text>name: {item?.name}</Text>
      <View style={{ width: "100%", height: 10 }} />
      <Text>email: {item?.email}</Text>
      <View style={{ width: "100%", height: 10 }} />
      <Text>ticket: {item?.ticket}</Text>
      <View style={{ width: "100%", height: 10 }} />
      <Text>type: {item?.type}</Text>
      <View style={{ width: "100%", height: 10 }} />
      <Text>
        data: {item?.appointmentDate} = {item?.appointmentTime}
      </Text>
      <View style={{ width: "100%", height: 10 }} />
      <Text>createdDate: {item?.createdDate}</Text>
    </View>
  );

  return (
    <View>
      <View>
        <Text>TESTE</Text>
        {dataScheduled.map((item) => (
          <Text key={item?.name}>name: {item?.name}</Text>
        ))}
        <FlatList data={dataScheduled} renderItem={renderItem} />
      </View>
      <Link href="/(tabs)/profile">Novo Registro - teste</Link>
    </View>
  );
}
