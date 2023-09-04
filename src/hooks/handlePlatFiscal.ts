import { ICompany, company } from "@/mocks/company";
import { equipmentByState } from "@/mocks/equipmentByState";
import { useCallback, useState } from "react";

export const handlePlatFiscal = () => {
    const [equipament, setEquipament] = useState('');


    const getPlatFiscal = useCallback((codLoja: string) => {
        const filter = company.filter(item => item.codLoja === codLoja)
        return setEquipament(equipmentByState[filter[0]?.state])
    }, [])

    return {
        equipament, getPlatFiscal
    }

}