import { Button, IButtonProps, Text } from "native-base";
import { Link, LinkProps } from "expo-router";
import { List } from "react-native-paper";
import { theme } from "@/theme";

interface itemAccordion {
  titleAccordion?: string;
  titleItem?: string;
  descriptionItem?: string;
}

interface AccordionProps {
  section: {
    titleAccordion?: string;
    items: itemAccordion[];
  }[];
}

export default function Accordion({ section }: AccordionProps) {
  return (
    <List.Section style={{ gap: 1 }}>
      {section.map((sectionItem) => (
        <List.Accordion
          key={sectionItem.titleAccordion}
          title={sectionItem.titleAccordion}
          titleStyle={{
            marginLeft: -10,
            fontSize: theme.fontSizes.md,
          }}
          style={{ height: 55, backgroundColor: '#f9f9f9' }}
          rippleColor="transparent"
          left={(props) => (
            <List.Icon
              {...props}
              icon="information-outline"
              color={theme.colors.blues[400]}
              style={{ marginLeft: 0 }}
            />
          )}
        >
          {sectionItem.items.map((item) => (
            <List.Item
              key={item.titleItem}
              title={item.titleItem}
              description={item.descriptionItem}
              descriptionNumberOfLines={6}
              descriptionStyle={{ marginLeft: -30 }}
              titleStyle={{ marginLeft: -30, marginTop: -10 }}
            />
          ))}
        </List.Accordion>
      ))}
    </List.Section>
  );
}
