import { VStack } from "native-base";
import CheckBox from "./CheckBox";
import { LinkProps } from "expo-router";
import ButtonRN from "./Button";
import { GestureResponderEvent } from "react-native";

interface FooterFormProps  {
  setValue: (isSelected: boolean) => void;
  checked:boolean;
  description?: string;
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) 

}

const descrip =
  "Ainda não tenho estes dados mas estou ciente e vou consegui-lo em breve! Quero continuar nas etapas.";

export default function FooterForm({
  setValue,
  checked,
  description = descrip,
  disabled,
 onPress,
}: FooterFormProps) {
  return (
    <VStack mt="4" mb="6">
      <CheckBox setValues={setValue} checked={checked} description={description} />
      <ButtonRN onPress={onPress} disabled={disabled}/>
    </VStack>
  );
}
