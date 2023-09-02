import { useGlobalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function Calendar() {
  const { id } = useGlobalSearchParams();
  return (
    <View>
      <Text>Calendar {id}</Text>
    </View>
  );
}
