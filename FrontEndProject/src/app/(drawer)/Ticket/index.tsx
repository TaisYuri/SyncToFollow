import { router, useGlobalSearchParams } from 'expo-router';
import { Center, VStack, Text, Box } from "native-base";
import { transformDate, transformHour } from "@/utils";
import ButtonRN from "@/components/Button";
import DrawerHeader from "@/components/DrawerHeader";
import Calendar from "../../../../assets/calendar.svg";

export default function Ticket() {
  const { appointmentDate, appointmentTime, ticket, type, createdDate } = useGlobalSearchParams();

  return (
    <>
      <VStack flex={1} backgroundColor="#f9f9f9">
        <DrawerHeader title="" />
        <Center flex={1}>
          <Center mb='5'>
            <Text fontSize='2xl' fontWeight='bold'>Seu agendamento</Text>
            <Text fontSize='xl' fontWeight='bold' textDecorationLine='underline'>{transformDate(appointmentDate as string)} as {transformHour(appointmentTime as string)}</Text>
          </Center>
          <Calendar width="100%" height="220" />
          <Center my='5' px='4'>
            <Text fontSize='xl' fontWeight='bold'>Lembre-se que no dia da instalação do sistema, você precisará informar o ticket:</Text>
            <Text fontSize='3xl' fontWeight='bold' textDecorationLine='underline'>{ticket}</Text>
          </Center>
        </Center>
        <Box px='4'>
          <Text fontSize='sm'>Tipo de instalação: {type}</Text>
          <Text fontSize='sm'>Criado em: {transformDate(createdDate as string)}</Text>
        </Box>
        <Center my='5' px='4'>
          <Box width={'80%'} mb='2'>
            <ButtonRN title="Ir para meus agendamentos" disabled  onPress={() => router.push('/(drawer)/mySchedules')} />
          </Box>
        </Center>
      </VStack>

    </>
  );
}


