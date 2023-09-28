import { useState } from "react";
import { useCallback } from "react";
import axios from "axios";
import { ScheduledSchema, ScheduledSchemaProps } from "./types";
import { ApiService } from "../../service";
import { optionsProps } from "../updateRegister";
import { router } from "expo-router";

export const useScheduled = () => {
  const [loading, setLoading] = useState(false);
  const [dataScheduled, setDataScheduled] = useState<ScheduledSchema[]>([]);
  const [hasStatusSend, setHasStatusSend] = useState<string | undefined>(undefined);


  const optionsDefault = ({ method, url, data }: optionsProps) => {
    return {
      method,
      url,
      baseURL: "http://taisyuri.pythonanywhere.com",
      headers: {
        "content-type": "application/json",
      },
      data,
    };
  };


  const getScheduled = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await ApiService.get("/api/");
      setDataScheduled(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.log(error);
      } else {
        console.log(error);
      }
    }
  }, []);

  const sendCalendar = useCallback(
    async ({ ...props }: ScheduledSchemaProps) => {
      setLoading(true);
      await axios(
        optionsDefault({
          method: "POST",
          url: "/api/",
          data: props,
        })
      )
        .then(function (response) {
          console.log(response)
          if(response.status === 201) {
            setHasStatusSend("Agendamento realizado com sucesso!")
            router.push({ pathname: '/(drawer)/Ticket', params: {
              appointmentDate: response.data.appointmentDate, 
              appointmentTime: response.data.appointmentTime,
              ticket: response.data.ticket,
              type: response.data.type,
              createdDate: response.data.createdDate,
            
            } })
          }
          else{
            setHasStatusSend("Ops! Algo deu errado. Tente novamente.")
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    []
  );

  return {
    loading,
    getScheduled,
    dataScheduled,
    sendCalendar,
    hasStatusSend
  };
};
