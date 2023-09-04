export const initialValues= (codLoja: string) => {
    return {
        codLoja: codLoja,
        platFiscal: "-",
        cadBanco: false,
        cadRF: false,
        csc_acSat: "-",
        certDigital_atvSat: "-",
        impostos: false,
        check_status: false,
        steps: {
            cadBanco: false,
            cadRF: false,
            csc_acSat: false,
            certDigital_atvSat: false,
            impostos: false
        }
    }
}