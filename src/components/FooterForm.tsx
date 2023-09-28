import { VStack } from "native-base";
import CheckBox from "./CheckBox";

interface FooterFormProps {
  setValue: (isSelected: boolean) => void;
  checked: boolean;
  description?: string;
}

const descrip =
  "Ainda não tenho estes dados mas estou ciente e quero continuar nas etapas.";

export default function FooterForm({
  setValue,
  checked,
  description = descrip,

}: FooterFormProps) {
  return (
    <VStack mt="4" mb="6">
      <CheckBox setValues={setValue} checked={checked} description={description} />
    </VStack>
  );
}
