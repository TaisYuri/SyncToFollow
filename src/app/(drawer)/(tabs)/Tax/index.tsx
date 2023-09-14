import { useCallback, useEffect, useState } from "react";
import { VStack, Box, ScrollView } from "native-base";
import { UpdateRegisterSchemaProps } from "@/hooks/updateRegister/types";
import { useUpdateRegister } from "@/hooks/updateRegister";
import { useCompanyStepsStore } from "@/states/companyStepStore";
import { router } from "expo-router";
import PopoverComp, { PopoverHeader } from "@/components/Popover";
import ProgressBar from "@/components/Progress";
import CheckBox from "@/components/CheckBox";
import FooterForm from "@/components/FooterForm";
import Text from "@/components/Text";
import Accordion from "@/components/Accordion";
import DrawerHeader from "@/components/DrawerHeader";

export default function Tax() {
  const [taxSystem, setTaxSystem] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [valueToPass, setValueToPass] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const { requestUpdateRegister } = useUpdateRegister()
  const { setDataSteps, companyStepsStore } = useCompanyStepsStore();

  useEffect(() => {
    if (taxSystem) {
      setValueToPass(false)
      setSheet(false)
      return setDisabledButton(true)
    }

    if (sheet) {
      setValueToPass(false)
      setTaxSystem(false)
      return setDisabledButton(true)
    }
    if (valueToPass) {
      setSheet(false)
      setTaxSystem(false)
      return setDisabledButton(true)
    }

    return setDisabledButton(false)
  }, [taxSystem,
    sheet,
    valueToPass])

  const handleContinue = useCallback(() => {
    const data: UpdateRegisterSchemaProps = {
      ...companyStepsStore,
      impostos: taxSystem,
      steps: {
        ...companyStepsStore.steps,
        impostos: valueToPass ? false : true,
      }
    }
    requestUpdateRegister({ ...data })
    setDataSteps({ ...data })

    router.push(
      { pathname: '/(drawer)/(tabs)/DataVerify/', params: { codLoja: companyStepsStore.codLoja } }
    );
  }, [companyStepsStore, router, valueToPass, taxSystem, requestUpdateRegister, setDataSteps, router])


  return (
    <>
      <VStack flex={1} backgroundColor="#f9f9f9">
        <DrawerHeader title="Impostos" />
        <ProgressBar value={60} />

        <ScrollView mx="4" showsVerticalScrollIndicator={false}>
          <Text type="title">Estamos quase lá!</Text>
          <Text>
            Aqui já estamos com o cadastro da loja liberado tanto para receber
            transações quanto realizar vendas e emitir o cupom fiscal, maravilha
            😎
          </Text>
          <Text>
            Está pendente apenas a configuração dos Impostos, então vamos lá.
          </Text>
          <Box w="100%" mb="2">
            <Accordion
              section={[
                {
                  titleAccordion: "Essa configuração parece ser bem dificil",
                  items: [
                    {
                      titleItem: "Cadastro dos impostos",
                      descriptionItem:
                        "A base de impostos será necessária para que quando efetue uma venda, já realize as tributações corretamente dos produtos para o governo.",
                    },
                  ],
                },
              ]}
            />
          </Box>

          <Text>Parece ser complicado, mas acredite, não é!</Text>
          <Text>
            A Franqueadora já deixou tudo pronto e configurado no sistema de
            acordo com seu estado. Então, aqui você precisará apenas confirmar
            com seu contador se você utilizará a mesma carga tributária das
            demais lojas ou se ele irá passar as tributações para cadastro no
            nosso sistema
          </Text>
          <Box my="4">
            <PopoverHeader titleClick="Caso opte por preencher os impostos de forma manual">
              <PopoverComp
                title="Planilha de impostos"
                body="Envie um email para impostos@franqueado.com. Vamos te enviar a planilha com todos os dados necessários para preenchimento"
              />
            </PopoverHeader>
          </Box>
          <CheckBox
            setValues={setTaxSystem}
            checked={taxSystem}
            description="Quero os impostos do sistema"
          />
          <CheckBox
            setValues={setSheet}
            checked={sheet}
            description="Quero a planilha para meu contador preencher"
          />
        </ScrollView>
      </VStack>

      <VStack px="4" backgroundColor="#f9f9f9">
        <FooterForm
          setValue={setValueToPass} checked={valueToPass} disabled={disabledButton} onPress={handleContinue} />
      </VStack>
    </>
  );
}
