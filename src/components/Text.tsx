import { Text as TextNB, ITextProps } from "native-base";

interface TextProps extends ITextProps {
  type?: "text" | "title";
}

export default function Text({ type = "text", ...props }: TextProps) {
  if (type === "title") {
    return <TextNB fontSize="2xl" mb="2" fontWeight="medium" {...props} />;
  }

  return <TextNB fontSize="md" mb="2" {...props} />;
}
