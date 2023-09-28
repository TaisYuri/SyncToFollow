import { Checkbox } from 'react-native-paper';
import Text from './Text';
import { HStack } from 'native-base';
import { theme } from '@/theme';

interface CheckBoxProps {
  checked: boolean;
  setValues: (isSelected: boolean) => void;
  description?: string;
}

export default function CheckBox({
  setValues,
  checked,
  description
}: CheckBoxProps) {
  return (
    <HStack my={2}
      mx={2}
      alignItems='center'
      pr='7'
    >
      <Checkbox
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setValues(!checked);
        }}
        color={theme.colors.blues[400]}
      />
      <Text lineHeight='lg' mt={1} >{description}</Text>
    </HStack>
  );
}
