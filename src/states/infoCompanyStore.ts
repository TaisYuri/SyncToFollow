import { ICompany } from '@/mocks/company';
import { create } from 'zustand';

export interface TCompany  {
    infoCompanyStore: ICompany;
    setData: (value?: ICompany) => void;
}

export const useGlobalStore = create<TCompany>((set) => ({
    infoCompanyStore: {
      codLoja: "",
      cnpj: "",
      razaoSocial: "",
      name: "",
      address: "",
      city: "",
      state: "",
    },
    setData: (data?: ICompany) => set({ infoCompanyStore: data }),
  }));
  
export const useInfoCompanyStore = () => {
  const { infoCompanyStore, setData } = useGlobalStore();
  return { infoCompanyStore, setData };
};




