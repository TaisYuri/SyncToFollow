import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { Alert, useToast } from "native-base";
import { Keyboard } from "react-native";
import { useCompanyStepsStore } from "@/states/companyStepStore";
import { UpdateRegisterSchemaProps } from "@/hooks/updateRegister/types";
import { useInfoCompanyStore } from "@/states/infoCompanyStore";
import { ICompany, company } from "../../../mocks/company";
import Layout from "./layout";


export default function Login() {
  const [codLoja, setCodLoja] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {  setDataSteps } = useCompanyStepsStore();
  const {  setData } = useInfoCompanyStore();

  useFocusEffect(
    useCallback(() => {
    setDataSteps({} as UpdateRegisterSchemaProps )
    setData({} as ICompany  )
    setCodLoja("")
    setCnpj("")

  }, []))

  const toast = useToast();

  const handleLogin = () => {
    const filterLogin = company.filter(
      (item) => item.codLoja === codLoja && item.cnpj === cnpj
    );
    if (filterLogin.length > 0) {
      setIsLoading(true);
      Keyboard.dismiss()
      setTimeout(() => {
        toast.show({
          render: () => {
            return (
              <Alert w="100%" status={"success"}>
                Login realizado com sucesso
              </Alert>
            );
          },
          duration: 1500,
        });
      }, 2700);
      return setTimeout(() => {
        setIsLoading(false);
        router.push(`/(drawer)/Home/${codLoja}`);
      }, 3000);
    } else {
      toast.show({
        render: () => {
          return (
            <Alert w="100%" status={"error"}>
              Ops! Código de inscrição ou CNPJ incorretos
            </Alert>
          );
        },
        duration: 1000,
      });
    }
  };

  return (
    <Layout
      buttonLogin={handleLogin}
      cnpj={cnpj}
      codLoja={codLoja}
      setCnpj={setCnpj}
      setCodLoja={setCodLoja}
      loading={isLoading }
    />
  );
}
