import { useScheduled } from "@/hooks/scheduled";
import { useUpdateRegister } from "@/hooks/updateRegister";
import { VStack, Button } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { UpdateRegisterSchemaProps } from "@/hooks/updateRegister/types";
import axios from "axios";

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] =
    useState<DocumentPicker.DocumentPickerAsset>({});
  const [loading, setLoading] = useState(false);

  const handleDocumentSelection = useCallback(async () => {
    try {
      setLoading(true);
      const result = await DocumentPicker.getDocumentAsync({});

      if (result.assets !== null) {
        setSelectedFile(result?.assets?.[0]);
        console.log("result?.assets?.[0]", result?.assets?.[0]);
        setLoading(false);
      }
    } catch (err) {
      console.warn(err);
    }
  }, [selectedFile]);

  const handleSave = useCallback(async () => {
    const formData = new FormData();
    console.log("selectedFile", selectedFile);
    formData.append("fileK", {
      uri: selectedFile.uri,
      name: selectedFile.name,
      type: selectedFile.mimeType || "",
    });
    formData.append("codLoja", "3344");

    try {
      const response = await fetch(
        "http://taisyuri.pythonanywhere.com/upload/",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const responseData = await response.json();
      console.log("Response from server:", responseData);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }, []);
  return (
    <VStack flex={1} justifyContent={"center"}>
      {/* {fileResponse?.map((item) => {
        return (
          <VStack bgColor={"amber.300"}>
            <Text numberOfLines={1} ellipsizeMode={"middle"}>
              mimeTyp e - {item.mimeType}
            </Text>
            <Text numberOfLines={1} ellipsizeMode={"middle"}>
              file - {item.file?.name}
            </Text>
            <Text numberOfLines={1} ellipsizeMode={"middle"}>
              lastModified - {item.lastModified}
            </Text>
            <Text numberOfLines={1} ellipsizeMode={"middle"}>
              name - {item.name}
            </Text>
            <Text numberOfLines={1} ellipsizeMode={"middle"}>
              size - {item.size}
            </Text>
            <Text numberOfLines={1} ellipsizeMode={"middle"}>
              uri - {item.uri}
            </Text>
          </VStack>
        );
      })} */}

      <Button onPress={handleDocumentSelection}>Select 📑</Button>
      <Button onPress={handleSave} isLoading={loading}>
        Save
      </Button>
    </VStack>
  );
}
