import { VStack, Text, Icon, Center } from "native-base";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <VStack
      width="full"
      height="16"
      bgColor="blues.800"
      alignItems="center"
      flexDirection="row"
    >
      <Icon as={Ionicons} name="menu" color="white" size="xl" marginLeft="2" />
      <Center width="80%">
        <Text color="white" fontWeight="bold">
          {title}
        </Text>
      </Center>
    </VStack>
  );
}
