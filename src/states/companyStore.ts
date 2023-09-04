/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { UpdateRegisterSchemaProps } from '@/hooks/updateRegister/types';
import { create } from 'zustand';

const initialState = {
  companyStore: {},
};

interface TSetCompany {
}

export interface TCompany  {
    companyStore: UpdateRegisterSchemaProps;
    setData: (value: UpdateRegisterSchemaProps) => void;
}

// const useStore = create<TCompany>()((set) => ({
//   ...initialState,
//   setData: (value: Partial<UpdateRegisterSchemaProps>) => {
//     set({value});
//   },
// }));

export const useGlobalStore = create<TCompany>((set) => ({
    companyStore: {
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
    setData: (data: UpdateRegisterSchemaProps) => set({ companyStore: data }),
  }));
  
export const useCompanyStore = () => {
  const { companyStore, setData } = useGlobalStore();
  return { companyStore, setData };
};




