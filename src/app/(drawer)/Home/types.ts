import { ICompany } from "@/mocks/company";
import { ImageSourcePropType } from "react-native";

const impr = require('../../../../assets/Impr.png')
const certif = require('../../../../assets/certificado.png')
const pinpad = require('../../../../assets/pinpad.png')
const sat = require('../../../../assets/sat.png')



export interface HomeProps{
    companyInfo: ICompany[];
    
}



export const images: { [key: string]: ImageSourcePropType | undefined } = {
    "Impressora não fiscal": impr,
    "Sat": sat,
    "Certificado digital": certif,
    "Pinpad": pinpad
  }