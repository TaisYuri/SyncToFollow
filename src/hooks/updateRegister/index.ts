import { useState } from "react";
import { useCallback } from "react";
import axios from "axios";
import { UpdateRegisterSchema, UpdateRegisterSchemaProps } from "./types";
import { ApiService } from "../../service";

export interface optionsProps {
  method: "GET" | "POST" | "PUT";
  url: string;
  data?: any;
}

export const useUpdateRegister = () => {
  const [loading, setLoading] = useState(false);
  const [dataUpdateRegister, setDataUpdateRegister] = useState<
    UpdateRegisterSchema
  >();

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

  const getUpdateRegister = useCallback(async (codLoja: string) => {
    try {
      setLoading(true);
      const { data } = await ApiService.get(`/updateregister/${codLoja}`);
      setDataUpdateRegister(data);
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

  const sendUpdateRegister = useCallback(async ({ ...props }) => {
    setLoading(true);
    await axios(
      optionsDefault({
        method: "POST",
        url: "/updateregister/",
        data: props,
      })
    )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error);
        }
      });
  }, []);

  const requestUpdateRegister = useCallback(async (props: UpdateRegisterSchemaProps) => {
    setLoading(true);
    await axios(
      optionsDefault({
        method: "PUT",
        url: `/updateregister/${props.codLoja}/`,
        data: props,
      })
    )
      .then(function (response) {
        // console.log(response.data);
        console.log();
      })
      .catch(function (error) {
        if (error.response) {
          console.log("Log",error.response.data);
        } else {
          console.log(error);
        }
      });
  }, []);

  return {
    loading,
    getUpdateRegister,
    dataUpdateRegister,
    sendUpdateRegister,
    requestUpdateRegister
  };
};
