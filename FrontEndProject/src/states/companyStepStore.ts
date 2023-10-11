import { UpdateRegisterSchemaProps } from '@/hooks/updateRegister/types';
import { create } from 'zustand';

export interface TCompanySteps  {
    companyStepsStore: UpdateRegisterSchemaProps;
    setDataSteps: (value?: UpdateRegisterSchemaProps) => void;
}

export const useGlobalStore = create<TCompanySteps>((set) => ({
  companyStepsStore: {
        codLoja: "",
        platFiscal: "",
        cadBanco: false,
        cadRF: false,
        csc_acSat: "",
        certDigital_atvSat: "",
        impostos: false,
        check_status: false,
        steps: {
            cadBanco: false,
            cadRF: false,
            csc_acSat: false,
            certDigital_atvSat: false,
            impostos: false
        }
    },
    setDataSteps: (data?: UpdateRegisterSchemaProps) => set({ companyStepsStore: data }),
  }));
  
export const useCompanyStepsStore = () => {
  const { companyStepsStore, setDataSteps } = useGlobalStore();
  return { companyStepsStore, setDataSteps };
};




