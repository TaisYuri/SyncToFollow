import Text from "@/components/Text";
import { Button, Center, ScrollView, VStack, Alert, useToast, IconButton, CloseIcon, HStack, Box, Pressable } from "native-base";
import { useCallback, useEffect, useState } from "react";
import moment from 'moment';
import CalendarPicker from "react-native-calendar-picker";
import { theme } from "@/theme";
import { useScheduled } from "@/hooks/scheduled";
import { ActivityIndicator } from 'react-native-paper';
import DrawerHeader from "@/components/DrawerHeader";
import { useCompanyStepsStore } from "@/states/companyStepStore";
import ButtonRN from "@/components/Button";
import { Touchable } from "react-native";
import { useInfoCompanyStore } from "@/states/infoCompanyStore";

const week = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

const hours = [
  '08:00', '08:30',
  '09:00', '09:30',
  '10:00', '10:30',
  '11:00', '11:30',
  '12:00', '12:30',
  '13:00', '13:30',
  '14:00', '14:30',
  '15:00', '15:30',
  '16:00', '16:30',
  '17:00', '17:30',
  '18:00', '18:30',
  '19:00', '19:30',
  '20:00'
]


const data = {
  name: "joaozinho2",
  email: "joaozinho2@teste.com",
  codLoja: "9998",
  type: "Primeira instalação",
  ticket: "13342",
  appointmentDate: "2023-09-06",
  appointmentTime: "13:51:00"
}

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);
  const [selectedHour, setSelectedHour] = useState("");
  const [listHoursAvailable, setListHoursAvailable] = useState<string[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [otherScheduled, setOtherScheduled] = useState(false);
  const toast = useToast();

  const { infoCompanyStore } = useInfoCompanyStore();

  const startDate = selectedDate ? selectedDate.format('YYYY-MM-DD').toString() : '';

  const { dataScheduled, getScheduled, sendCalendar, hasStatusSend } = useScheduled();


  useEffect(() => {
    getScheduled()
  }, [])


  useEffect(() => {
    setisLoading(true)
    if (dataScheduled) {
      const filterDate = dataScheduled.filter(item => item.appointmentDate === startDate);
      const availableHours = hours.filter(hour => !filterDate.some(item => item.appointmentTime.slice(0, 5) === hour));
      setListHoursAvailable(availableHours)
      setSelectedHour("")
    }

    setTimeout(() => setisLoading(false), 200)

  }, [dataScheduled, startDate, hours, setListHoursAvailable])


  useEffect(() => {
    setisLoading(true)
    if (dataScheduled) {
      const filterLoja = dataScheduled.filter(item => item.codLoja === infoCompanyStore.codLoja)
      setOtherScheduled(Boolean(filterLoja))
      console.log("LOJAAA", Boolean(filterLoja))
    }
    setisLoading(false)
  }, [])

  const handleConfirm = useCallback(async() => {
    setisLoading(true)
   await sendCalendar({
      ...data,
      codLoja: infoCompanyStore.codLoja,
      name: infoCompanyStore.name, 
      appointmentDate: startDate,
      appointmentTime: selectedHour.concat(":00")
    }).then(() => returnMessage())
    setisLoading(false)

    
  }, [data, startDate, selectedHour, sendCalendar])

  
  const returnMessage = () => {
    if(hasStatusSend == 'Success'){
      getScheduled()
        toast.show({
          render: () => {
            return (
              <Alert w="100%" status={"success"}>
                Agendamento realizado com sucesso!
              </Alert>
            );
          },
        })
    }else{
        toast.show({
          render: () => {
            return (
              <Alert w="100%" status={"warning"}>
                Ops! Algo deu errado. Tente novamente.
              </Alert>
            );
          },
        })
    }
  }

  Date.prototype.addHours = function (h: number): Date {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  const handleItem = useCallback((item: string) => {
    setSelectedHour(item)
  }, [setSelectedHour])

  const handleAlert = useCallback(() => {
    if (otherScheduled) {
      return (
        <Pressable onPress={() => console.log("teste")} p='0' m='0' my='4'>
          <Alert maxW="400" status="info" colorScheme="info">
            <VStack space={1} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                  Sua loja já possui um agendamento
                </Text>
              </HStack>

              <Box pl="6" mt={-2} _text={{
                color: "coolGray.600"
              }}>
                Clique aqui para acompanhar seus agendamentos!
              </Box>
            </VStack>
          </Alert>
        </Pressable>
      )
    }
  }, [otherScheduled])


  return (
    <VStack flex={1} bgColor='#f9f9f9' px="4">
      <DrawerHeader title="Agendamento" />
      {handleAlert()}
      <VStack my='4'>
        <Text fontSize='lg'>Escolha o dia de preferência:</Text>

        <CalendarPicker
          onDateChange={setSelectedDate}
          weekdays={week}
          months={months}
          previousTitle='Anterior'
          nextTitle="Próximo"
          selectedDayColor={theme.colors.blues[400]}
          todayBackgroundColor='#c9c9d0' />
      </VStack>

      <Text fontSize='lg'>Escolha também o melhor horário para você:</Text>
      <Text fontSize='md'>Horários disponíveis</Text>
      {isLoading ?
        <Center mb='8' flex={1}><ActivityIndicator /></Center>
        : <>
          <VStack mb='8' mt="2" flex={1}>
            <ScrollView height={'40%'} >
              <Center flexWrap='wrap' flexDirection='row'>
                {listHoursAvailable?.map(item =>
                  <VStack m='1' key={item}>
                    <Button
                      bgColor={item === selectedHour ? "blues.800" : "blues.400"} px='3' py='5px' borderRadius='xl' onPress={() => handleItem(item)}><Text color={'white'} fontWeight='bold'>{item}</Text></Button>
                  </VStack>
                )}
              </Center>
            </ScrollView>
          </VStack>
          <VStack mb='4' >
            <ButtonRN title="AGENDAR" onPress={handleConfirm} disabled={Boolean(startDate.length) && Boolean(selectedHour.length)} />
          </VStack>
        </>
      }
    </VStack>
  );
}


