export interface UpdateRegisterSchemaProps {
  codLoja: string;
  platFiscal: string;
  cadBanco?: boolean;
  cadRF?: boolean;
  csc_acSat: string;
  certDigital_atvSat: string;
  impostos?: boolean;
  check_status?: boolean;
  steps: Steps; 
}

export interface Steps {
  cadBanco: boolean;
  cadRF: boolean;
  csc_acSat: boolean;
  certDigital_atvSat: boolean;
  impostos: boolean;
}
