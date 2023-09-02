import { VStack, Box, ScrollView, HStack, Icon } from "native-base";
import Header from "@/components/Header";
import ProgressBar from "@/components/Progress";
import { useCallback, useEffect, useState } from "react";
import PopoverComp, { PopoverHeader } from "@/components/Popover";
import Text from "@/components/Text";
import { Ionicons } from "@expo/vector-icons";
import ButtonRN from "@/components/Button";

export interface Steps {
  platFiscal: boolean;
  check_status: boolean;
  cadBanco: boolean;
  cadRF: boolean;
  csc_acSat: boolean;
  certDigital_atvSat: boolean;
  impostos: boolean;
}

const mockSteps: { [key: string]: Boolean } = {
  platFiscal: true,
  check_status: true,
  cadBanco: true,
  cadRF: true,
  csc_acSat: true,
  certDigital_atvSat: true,
  impostos: true,
};

const EnumSteps: { [key: string]: string } = {
  cadBanco: "Cadastro no banco",
  cadRF: "Cadastro na Secretaria da Fazenda",
  csc_acSat: "CSC - Token ------ AC SAT",
  certDigital_atvSat: "Certificado digital ----- Ativação SAT",
  impostos: "Configuração de Impostos no sistema",
  platFiscal: "",
  check_status: "",
};

export default function DataVerify() {
  const [valueBank, setValueToPass] = useState(false);
  const [taxSystem, setTaxSystem] = useState(false);
  const [sheet, setSheet] = useState(false);

  const [pendency, setPendency] = useState<Array<string>>([]);

  const handleResult = useCallback(() => {
    for (const step in mockSteps) {
      if (mockSteps[step] === false) {
        setPendency((prevState: string[]) => [...prevState, EnumSteps[step]]);
      }
    }
  }, []);

  const quantity = useCallback(() => {
    if (pendency.length === 0) {
      return (
        <Text fontSize="lg" fontWeight="semibold">
          Parabéns! Não há pendencias no processo
        </Text>
      );
    } else if (pendency.length === 1) {
      return (
        <Text fontSize="lg" fontWeight="semibold">
          De todas as etapas, ficou pendente apenas:
        </Text>
      );
    }
    return (
      <Text fontSize="lg" fontWeight="semibold">
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
        </Box>
      );
    }
    return (
      <Box my="4">
        <Text>
          A partir de agora podemos agendar a instalação do seu sistema!
        </Text>
      </Box>
    );
  }, []);

  useEffect(() => {
    if (pendency.length === 0) {
      handleResult();
    }
  }, []);

  return (
    <>
      <VStack flex={1} backgroundColor="#f9f9f9">
        <Header title="Checando as informações" />
        <ProgressBar value={10} />

        <ScrollView mx="4" showsVerticalScrollIndicator={false}>
          <Text type="title">Ufa!</Text>
          <Text>
            Muita coisa, eu sei! Mas todos os dados são essenciais para que no
            final, você ganhe tempo e consiga passar pela parte burocratica
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
          href="/Sefaz/Sat"
          title={
            pendency.length > 0
              ? "Quero realizar o agendamento mesmo sem os dados"
              : "Ir para o agendamento"
          }
        />
      </VStack>
    </>
  );
}
