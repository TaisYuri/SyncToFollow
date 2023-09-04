import { VStack, Box, ScrollView } from "native-base";
import Header from "@/components/Header";
import ProgressBar from "@/components/Progress";
import { useCallback, useEffect, useState } from "react";
import PopoverComp, { PopoverHeader } from "@/components/Popover";
import { router, useGlobalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import FooterForm from "@/components/FooterForm";
import Text from "@/components/Text";
import Accordion from "@/components/Accordion";
import ButtonFile from "@/components/ButtonFile";
import { UpdateRegisterSchemaProps } from "@/hooks/updateRegister/types";
import { useUpdateRegister } from "@/hooks/updateRegister";
import { useCompanyStore } from "@/states/companyStore";
import DrawerHeader from "@/components/DrawerHeader";

export default function Sefaz() {
  const [valueToPass, setValueToPass] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerAsset>();

  const { typePlat } = useGlobalSearchParams();
  const { requestUpdateRegister } = useUpdateRegister()
  const { setData, companyStore } = useCompanyStore();

  useEffect(() => {
    if (selectedFile?.name) {
      setDisabledButton(true)
      return setValueToPass(false)
    }
    if (valueToPass) {
      return setDisabledButton(true)
    }

    return setDisabledButton(false)
  }, [valueToPass, selectedFile, setDisabledButton])

  const handleDocumentSelection = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});

      if (result.assets !== null) {
        setSelectedFile(result?.assets?.[0]);
        console.log("result?.assets?.[0]", result?.assets?.[0]);
      }
    } catch (err) {
      console.warn(err);
    }
  }, [selectedFile]);

  const handleContinue = useCallback(() => {
    const data: UpdateRegisterSchemaProps = {
      ...companyStore,
      steps: {
        ...companyStore.steps,
        csc_acSat: valueToPass ? false : true,
      }
    }
    requestUpdateRegister({ ...data })
    setData({ ...data })

    router.push(
      { pathname: '/(drawer)/(tabs)/Fisco/', params: { typePlat: typePlat as string } }
    );
    console.log('data-- PASSO 2', data)
  }, [companyStore, router, typePlat])


  const itemsAccordion = {
    Sat: [
      {
        titleAccordion: "O que é o SAT mesmo?",
        items: [
          {
            titleItem: "Equipamento fiscal",
            descriptionItem:
              "Responsavel por validar o Cupom Fiscal e o transmite à Secretaria da Fazenda automaticamente.",
          },
        ],
      },
      {
        titleAccordion: "Por que esse processo é importante?",
        items: [
          {
            titleItem: "Vinculação",
            descriptionItem:
              "você vai precisar vincular o seu CNPJ ao número de série do equipamento.",
          },
        ],
      },
    ],
    NFCe: [
      {
        titleAccordion: "Por que esse processo é importante?",
        items: [
          {
            titleItem: "Código de Segurança do Contribuinte",
            descriptionItem:
              "é um código de conhecimento exclusivo do contribuinte emissor da NFC-e e da SEFAZ, usado para garantir a autoria e a autenticidade do DANFE NFC-e",
          },
        ],
      },
    ],
  };

  if (typePlat === "NFCe") {
    return (
      <>
        <VStack flex={1} backgroundColor="#f9f9f9">
          <DrawerHeader title="CSC - TOKEN" />
          <ProgressBar value={30} />

          <ScrollView mx="4" showsVerticalScrollIndicator={false}>
            <Text type="title">
              Essa etapa será completamente do seu contador!
            </Text>
            <Text>Ainda no portal da SEFAZ, será necessário liberar o CSC</Text>

            <Accordion section={itemsAccordion.NFCe} />

            <Text>
              Mas não se preocupe, seu contador conseguirá realizar essa
              liberação pois o site da Sefaz costuma ser bem intuitivo!
            </Text>
            <Box w="100%" mb="4" mt="2">
              <PopoverHeader titleClick="Informação importante">
                <PopoverComp
                  title="Ambiente"
                  body="Importante informar o ambiente de PRODUÇÃO, pois HOMOLOGAÇÃO refere-se apenas ao ambiente de testes."
                />
              </PopoverHeader>
            </Box>

            <Text>
              Esse recurso é extremamente necessário, pois sem ele, a loja não
              conseguirá emitir nenhum cupom fiscal para seu cliente.
            </Text>
            <Text>
              Assim que a Sefaz liberar, ficará disponivel o código para uso no
              sistema. Vamos agilizar e já deixar tudo certinho para você, então
              envia aqui para nós esse arquivo!
            </Text>

            <ButtonFile handleDocumentSelection={handleDocumentSelection} />
            <VStack m='3'>
              <Text fontSize='sm'>{selectedFile?.name}</Text>
            </VStack>
          </ScrollView>
        </VStack>
        <VStack px="4" backgroundColor="#f9f9f9">
          <FooterForm
            // href="/PlatFiscal/Sat" 
            setValue={setValueToPass} checked={valueToPass} disabled={disabledButton} onPress={handleContinue} />
        </VStack>
      </>
    );
  }

  return (
    <>
      <VStack flex={1} backgroundColor="#f9f9f9">
        <Header title="Liberação do aparelho SAT" />
        <ProgressBar value={20} />

        <ScrollView mx="4" showsVerticalScrollIndicator={false}>
          <Text type="title">
            Essa etapa será completamente do seu contador!
          </Text>
          <Text>
            Ainda no portal da SEFAZ, será necessário liberar o aparelho SAT que
            você já adquiriu.
          </Text>

          <Accordion section={itemsAccordion.Sat} />

          <Text>
            Esse recurso é extremamente necessário, pois sem ele, a loja não
            conseguirá emitir nenhum cupom fiscal para seu cliente.
          </Text>
          <Box w="100%" mb="4" mt="2">
            <PopoverHeader titleClick="Informação importante">
              <PopoverComp
                title="Tipo de Ativação do seu SAT"
                body="Lembre ao seu contador que na ativação, deve-se selecionar o certificado digital AC-SAT"
              />
            </PopoverHeader>
          </Box>
          <Text>
            Assim que a Sefaz liberar, ficará disponivel um documento. Vamos
            agilizar e já deixar tudo certinho para você, então envia aqui para
            nós esse arquivo!
          </Text>

          <ButtonFile handleDocumentSelection={handleDocumentSelection} />
          <VStack m='3'>
            <Text fontSize='sm'>{selectedFile?.name}</Text>
          </VStack>
        </ScrollView>
      </VStack>
      <VStack px="4" backgroundColor="#f9f9f9">
        <FooterForm
          // href="/PlatFiscal/Sat" 
          setValue={setValueToPass} checked={valueToPass}
          disabled={disabledButton} onPress={handleContinue}
        />
      </VStack>
    </>
  );
}
