import { VStack, Box, ScrollView, Input } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { useUpdateRegister } from "@/hooks/updateRegister";
import { useCompanyStepsStore } from "@/states/companyStepStore";
import { UpdateRegisterSchemaProps } from "@/hooks/updateRegister/types";
import { router, useGlobalSearchParams } from "expo-router";
import PopoverComp, { PopoverHeader } from "@/components/Popover";
import CheckBox from "@/components/CheckBox";
import ProgressBar from "@/components/Progress";
import FooterForm from "@/components/FooterForm";
import Accordion from "@/components/Accordion";
import Text from "@/components/Text";
import DrawerHeader from "@/components/DrawerHeader";
import ButtonRN from "@/components/Button";

export default function platFiscal() {
  const [valueAtiv, setValueAtiv] = useState("");
  const [config, setConfig] = useState(false);
  const [valueToPass, setValueToPass] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  const { platFiscal } = useGlobalSearchParams();
  const { requestUpdateRegister } = useUpdateRegister()
  const { setDataSteps, companyStepsStore } = useCompanyStepsStore();

  useEffect(() => {
    if (config || valueAtiv) {
      setDisabledButton(true)
      return setValueToPass(false)
    }
    if (valueToPass) {
      return setDisabledButton(true)
    }

    return setDisabledButton(false)
  }, [valueToPass, config, setDisabledButton, valueAtiv])

  const handleContinue = useCallback(() => {
    const data: UpdateRegisterSchemaProps = {
      ...companyStepsStore,
      certDigital_atvSat: valueAtiv ? valueAtiv : "-",
      steps: {
        ...companyStepsStore.steps,
        certDigital_atvSat: valueToPass ? false : true,
      }
    }
    requestUpdateRegister({ ...data })
    setDataSteps({ ...data })

    router.push(
      { pathname: '/(drawer)/(tabs)/Tax/' }
    );
  }, [companyStepsStore, router, platFiscal, valueAtiv, valueToPass, router, requestUpdateRegister, setDataSteps])

  const itensAccordion = {
    Sat: [
      {
        titleAccordion: "Por que tenho que fazer isso?",
        items: [
          {
            titleItem: "Ativação do equipamento",
            descriptionItem:
              "Este processo é importante para gerar o código de ativação, informação necessária para vincularmos o aparelho ao sistema.",
          },
        ],
      },
      {
        titleAccordion: "Como realizar esse procedimento?",
        items: [
          {
            titleItem: "Fabricante",
            descriptionItem:
              "A ativação do SAT pode ser feita pelo Aplicativo Comercial ou pelo software de ativação fornecido pelo fabricante.",
          },
        ],
      },
    ],
    NFCe: [
      {
        titleAccordion: "Mas para que serve?",
        items: [
          {
            titleItem: "Autenticação de transações",
            descriptionItem:
              "Ele é responsavel por garantir que a nota fiscal foi emitida pelo seu estabelecimento",
          },
        ],
      },

      {
        titleAccordion: "Onde adquirir?",
        items: [
          {
            titleItem: "Através do portal GOV.br",
            descriptionItem:
              "Há uma lista de autoridades certificadoras (AC). Basta você contatar uma para maiores informações",
          },
          {
            titleItem: "Com a ajuda do seu contador",
            descriptionItem:
              "Por ser um trabalho burocrático com o governo. Seu contador poderá lhe apoiar e ajudar a configurar em seu computador",
          },
        ],
      },
    ],
  };

  if (platFiscal === "NFCe") {
    return (
      <>
        <VStack flex={1} backgroundColor="#f9f9f9">
          <DrawerHeader title="Certificado digital" />
          <ProgressBar value={45} />

          <ScrollView mx="4" showsVerticalScrollIndicator={false}>
            <Text type="title">
              Chegou a hora do famoso Certificado digital!
            </Text>
            <Accordion section={itensAccordion.NFCe} />

            <Box mt="3">
              <Text>
                Ah! Quando for adquirir seu certificado digital, pode ser tanto
                o modelo A1 quanto o modelo A3, ok?! 😀
              </Text>

              <Text>
                Outra informação importante! Precisamos que o certificado já
                esteja conectado (modelos A3) e instalado (modelos A1 e A3) em
                seu computador.
              </Text>
            </Box>

            <CheckBox
              setValues={setConfig}
              checked={config}
              description="Instalado e pronto"
            />
            <FooterForm setValue={setValueToPass} checked={valueToPass} />
          </ScrollView>
        </VStack>
        <VStack px="4" mb="6" backgroundColor="#f9f9f9">
          <ButtonRN disabled={disabledButton} onPress={handleContinue} />
        </VStack>
      </>
    );
  }

  return (
    <>
      <VStack flex={1} backgroundColor="#f9f9f9">
        <DrawerHeader title="Ativação do aparelho SAT" />
        <ProgressBar value={45} />

        <ScrollView mx="4" showsVerticalScrollIndicator={false}>
          <Text type="title">Cuidado com a pegadinha aqui!</Text>
          <Text>
            Nesse momento, é importante que o SAT já esteja conectado ao seu
            computador e esteja com as luzes acesas.
          </Text>

          <Accordion section={itensAccordion.Sat} />
          <Box mt="3">
            <Text>
              Então, seu melhor aliado será o fornecedor do seu SAT. Você poderá
              entrar em contato pelo telefone ou através do manual do
              equipamento para obter instruções.
            </Text>
          </Box>

          <Text>
            Quando realizado a ativação, será criado um código de ativação. Este código será necessário para configuração do sistema! Então, digite-o aqui abaixo para que possamos configura-lo em seu sistema 😊
          </Text>
          <Box w="100%" mb="4">
            <PopoverHeader titleClick="Informação importante">
              <PopoverComp
                title="Guarde a informação"
                body="O Código do SAT gerado será necessário ao longo de toda vida util do equipamento. Então, é muito importante anota-lo e guarda-lo em um lugar seguro"
              />
            </PopoverHeader>
          </Box>

          <Input
            size="lg"
            variant="underlined"
            placeholder="Código de ativação"
            value={valueAtiv}
            onChangeText={setValueAtiv}
            mb="10"
          />
          <FooterForm setValue={setValueToPass} checked={valueToPass} />
        </ScrollView>
      </VStack>
      <VStack px="4" mb="6" backgroundColor="#f9f9f9">
        <ButtonRN disabled={disabledButton} onPress={handleContinue} />
      </VStack>
    </>
  );
}
