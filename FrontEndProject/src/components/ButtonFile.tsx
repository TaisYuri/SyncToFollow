import { Button, IButtonProps, Text } from "native-base";

export interface ButtonProps extends IButtonProps {
  title?: string;
  handleDocumentSelection: () => void;
}

export default function ButtonFile({
  title = "Selecionar arquivo 📑",
  handleDocumentSelection,
  ...props
}: ButtonProps) {
  return (
    <Button
      onPress={handleDocumentSelection}
      variant="outline"
      borderColor="blues.400"
      borderWidth={2}
      width="70%"
      alignSelf="center"
      mt="8"
      {...props}
    >
      <Text fontSize="lg" fontWeight="bold">
        {title}
      </Text>
    </Button>
  );
}
