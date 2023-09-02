import { VStack, Box, HStack, Divider, ScrollView } from "native-base";

import Header from "@/components/Header";
import ProgressBar from "@/components/Progress";
import { useState } from "react";
import PopoverComp, { PopoverHeader } from "@/components/Popover";
import CheckBox from "@/components/CheckBox";
import FooterForm from "@/components/FooterForm";
import Text from "@/components/Text";
import Accordion from "@/components/Accordion";
import { useGlobalSearchParams } from "expo-router";
import DrawerHeader from "@/components/DrawerHeader";

export default function Welcome() {
  const [groupValues, setGroupValues] = useState([]);
  const [valueBank, setValueBank] = useState(false);
  const [valueSefaz, setValueSefaz] = useState(false);
  const [valueToPass, setValueToPass] = useState(false);
  const { codLoja } = useGlobalSearchParams();

  console.log("codLoja", codLoja);
  return (
    <>
      <VStack flex={1} backgroundColor="#f9f9f9" justifyContent="center" px="8">
        <DrawerHeader title="Primeiro cadastro" />

        <VStack mb="8">
          <Text fontSize="5xl" fontWeight="bold">
            Seja
          </Text>
          <Text fontSize="4xl">Bem vindo(a)!</Text>
        </VStack>
        <Box mb="2">
          <Text fontSize="xl">Dados da loja:</Text>
        </Box>
        <HStack>
          <Text fontSize="xl">Loja:</Text>
          <Text fontSize="xl" fontWeight="bold">
            1234
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="xl">Nome:</Text>
          <Text fontSize="xl" fontWeight="bold">
            dasdasfhajshdusada
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="xl">CNPJ:</Text>
          <Text fontSize="xl" fontWeight="bold">
            423544634563
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="xl">Endereço:</Text>
          <Text fontSize="xl" fontWeight="bold">
            423544634563
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            423544634563
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="xl">Plataforma Fiscal para seu estado:</Text>
          <Text fontSize="xl" fontWeight="bold">
            NFCe
          </Text>
        </HStack>
      </VStack>
      {/* <VStack px="4" backgroundColor="#f9f9f9">
        <FooterForm href="/Sefaz/Sat" setValue={setValueToPass} />
      </VStack> */}
    </>
  );
}
