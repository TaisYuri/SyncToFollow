export interface LoginProps {
  buttonLogin: () => void;
  setCodLoja: (codLoja: string) => void;
  setCnpj: (cnpj: string) => void;
  codLoja: string;
  cnpj: string;
  loading: boolean;
}
