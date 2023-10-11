import { VStack, Box, ScrollView, HStack, Icon, Center } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useUpdateRegister } from "@/hooks/updateRegister";
import { router, useGlobalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native-paper";
import { theme } from "@/theme";
import PopoverComp, { PopoverHeader } from "@/components/Popover";
import Text from "@/components/Text";
import ProgressBar from "@/components/Progress";
import ButtonRN from "@/components/Button";
import DrawerHeader from "@/components/DrawerHeader";

import WellDone from "../../../../../assets/well_done.svg";
import KeyPoints from "../../../../../assets/key_points.svg";

const EnumStepsNFCE: { [key: string]: string } = {
  cadBanco: "Cadastro no banco",
  cadRF: "Cadastro na Secretaria da Fazenda",
  csc_acSat: "Código de Segurança do Contribuinte - Token",
  certDigital_atvSat: "Certificado digital",
  impostos: "Configuração de Impostos no sistema",
};
const EnumStepsSAT: { [key: string]: string } = {
  cadBanco: "Cadastro no banco",
  cadRF: "Cadastro na Secretaria da Fazenda",
  csc_acSat: "Vinculação do Aplicativo Comercial",
  certDigital_atvSat: "Ativação do SAT",
  impostos: "Configuração de Impostos no sistema",
};

export default function DataVerify() {

  const [pendency, setPendency] = useState<Array<string>>([]);
  const [isLoading, setisLoading] = useState(false);
  const { getUpdateRegister, dataUpdateRegister, loading } = useUpdateRegister();
  const { codLoja } = useGlobalSearchParams();


  useEffect(() => {
    setisLoading(true)
    getUpdateRegister(codLoja as string)
    setisLoading(false)
  }, []);

  useEffect(() => {
    setisLoading(true)
    if (dataUpdateRegister?.steps) {
      for (const step in dataUpdateRegister?.steps) {
        if (dataUpdateRegister?.steps[step] === false) {
          setPendency((prevState: string[]) => [...prevState, dataUpdateRegister.platFiscal === 'Sat' ? EnumStepsSAT[step] : EnumStepsNFCE[step]]);
        }
      }
    }

    setisLoading(false)
  }, [dataUpdateRegister]);

  const quantity = useCallback(() => {
    if (pendency.length === 0) {
      return (
        <VStack my='4'>
          <Text fontSize="3xl" fontWeight="bold">Parabéns!
          </Text>
          <Text fontSize="3xl" fontWeight="bold">
            Não há pendencias no processo
          </Text>
        </VStack>
      );
    } else if (pendency.length === 1) {
      return (
        <Text fontSize="lg" fontWeight="bold">
          De todas as etapas, ficou pendente apenas:
        </Text>
      );
    }
    return (
      <Text fontSize="lg" fontWeight="bold">
        De todas as etapas, ficaram pendentes apenas estes {pendency.length}{" "}
        abaixo:
      </Text>
    );
  }, [pendency]);

  const renderContentFooter = useCallback(() => {
    if (pendency.length > 0) {
      return (
        <Box my="4">
          <Text>
            Ficou com alguma dúvida em algum dos passos? Podemos conversar para
            tentarmos te ajudar antes de avançar para o agendamento. Envie um
            email para instalacao@teste.com
          </Text>
          <Text>
            Agora, se você já tem os dados abaixo ou deseja prosseguir mesmo sem
            os dados, basta clicar aqui abaixo que vou te direcionar para o
            agendamento
          </Text>
          <Box my="4">
            <PopoverHeader titleClick="Por que é importante ter os dados?">
              <PopoverComp
                title="Requisitos"
                body="Os passos anteriores são de extrema importancia! A ausência de alguma informação fará com que a instação não seja concluida e você provavelmente tenha que voltar mais algumas vezes para o agendamento!"
              />
            </PopoverHeader>
          </Box>
          <KeyPoints width="100%" height="180" />
        </Box>
      );
    }
    return (
      <>
        <Box mt="4" mb='12'>
          <Text >
            A partir de agora podemos agendar a instalação do seu sistema!
          </Text>
        </Box>
        <WellDone width="100%" height="180" />
      </>
    );
  }, [pendency]);


  if (isLoading || loading) {
    return <Center flex={1} > <ActivityIndicator animating={true} color={theme.colors.blues[400]} size='large'/></Center>
  }

  return (
    <>
      <VStack flex={1} backgroundColor="#f9f9f9">
        <DrawerHeader title="Checando as informações" />
        <ProgressBar value={75} />

        <ScrollView mx="4" showsVerticalScrollIndicator={false}>
          <Text type="title">Ufa!</Text>
          <Text>
            Muita coisa, eu sei! Mas todos os dados são essenciais para que no
            final, você ganhe tempo e consiga passar pela parte burocratica sem
            dores de cabeça!
          </Text>
          {quantity()}
          {pendency.map((item) => (
            <HStack key={item}>
              <Icon
                as={Ionicons}
                name="information-circle-outline"
                size="20px"
                mx="2px"
                color="warning.400"
              />
              <Text fontWeight="bold" fontSize="lg">
                {item}
              </Text>
            </HStack>
          ))}
          {renderContentFooter()}
        </ScrollView>
      </VStack>

      <VStack px="4" pt="4" pb="6" backgroundColor="#f9f9f9">
        <ButtonRN
          title={
            pendency.length > 0
              ? "Quero realizar o agendamento mesmo sem os dados"
              : "Ir para o agendamento"
          }
          disabled
          onPress={() => router.push('/(drawer)/calendar')}
        />
      </VStack>
    </>
  );
}
