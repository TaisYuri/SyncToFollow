export interface UpdateRegisterSchemaProps {
  codLoja: string;
  platFiscal: string;
  csc_acSat: string;
  ticket?: string;
  certDigital_atvSat: string;
  cadBanco?: boolean;
  cadRF?: boolean;
  impostos?: boolean;
  check_status?: boolean;
  steps: Steps;
  fileCsc_acSat?: FormData;
  fileNameCsc_acSat?: string;
  fileCertDigital_atvSat?: string;
}

export interface UpdateRegisterSchema extends UpdateRegisterSchemaProps {
  createdDate: string;
}

export interface Steps {
  cadBanco: boolean;
  cadRF: boolean;
  csc_acSat: boolean;
  certDigital_atvSat: boolean;
  impostos: boolean;
}
