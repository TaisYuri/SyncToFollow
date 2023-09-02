import { Button, IButtonProps, Text } from "native-base";
import { Link, LinkProps } from "expo-router";

export interface ButtonProps extends LinkProps<any> {
  title?: string;
}

export default function ButtonRN({
  title = "Continuar",
  ...props
}: ButtonProps) {
  return (
    <Link asChild {...props}>
      <Button bgColor="blues.400">
        <Text color="white" fontWeight="bold">
          {title}
        </Text>
      </Button>
    </Link>
  );
}
