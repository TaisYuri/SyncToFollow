import { useCallback, useMemo } from "react";
import { Box, HStack, Center, Icon, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useCompanyStepsStore } from "@/states/companyStepStore";
import { router, useGlobalSearchParams } from "expo-router";
import Text from "@/components/Text";
import DrawerHeader from "@/components/DrawerHeader";
import ButtonRN from "@/components/Button";
import CheckBox from "../../../../../assets/check_boxes.svg";

const colors = {
  border: {
    inactive: '#D8D9DA',
    confirm: 'blues.400',
    selected: '#D8D9DA',
  },
  background: {
    inactive: '#E5E7EC',
    confirm: 'transparent',
    selected: 'blues.400',
  }
}

export default function Steps() {
  const { platFiscal } = useGlobalSearchParams();
  const { companyStepsStore } = useCompanyStepsStore();

  const stepOne = useMemo(() => companyStepsStore?.steps?.cadBanco || companyStepsStore?.steps.cadRF, [companyStepsStore])

  const title = useMemo(() =>
    stepOne
      ? "Bora finalizar estes cadastros?"
      : "Estes são os passos que você precisará seguir até sua conquista. Bora lá!"
    , [companyStepsStore])

  const buttonText = useMemo(() =>
    stepOne
      ? "Continuar preenchendo"
      : "Iniciar"
    , [companyStepsStore])

  const status: { [key: string]: "inactive" | "confirm" | "selected" } = {
    bank: stepOne ? 'confirm' : "selected",
    csc_sat: companyStepsStore?.steps.csc_acSat ? "confirm" : stepOne ? "selected" : "inactive",
    certDigital_atvSat: companyStepsStore?.steps.certDigital_atvSat ? "confirm" : companyStepsStore?.steps.csc_acSat ? "selected" : "inactive",
    impostos: companyStepsStore?.steps.impostos ? "confirm" : companyStepsStore?.steps.certDigital_atvSat ? "selected" : "inactive",
  }

  const routers: { [key: string]: any } = {
    bank: { pathname: '/(drawer)/(tabs)/CadUnico/', params: { platFiscal } },
    csc_sat: { pathname: '/(drawer)/(tabs)/Sefaz/', params: { platFiscal } },
    certDigital_atvSat: { pathname: '/(drawer)/(tabs)/Fisco/', params: { platFiscal } },
    impostos: { pathname: '/(drawer)/(tabs)/Tax/' }
  }


  const handleConfirm = useCallback(() => {
    for (const key in status) {
      if (status[key] === "selected") {
        router.replace(routers[key])
      }
    }
  }, [])


  const bySteps = useCallback((description: string, hasDivider: boolean, status: "inactive" | "confirm" | "selected") => {
    return (
      <HStack width={'100%'} alignItems='center' >
        <VStack alignItems='center' flex={1}  >
          <Box height='40px' width='2px' bgColor='gray.200' />
          <Center borderRadius={99} width='34px' height='34px' mb='1' bgColor={colors.border[status]}>
            <Box borderRadius={99} width='20px' height='20px' bgColor={colors.background[status]}>
              {status === 'confirm' && <Icon
                as={MaterialIcons}
                name="check"
                size="20px"
                color="#f9f9f9"
              />}</Box>
          </Center>
          {hasDivider ? <Box height='40px' width='2px' bgColor='gray.200' /> : <Box height='50px' width='2px' />}
        </VStack>
        <VStack flex={2}  >
          <Text fontSize='sm'>{description}</Text>
        </VStack>
      </HStack>
    );
  }, []);


  return (
    <VStack flex={1} backgroundColor="#f9f9f9" px='4'>
      <VStack flex={1} >
        <DrawerHeader title="" />
        <VStack mt='4' >
          <Text fontSize='lg' fontWeight='bold'>{title}</Text>
        </VStack>
        {bySteps("Cadastros importantes com o Banco e a Receita Federal", true, status.bank)}
        {bySteps(platFiscal === 'NFCe' ? "Liberação do código de segurança do contribuinte no portal da Sefaz" : "Liberação do SAT na secretária da fazenda", true, status.csc_sat)}
        {bySteps(platFiscal === 'NFCe' ? "Adquirir e instalar o certificado digital" : "Ativação do SAT com o fabricante do aparelho", true, status.certDigital_atvSat)}
        {bySteps("Check para verificar impostos pra vendas", true, status.impostos)}
      </VStack>
      <CheckBox width="40%" height="90" style={{ alignSelf: 'flex-end' }} />
      <VStack mb='4'>
        <ButtonRN title={buttonText} disabled onPress={handleConfirm} />
      </VStack>
    </VStack>
  );
}
