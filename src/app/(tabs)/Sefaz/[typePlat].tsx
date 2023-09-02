import { useScheduled } from "@/hooks/scheduled";
import { useUpdateRegister } from "@/hooks/updateRegister";
import {
  VStack,
  Popover,
  Box,
  Icon,
  HStack,
  Tooltip,
  Checkbox,
  Divider,
  ScrollView,
  Button,
} from "native-base";
import { UpdateRegisterSchemaProps } from "@/hooks/updateRegister/types";
import axios from "axios";
import Header from "@/components/Header";
import ProgressBar from "@/components/Progress";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import PopoverComp, { PopoverHeader } from "@/components/Popover";
import { useGlobalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import ButtonRN from "@/components/ButtonFile";
import CheckBox from "@/components/CheckBox";
import FooterForm from "@/components/FooterForm";
import { List } from "react-native-paper";
import Text from "@/components/Text";
import Accordion from "@/components/Accordion";
import ButtonFile from "@/components/ButtonFile";

export default function SecondPage() {
  const [value, setValue] = useState(false);
  const { typePlat } = useGlobalSearchParams();

  const handleDocumentSelection = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.assets !== null) {
        const selectedAsset = result.assets[0];

        const formData = new FormData();
        formData.append("fileCsc_acSat", selectedAsset.uri);
        console.log("formData", formData);
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

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
          <Header title="CSC - TOKEN" />
          <ProgressBar value={20} />

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
          </ScrollView>
        </VStack>
        <VStack px="4" backgroundColor="#f9f9f9">
          <FooterForm href="/PlatFiscal/Sat" setValue={setValue} />
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
        </ScrollView>
      </VStack>
      <VStack px="4" backgroundColor="#f9f9f9">
        <FooterForm href="/PlatFiscal/Sat" setValue={setValue} />
      </VStack>
    </>
  );
}
