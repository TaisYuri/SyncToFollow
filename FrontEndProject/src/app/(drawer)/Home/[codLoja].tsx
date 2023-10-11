import { useCallback, useState } from "react";
import { useFocusEffect, useGlobalSearchParams } from "expo-router";
import { ICompany, company } from "@/mocks/company";
import { useUpdateRegister } from "@/hooks/updateRegister";
import { useCompanyStepsStore } from "@/states/companyStepStore";
import { useInfoCompanyStore } from "@/states/infoCompanyStore";
import { Layout } from "./layout";

export default function Home() {
  const [companyInfo, setCompanyInfo] = useState<ICompany[]>([]);
  const { codLoja } = useGlobalSearchParams();

  const { getUpdateRegister, dataUpdateRegister } = useUpdateRegister()
  const { setDataSteps } = useCompanyStepsStore();
  const { setData } = useInfoCompanyStore();

  //CADATRAR LOJA 
  //sendUpdateRegister(initialValues(codLoja as string))

  useFocusEffect(
    useCallback(() => {
      if (codLoja) {
        setCompanyInfo(company.filter(item => item.codLoja === codLoja))
        setData(company.find(item => item.codLoja === codLoja))
        getUpdateRegister(codLoja as string)
      }
    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      if (dataUpdateRegister) {
        setDataSteps(dataUpdateRegister)
      }
    }, [dataUpdateRegister]))


  return (
    <Layout companyInfo={companyInfo} />
  )
}
