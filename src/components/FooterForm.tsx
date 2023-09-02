import { VStack } from "native-base";
import CheckBox from "./CheckBox";
import { LinkProps } from "expo-router";
import ButtonRN from "./Button";

interface FooterFormProps extends LinkProps<any> {
  setValue: (isSelected: boolean) => void;
  description?: string;
}

const descrip =
  "Ainda não tenho estes dados mas estou ciente e vou consegui-lo em breve! Quero continuar nas etapas.";

export default function FooterForm({
  setValue,
  description = descrip,
  ...props
}: FooterFormProps) {
  return (
    <VStack mt="4" mb="6">
      <CheckBox setValues={setValue} value="check" description={description} />
      <ButtonRN {...props} />
    </VStack>
  );
}
