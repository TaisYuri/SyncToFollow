import { HStack, Icon, Popover, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";

interface PopoverProps {
  title?: string;
  body?: string;
  bodyAux?: string;
}
interface PopoverHeaderProps {
  titleClick: string;
  children: React.ReactNode;
}

export default function PopoverComp({ title, body, bodyAux }: PopoverProps) {
  return (
    <Popover.Content accessibilityLabel="cadastro" w="56">
      <Popover.Arrow />
      <Popover.CloseButton />
      {title && <Popover.Header>{title}</Popover.Header>}
      {body && <Popover.Body>{body}</Popover.Body>}
      {bodyAux && <Popover.Body>{bodyAux}</Popover.Body>}
    </Popover.Content>
  );
}
export function PopoverHeader({ titleClick, children }: PopoverHeaderProps) {
  return (
    <Popover
      trigger={(triggerProps) => {
        return (
          <HStack>
            <Text
              fontSize="md"
              {...triggerProps}
              textDecorationLine="underline"
            >
              {titleClick}
            </Text>
            <Icon
              as={Ionicons}
              name="information-circle-outline"
              size="20px"
              marginLeft="2px"
              color="blue.300"
            />
          </HStack>
        );
      }}
    >
      {children}
    </Popover>
  );
}
