import { VStack, Box, HStack, Divider, ScrollView } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import { useUpdateRegister } from "@/hooks/updateRegister";
import { useCompanyStepsStore } from "@/states/companyStepStore";
import { UpdateRegisterSchemaProps } from "@/hooks/updateRegister/types";
import PopoverComp, { PopoverHeader } from "@/components/Popover";
import CheckBox from "@/components/CheckBox";
import ProgressBar from "@/components/Progress";
import FooterForm from "@/components/FooterForm";
import Text from "@/components/Text";
import Accordion from "@/components/Accordion";
import DrawerHeader from "@/components/DrawerHeader";

export default function CadUnico() {
  const [valueBank, setValueBank] = useState(false);
  const [valueSefaz, setValueSefaz] = useState(false);
  const [valueToPass, setValueToPass] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const { platFiscal } = useGlobalSearchParams();

  const { requestUpdateRegister } = useUpdateRegister()
  const { companyStepsStore,setDataSteps } = useCompanyStepsStore();

  useEffect(() => {
    if (valueBank && valueSefaz) {
      setValueToPass(false)
      return setDisabledButton(true)
    }

    if (valueToPass) {
      return setDisabledButton(true)
    }

    return setDisabledButton(false)
  }, [valueBank,
    valueSefaz,
    valueToPass])

  const handleContinue = useCallback(() => {

    const data: UpdateRegisterSchemaProps = {
      ...companyStepsStore,
      platFiscal: platFiscal as string,
      cadBanco: valueBank,
      cadRF: valueSefaz,
      steps: {
        ...companyStepsStore.steps,
        cadBanco: valueBank,
        cadRF: valueSefaz,
      }
    }
    requestUpdateRegister({ ...data })
    setDataSteps({ ...data })

    router.push(
      { pathname: '/(drawer)/(tabs)/Sefaz/', params: { typePlat: platFiscal as string } }
    );
  }, [companyStepsStore, platFiscal, valueBank, valueSefaz, requestUpdateRegister, setDataSteps, router])

  return (
    <>
      <VStack flex={1} backgroundColor="#f9f9f9">
        <DrawerHeader title="Primeiro cadastro" />
        <ProgressBar value={15} />

        <ScrollView mx="4" showsVerticalScrollIndicator={false}>
          <Text type="title">Vamos lá!</Text>
          <Text>
            A primeira etapa desta jornada, começa com seu cadastro no banco e
            também na secretária da fazenda do seu estado.
          </Text>
          <Box w="100%" mb="2">
            <Accordion
              section={[
                {
                  titleAccordion: "Por que isso é importante?",
                  items: [
                    {
                      titleItem: "Cadastros efetivos",
                      descriptionItem:
                        "Cadastro no banco habilitará você a receber transações por cartões, pix e tudo mais. Já o cadastro na secretária da fazenda do seu estado te cadastrará como uma loja fisica pronta para emissão de cupom fiscal.",
                    },
                  ],
                },
              ]}
            />
          </Box>

          <Text>
            Você poderá conversar com seu gerente do banco preferido e abrir uma
            conta empresarial. Após isto, basta marcar aqui embaixo que este
            passo foi concluido 😉
          </Text>

          <CheckBox
            setValues={setValueBank}
            checked={valueBank}
            description="Abri a conta junto ao meu gerente do banco"
          />

          <Divider mt="3" mb="5" bg="muted.200" />

          <HStack>
            <Text>O cadastro da Sefaz, deve ter auxilio do </Text>
            <PopoverHeader titleClick="seu contador">
              <PopoverComp
                title="O papel do Contador"
                body=" Será necessário que você tenha um contador de confiança para sua
            loja! Ele terá um papel muito importante e te ajudará em diversos
            momentos ok?"
              />
            </PopoverHeader>
          </HStack>
          <Text>
            Entre em contato com ele e juntos envie a documentação necessária
            para liberar sua loja. Esse processo poderá levar alguns dias, então
            assim que concluir, pode marcar aqui embaixo para que possamos
            avançar essa etapa com sucesso!
          </Text>

          <CheckBox
            setValues={setValueSefaz}
            checked={valueSefaz}
            description="Cadastro realizado junto a Sefaz"
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
