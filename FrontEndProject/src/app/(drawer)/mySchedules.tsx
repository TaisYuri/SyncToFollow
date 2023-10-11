import DrawerHeader from "@/components/DrawerHeader";
import { useFocusEffect } from 'expo-router';
import { Center, VStack, Text, Box, HStack, Icon } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { transformDate, transformHour } from "@/utils";
import { ActivityIndicator, Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useInfoCompanyStore } from "@/states/infoCompanyStore";
import { useScheduled } from "@/hooks/scheduled";
import { ScheduledSchema } from "@/hooks/scheduled/types";
import { useCompanyStepsStore } from "@/states/companyStepStore";

import Empty from "../../../assets/empty.svg";

export default function MySchedules() {
  const [isLoading, setisLoading] = useState(true);
  const [listDates, setListDates] = useState<ScheduledSchema[]>([]);

  const { dataScheduled, getScheduled } = useScheduled();
  const { infoCompanyStore } = useInfoCompanyStore();
  const { companyStepsStore } = useCompanyStepsStore();

  useFocusEffect(
    useCallback(() => {
      getScheduled()
    }, [])
  )

  useEffect(() => {
    setisLoading(true)
    if (dataScheduled) {
      const filterLoja = dataScheduled.filter(item => item.codLoja === infoCompanyStore.codLoja)
      setListDates(filterLoja)
    }
    setTimeout(() => setisLoading(false), 300)
  }, [dataScheduled])

  const listNextDates = listDates.filter(item => new Date(`${item.appointmentDate}T00:00`) >= new Date())
  const listPreviousDates = listDates.filter(item => new Date(`${item.appointmentDate}T00:00`) < new Date())

  if (isLoading) {
    return <Center flex={1}><ActivityIndicator size='large' color="#047AF5" /></Center>
  }

  // if (!listDates.length && !isLoading) {
  //   return (
  //     <VStack flex={1} backgroundColor="#f9f9f9">
  //       <DrawerHeader title="Meus agendamentos" showProfileRoute={companyStepsStore?.steps?.impostos ? true : false} />
  //       <Center flex={1}>
  //         <Box m='4' flexWrap='wrap'><Text fontSize='2xl' fontWeight='bold'>Sem agendamentos por enquanto </Text></Box>
  //         <Empty width="100%" height="220" />
  //       </Center>
  //     </VStack>
  //   )
  // }

  return (
    <>
      <VStack flex={1} backgroundColor="#f9f9f9">
        <DrawerHeader title="Meus agendamentos" showProfileRoute={companyStepsStore?.steps?.impostos ? true : false} />

        {!listDates.length && !isLoading
          ? <Center flex={1}>
            <Box m='4' flexWrap='wrap'><Text fontSize='2xl' fontWeight='bold'>Sem agendamentos por enquanto </Text></Box>
            <Empty width="100%" height="220" />
          </Center>
          : <VStack flex={1} mt='4' mx='4'>
            <Center mb='5'>
              <Text fontSize='2xl' fontWeight='bold'>Meus agendamentos</Text>
            </Center>
            <Text fontSize='lg' >Próximos</Text>
            {listNextDates.map((item, index) => (
              <Card key={index} style={{ marginBottom: 8 }}>
                <Card.Content style={{ padding: 10, flexWrap: 'wrap' }}>
                  <HStack alignItems='center' justifyContent='space-between'>
                    <VStack mr='4'>
                      <Text lineHeight='sm' fontWeight='bold'>Data: {transformDate(item.appointmentDate)}</Text>
                      <Text lineHeight='sm' fontWeight='bold'>Horário: {transformHour(item.appointmentTime)}</Text>
                      <Text lineHeight='sm' fontWeight='bold'>Número do Ticket: {item.ticket}</Text>
                    </VStack>
                    <Icon
                      as={MaterialIcons}
                      name="check-circle"
                      size="lg"
                      mx="2px"
                      color="green.400"
                    />
                  </HStack>
                </Card.Content>
              </Card>))
            }
            <Box mt='4'>

              <Text fontSize='lg' >Datas expiradas</Text>
              {listPreviousDates.map((item, index) => (
                <Card key={index} style={{ marginBottom: 8 }}>
                  <Card.Content style={{ padding: 10, flexWrap: 'wrap' }}>
                    <HStack alignItems='center' justifyContent='space-between'>
                      <VStack mr='4'>
                        <Text lineHeight='sm' fontWeight='bold'>Data: {transformDate(item.appointmentDate)}</Text>
                        <Text lineHeight='sm' fontWeight='bold'>Horário: {transformHour(item.appointmentTime)}</Text>
                        <Text lineHeight='sm' fontWeight='bold'>Número do Ticket: {item.ticket}</Text>
                      </VStack>
                      <Icon
                        as={MaterialIcons}
                        name="cancel"
                        size="lg"
                        mx="2px"
                        color="red.400"
                      />
                    </HStack>
                  </Card.Content>
                </Card>))
              }
            </Box>
          </VStack>}
      </VStack>

    </>
  );
}


