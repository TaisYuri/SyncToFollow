import { useState } from "react";
import { useCallback } from "react";
import axios from "axios";
import { UpdateRegisterSchema, UpdateRegisterSchemaProps } from "./types";
import { ApiService } from "../../service";

export interface optionsProps {
  method: "GET" | "POST";
  url: string;
  data?: any;
}

export const useUpdateRegister = () => {
  const [loading, setLoading] = useState(false);
  const [dataUpdateRegister, setDataUpdateRegister] = useState<
    UpdateRegisterSchema[]
  >([]);

  const optionsDefault = ({ method, url, data }: optionsProps) => {
    return {
      method,
      url,
      baseURL: "http://taisyuri.pythonanywhere.com",
      headers: {
        "content-type": "multipart/form-data",
      },
      data,
    };
  };

  const getUpdateRegister = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await ApiService.get("/updateregister");
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

  const sendFavorite = useCallback(async ({ ...props }) => {
    setLoading(true);
    await axios(
      optionsDefault({
        method: "POST",
        url: `/updateregister/`,
        data: props,
      })
    )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return {
    loading,
    getUpdateRegister,
    dataUpdateRegister,
    sendFavorite,
  };
};
