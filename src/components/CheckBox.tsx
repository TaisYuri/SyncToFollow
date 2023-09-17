// import { Checkbox, ICheckboxProps } from "native-base";
import { Checkbox, CheckboxProps } from 'react-native-paper';
import Text from './Text';
import { HStack } from 'native-base';
import { theme } from '@/theme';

interface CheckBoxProps {
  checked: boolean;
  setValues: (isSelected: boolean) => void;
  description?: string;
}

const descrip =
  "Ainda não tenho estes dados mas estou ciente e quero continuar nas etapas.";

export default function CheckBox({
  setValues,
  checked,
  description = descrip,
  ...props
}: CheckBoxProps) {
  return (
    <HStack my={2}
      mx={2}
      alignItems='center'
    >
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        // 
        // borderColor="blues.400"
        // colorScheme="info"
        onPress={() => {
          setValues(!checked);
        }}
        color={theme.colors.blues[400]}
      />
      <Text lineHeight='lg' mt={1} 
      >{description}</Text>
    </HStack>
    // </Checkbox>
  );
}
