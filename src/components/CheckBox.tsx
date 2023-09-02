import { Checkbox, ICheckboxProps } from "native-base";

interface CheckBoxProps extends ICheckboxProps {
  value: string;
  setValues: (isSelected: boolean) => void;
  description?: string;
}

const descrip =
  "Ainda não tenho estes dados mas estou ciente e vou consegui-lo em breve! Quero continuar nas etapas.";

export default function CheckBox({
  setValues,
  description = descrip,
  ...props
}: CheckBoxProps) {
  return (
    <Checkbox
      my={2}
      mx={2}
      borderColor="blues.400"
      colorScheme="info"
      onChange={setValues}
      {...props}
    >
      {description}
    </Checkbox>
  );
}
