import DrawerHeader from "@/components/DrawerHeader";
import { router } from 'expo-router';
import { Center, VStack, Text, Box, Button, HStack } from "native-base";
import ButtonRN from "@/components/Button";
import Login from "../../../assets/undraw_login.svg";
import { useCallback } from "react";

export default function LogOut() {

  const handleGoBack = useCallback(() => {
    router.back();
  },[])

  const handleLogout = useCallback(() => {
    router.push('/(drawer)/Login/')
  },[])


  return (
    <>
      <VStack flex={1} backgroundColor="#f9f9f9">
        <DrawerHeader title="" />
        <Center  flex={1}>
        <Box mb='5'>
          <Text fontSize='2xl' fontWeight='bold'>Tem certeza que deseja sair?</Text>
          </Box>
          <Login width="100%" height="220" />
          <HStack  mt='5' mb='2' >
          <Box width={'40%'} mr='2'>
            <ButtonRN title="Sair" disabled onPress={handleLogout}/>
          </Box>
          <Box width={'40%'} >
            <Button variant='outline' onPress={handleGoBack}><Text>Voltar</Text></Button>
          </Box>
          </HStack>
        </Center>
      </VStack>

    </>
  );
}


