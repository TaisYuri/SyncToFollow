import { VStack, Box, HStack, FlatList, Center, Image } from "native-base";
import { useEffect, useState } from "react";
import Text from "@/components/Text";
import { Link, useGlobalSearchParams } from "expo-router";
import DrawerHeader from "@/components/DrawerHeader";
import { ICompany, company } from "@/mocks/company";
import { Card, IconButton } from 'react-native-paper';
import { equipmentByState } from "@/mocks/equipmentByState";
import { equipment } from "@/mocks/equipment";
import { LinearGradient } from 'expo-linear-gradient';
import { useUpdateRegister } from "@/hooks/updateRegister";
import { initialValues } from "@/mocks/initialValues";
import { useCompanyStore } from "@/states/companyStore";

export default function Home() {
  const [companyInfo, setCompanyInfo] = useState<ICompany[]>([]);
  const { codLoja } = useGlobalSearchParams();

  const { sendUpdateRegister, } = useUpdateRegister()
  const {setData} = useCompanyStore();

  const impr = require('../../../../../assets/Impr.png')
  const certif = require('../../../../../assets/certificado.png')
  const pinpad = require('../../../../../assets/pinpad.png')

  useEffect(() => {
    if (codLoja) {
      setCompanyInfo(company.filter(item => item.codLoja === codLoja))
      sendUpdateRegister(initialValues(codLoja as string))
    }
  }, [])

  useEffect(() => {
    setData({
      ...initialValues(codLoja as string)
    })
  },[])

  return (
    <>
      <VStack flex={1} backgroundColor="#f9f9f9" justifyContent="center" px="4">
        <DrawerHeader title="" />

        <VStack mb="3" >
          <Text fontSize="4xl" fontWeight="bold" lineHeight='sm'>
            Olá,
          </Text>
          <Text fontSize="3xl" lineHeight='sm'>{companyInfo[0]?.name}!</Text>
        </VStack>
        <Box mb="3">
          <Card style={{ backgroundColor: "#f9f9f9" }} >
            <LinearGradient
              style={{ borderRadius: 12, padding: 4 }}
              colors={['#DDE9F7', '#F1F6FC']} start={{ x: 0.2, y: 0.6 }}
            >
              <Card.Content style={{ padding: 10, flexWrap: 'wrap' }}>
                {companyInfo?.map(item => (
                  <VStack key={item.codLoja}>
                    <HStack>
                      <Text >Código de inscrição:</Text>
                      <Text fontWeight="bold">{item.codLoja}</Text>
                    </HStack>
                    <HStack>
                      <Text >Razão social:</Text>
                      <Text fontWeight="bold">
                        {item.razaoSocial}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text >CNPJ:</Text>
                      <Text fontWeight="bold">
                        {item.cnpj}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text >Endereço:</Text>
                      <Text fontWeight="bold">
                        {item.address} - {item.city} - {item.state}
                      </Text>

                    </HStack>
                  </VStack>
                ))}
              </Card.Content>
            </LinearGradient>
          </Card>
        </Box>
        <Card style={{ backgroundColor: "#f9f9f9" }} >
          <Card.Content style={{ padding: 10, flexWrap: 'wrap' }}>
            {companyInfo?.map(item => (
              <HStack justifyContent='space-around' alignItems='center' key={item.codLoja}>
                <VStack alignItems='center'  >
                  <Text fontSize="2xl" >Plataforma fiscal</Text>
                  <Text fontSize="3xl" fontWeight="bold">{equipmentByState[item.state]}</Text>
                </VStack>
                <VStack bgColor={'#0362C4'} borderRadius={50} position={'relative'} width={85} height={85} >
                  <Image source={require('../../../../../assets/Sat.png')} size={95} alt='' position={'absolute'} left={2} resizeMode="contain" />
                </VStack>
              </HStack>
            ))}
          </Card.Content>
        </Card>
        <Box my="4">
          <Text fontSize='lg' fontWeight='medium'>Demais equipamentos necessários</Text>
          <FlatList
            data={equipment[equipmentByState[companyInfo[0]?.state]]}
            horizontal
            renderItem={({ item }) => (
              <VStack mx='2' width='100px' py='2' key={item}>
                <Center>
                  <VStack bgColor={'#0362C4'} borderRadius={50} position={'relative'} width={75} height={75} >
                    <Image source={item === 'Impressora não fiscal' ? impr : item === 'Certificado digital' ? certif : pinpad} size={75} alt='' position={'absolute'} left={2} />
                  </VStack>
                  <Text textAlign='center'>{item}</Text>
                </Center>
              </VStack>
            )}
          />
        </Box>

        <Card >
          <LinearGradient
            style={{ borderRadius: 12, padding: 4 }}
            colors={['#022851', '#023265', '#023E7E', '#0362C4']} start={{ x: 0.2, y: 0.6 }}
          >
            <Card.Content style={{ padding: 10, flexWrap: 'wrap' }}>
              <VStack mb='-30px'>
                <Text fontSize="3xl" lineHeight='sm' color='white' fontWeight='bold'>Começar a preencher meu cadastro!</Text>
              </VStack>

            </Card.Content>
            <Card.Actions>
              <Link href={`/(drawer)/(tabs)/CadUnico/${equipmentByState[companyInfo[0]?.state]}`}>
                <IconButton icon="arrow-right" mode="contained" />
              </Link>
            </Card.Actions>
          </LinearGradient>
        </Card>
      </VStack>
    </>
  );
}
