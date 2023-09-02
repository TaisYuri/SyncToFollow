import { VStack, Text, Center, Input, Button, Box } from "native-base";
import Background from "../../../../../assets/wave.svg";
import BackgroundBottom from "../../../../../assets/wave_bottom.svg";
import { LoginProps } from "./types";
import ButtonRN from "@/components/Button";

export default function Layout({
  buttonLogin,
  cnpj,
  codLoja,
  setCnpj,
  setCodLoja,
  loading,
}: LoginProps) {
  return (
    <>
      <VStack position="absolute" top="0" left="0" right="0">
        <Background width="100%" height="160" rotation={180} />
      </VStack>
      <VStack alignItems="center" justifyContent="center" flex={1}>
        <VStack margin="10" marginBottom="12" alignItems="center">
          <Text fontSize="6xl" fontWeight="bold">
            Sync
          </Text>
          <Center w="70%" marginBottom="10" marginLeft="40">
            <Text fontSize="2xl" fontWeight="medium" textAlign="justify">
              to Follow
            </Text>
          </Center>

          <Input
            size="lg"
            variant="underlined"
            marginBottom="4"
            placeholder="Cod inscrição"
            value={codLoja}
            onChangeText={setCodLoja}
          />
          <Input
            size="lg"
            variant="underlined"
            placeholder="CNPJ"
            value={cnpj}
            onChangeText={setCnpj}
            mb="10"
          />

          <Button
            bgColor="blues.400"
            onPress={buttonLogin}
            isLoading={loading}
            width={120}
          >
            <Text color="white" fontWeight="bold">
              ACESSAR
            </Text>
          </Button>
        </VStack>
      </VStack>
      <VStack position="absolute" bottom="0" left="0" right="0" zIndex={-99}>
        <BackgroundBottom width="100%" height="160" />
      </VStack>
    </>
  );
}
