import { VStack, Box, ScrollView } from "native-base";
import Header from "@/components/Header";
import ProgressBar from "@/components/Progress";
import { useState } from "react";
import PopoverComp, { PopoverHeader } from "@/components/Popover";
import CheckBox from "@/components/CheckBox";
import FooterForm from "@/components/FooterForm";
import Text from "@/components/Text";
import Accordion from "@/components/Accordion";

export default function Tax() {
  const [valueBank, setValueToPass] = useState(false);
  const [taxSystem, setTaxSystem] = useState(false);
  const [sheet, setSheet] = useState(false);

  return (
    <>
      <VStack flex={1} backgroundColor="#f9f9f9">
        <Header title="Impostos" />
        <ProgressBar value={10} />

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
            value="impostos_sistema"
            description="Quero os impostos do sistema"
          />
          <CheckBox
            setValues={setSheet}
            value="planilha"
            description="Quero a planilha para meu contador preencher"
          />
        </ScrollView>
      </VStack>

      <VStack px="4" backgroundColor="#f9f9f9">
        <FooterForm href="/DataVerify" setValue={setValueToPass} />
      </VStack>
    </>
  );
}
