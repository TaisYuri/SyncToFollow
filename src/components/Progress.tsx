import { VStack, Text, Icon, Box, Progress } from "native-base";
import { Ionicons } from "@expo/vector-icons";

interface ProgressProps {
  value: number;
}

export default function ProgressBar({ value }: ProgressProps) {
  return (
    <VStack width="full" flexDirection="row" alignItems="center" my="6">
      <Box w="90%" maxW="400">
        <Progress
          value={value}
          mx="4"
          size="md"
          rounded="2"
          _filledTrack={{
            bg: "blue.500",
          }}
        />
      </Box>
      <Text fontWeight="medium">{value}%</Text>
    </VStack>
  );
}
