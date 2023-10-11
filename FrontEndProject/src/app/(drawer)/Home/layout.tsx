import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { VStack, Box, HStack, FlatList, Center, Image, ScrollView } from "native-base";
import { Card, IconButton } from 'react-native-paper';
import { equipmentByState } from "@/mocks/equipmentByState";
import { equipment } from "@/mocks/equipment";
import Text from "@/components/Text";
import DrawerHeader from "@/components/DrawerHeader";
import { HomeProps, images } from './types';

const logo = require('../../../../assets/cupom-fiscal.png')

export function Layout({
    companyInfo,
}: HomeProps) {
    return (
        <>
            <VStack flex={1} backgroundColor="#f9f9f9" justifyContent="center" px="4">
                <DrawerHeader title="" />

                <VStack my="3" >
                    <Text fontSize="2xl" fontWeight="bold" lineHeight='sm'>
                        Olá, {companyInfo[0]?.name}! 😃
                    </Text>
                </VStack>
                <ScrollView showsVerticalScrollIndicator={false}>
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
                                                <Text >Código de inscrição: </Text>
                                                <Text fontWeight="bold">{item.codLoja}</Text>
                                            </HStack>
                                            <HStack>
                                                <Text >Razão social: </Text>
                                                <Text fontWeight="bold">
                                                    {item.razaoSocial}
                                                </Text>
                                            </HStack>
                                            <HStack>
                                                <Text >CNPJ: </Text>
                                                <Text fontWeight="bold">
                                                    {item.cnpj}
                                                </Text>
                                            </HStack>
                                            <HStack>
                                                <Text >Endereço: </Text>
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
                                        <Text fontSize="xl" >Plataforma fiscal</Text>
                                        <Text fontSize="2xl" fontWeight="bold">{equipmentByState[item.state]}</Text>
                                    </VStack>
                                    <Center bgColor={'#0362C4'} borderRadius={50} width={85} height={85} >
                                        <Image source={logo} size={105} alt='' resizeMode="contain" />
                                    </Center>
                                </HStack>
                            ))}
                        </Card.Content>
                    </Card>
                    <Box my="4">
                        <Text fontSize='lg' fontWeight='medium'>Equipamentos necessários</Text>
                        <FlatList
                            data={equipment[equipmentByState[companyInfo[0]?.state]]}
                            horizontal
                            renderItem={({ item }) => (
                                <VStack mx='2' width='100px' py='2' key={item}>
                                    <Center>
                                        <VStack bgColor={'#0362C4'} borderRadius={50} position={'relative'} width={75} height={75} >
                                            <Image source={images[item]} size={75} alt='' position={'absolute'} left={2} />
                                        </VStack>
                                        <Text textAlign='center'>{item}</Text>
                                    </Center>
                                </VStack>
                            )}
                        />
                    </Box>

                    <Card style={{
                        marginBottom: 8
                    }} onPress={() => router.push(`/(drawer)/(tabs)/Steps/${equipmentByState[companyInfo[0]?.state]}`)}>
                        <LinearGradient
                            style={{ borderRadius: 12, padding: 4 }}
                            colors={['#022851', '#023265', '#023E7E', '#0362C4']} start={{ x: 0.2, y: 0.6 }}
                        >
                            <Card.Content style={{ padding: 10, flexWrap: 'wrap' }}>
                                <VStack mb='-30px'>
                                    <Text fontSize="xl" lineHeight='lg' color='white' fontWeight='bold' pl='4'>Acessar meu cadastro</Text>
                                </VStack>
                            </Card.Content>
                            <Card.Actions style={{ marginTop: -15 }}>
                                <IconButton icon="arrow-right" mode="contained" />
                            </Card.Actions>
                        </LinearGradient>
                    </Card>
                </ScrollView>
            </VStack>
        </>
    )
}