import { Button,  Text } from "native-base";
import { GestureResponderEvent } from "react-native";

export interface ButtonProps {
  title?: string;
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) 
}

export default function ButtonRN({
  title = "Continuar",
  disabled,
  onPress
}: ButtonProps) {
  return (
    <>
      {!disabled 
      ? <Button bgColor="gray.200" size={'lg'} disabled>
          <Text color="white" fontWeight="bold">
            {title}
          </Text>
        </Button>
        :<Button bgColor="blues.400" size={'lg'}  onPress={onPress}>
          <Text color="white" fontWeight="bold">
            {title}
          </Text>
        </Button>
      }
    </>
  );
}
