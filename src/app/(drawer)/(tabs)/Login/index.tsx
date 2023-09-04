import { useEffect, useState } from "react";
import Layout from "./layout";
import { company } from "../../../../mocks/company";
import { useRouter, useGlobalSearchParams, router } from "expo-router";
import { Alert, IToastProps, useToast } from "native-base";
import { useUpdateRegister } from "@/hooks/updateRegister";
import { initialValues } from "@/mocks/initialValues";

const data = {
  codLoja: "0002",
  platFiscal: "-",
  cadBanco: false,
  cadRF: false,
  csc_acSat: "-",
  certDigital_atvSat: "-",
  impostos: false,
  check_status: false,
  steps: {
    cadBanco: false,
    cadRF: false,
    csc_acSat: false,
    certDigital_atvSat: false,
    impostos: false
  }
};
const dataPut = {
  codLoja: "0001",
  platFiscal: "SAT",
  cadBanco: false,
  cadRF: false,
  csc_acSat: "22222",
  certDigital_atvSat: "45444",
  impostos: false,
  check_status: false,
  steps: {
    cadBanco: true,
    cadRF: false,
    csc_acSat: false,
    certDigital_atvSat: false,
    impostos: false
  }
};


export default function Login() {
  const [codLoja, setCodLoja] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);

  const router2 = useRouter();
  const searchParams = useGlobalSearchParams();
  const toast = useToast();


  const handleLogin = () => {
    const filterLogin = company.filter(
      (item) => item.codLoja === codLoja && item.cnpj === cnpj
    );
    if (filterLogin.length > 0) {
      setLoading(true);
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
        setLoading(false);
        router.push(`/(drawer)/(tabs)/Home/${codLoja}`);
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
      loading={loading}
    />
  );
}
