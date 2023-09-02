import { useState } from "react";
import { useCallback } from "react";
import axios from "axios";
import { ScheduledSchema, ScheduledSchemaProps } from "./types";
import { ApiService } from "../../service";

export const useScheduled = () => {
  const [loading, setLoading] = useState(false);
  const [dataScheduled, setDataScheduled] = useState<ScheduledSchema[]>([]);

  const getScheduled = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await ApiService.get("/api");
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

  const sendFavorite = useCallback(
    async ({ ...props }: ScheduledSchemaProps) => {
      setLoading(true);
      await ApiService.post("/api/", {
        ...props,
      })
        .then(function (response) {
          console.log(response);
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
    sendFavorite,
  };
};
