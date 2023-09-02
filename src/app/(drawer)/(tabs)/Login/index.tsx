import { useState } from "react";
import Layout from "./layout";
import { company } from "../../../../mocks/company";
import { useRouter, useGlobalSearchParams, router } from "expo-router";
import { Alert, IToastProps, useToast } from "native-base";

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
          duration: 1000,
        });
      }, 400);
      return setTimeout(() => {
        setLoading(false);
        router.push(`/(drawer)/Welcome/${codLoja}`);
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
