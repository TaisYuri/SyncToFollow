import { useEffect } from "react";
import { useScheduled } from "@/hooks/scheduled";

export function Controller() {
  const { dataScheduled, getScheduled, loading } = useScheduled();
  // console.log("data", dataScheduled);

  useEffect(() => {
    getScheduled();
  }, []);

  return {
    dataScheduled,
    getScheduled,
    loading,
  };
}
