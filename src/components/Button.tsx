import { Button, IButtonProps, Text } from "native-base";
import { Link, LinkProps } from "expo-router";
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
    // <Link asChild {...props}>
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
    {/* </Link> */}
    </>
  );
}
