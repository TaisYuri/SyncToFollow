import { VStack, Box, ScrollView } from "native-base";
import Header from "@/components/Header";
import ProgressBar from "@/components/Progress";
import { useCallback, useState } from "react";
import PopoverComp, { PopoverHeader } from "@/components/Popover";
import { useGlobalSearchParams } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import CheckBox from "@/components/CheckBox";
import FooterForm from "@/components/FooterForm";
import Accordion from "@/components/Accordion";
import Text from "@/components/Text";
import ButtonFile from "@/components/ButtonFile";

export default function SecondPage() {
  const [value, setValue] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const { typePlat } = useGlobalSearchParams();
  const [config, setConfig] = useState(false);

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

  const handlePress = () => setExpanded(!expanded);

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

  if (typePlat === "NFCe") {
    return (
      <>
        <VStack flex={1} backgroundColor="#f9f9f9">
          <Header title="Certificado digital" />
          <ProgressBar value={30} />

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
              value="check_sefaz"
              description="Instalado e pronto"
            />
          </ScrollView>
        </VStack>
        <VStack px="4" backgroundColor="#f9f9f9">
          <FooterForm href="/Tax" setValue={setValue} />
        </VStack>
      </>
    );
  }

  return (
    <>
      <VStack flex={1} backgroundColor="#f9f9f9">
        <Header title="Ativação do aparelho SAT" />
        <ProgressBar value={30} />

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

          <Box w="100%" mb="4">
            <PopoverHeader titleClick="Informação importante">
              <PopoverComp
                title="Guarde a informação"
                body="O Código do SAT gerado será necessário ao longo de toda vida util do equipamento. Então, é muito importante anota-lo e guarda-lo em um lugar seguro"
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
        <FooterForm href="/Tax" setValue={setValue} />
      </VStack>
    </>
  );
}
