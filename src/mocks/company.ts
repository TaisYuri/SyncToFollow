export interface ICompany {
  codLoja: string;
  cnpj: string;
  razaoSocial: string;
  name: string;
  address: string;
  city: string;
  state: string;
}

export const company: ICompany[] = [
  {
    codLoja: "1234",
    cnpj: "70586490000135",
    razaoSocial: "Comercio de produtos ltda",
    name: "Antonio Gustavo Bryan Mendes",
    address: "Rua Walter Billian",
    city: "Manaus",
    state: "AM",
  },
  {
    codLoja: "6789",
    cnpj: "02924339000100",
    razaoSocial: "Serviços & comercios ltda",
    name: "Marlene Betina Luna Vieira",
    address: "Avenida Paulista",
    city: "São Paulo",
    state: "SP",
  },
];

//7 058 649 00 001 35
