import { useScheduled } from "@/hooks/scheduled";
import { useUpdateRegister } from "@/hooks/updateRegister";
import { VStack } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { UpdateRegisterSchemaProps } from "@/hooks/updateRegister/types";
import axios from "axios";

export default function Profile() {
  const { getUpdateRegister, sendFavorite, loading, dataUpdateRegister } =
    useUpdateRegister();

  // console.log("data register", dataUpdateRegister);

  // useEffect(() => {
  //   getUpdateRegister();
  // }, []);

  // return (
  //   <View>
  //     <Text>Profile</Text>
  //     <Button title="mandar" />
  //   </View>
  // );
  const [fileResponse, setFileResponse] = useState<
    DocumentPicker.DocumentPickerAsset[]
  >([]);

  const data = {
    codLoja: "3344",
    platFiscal: "NFCe",
    csc_acSat: "26763832",
    certDigital_atvSat: "984327-3873",
    impostos: false,
    check_status: false,
    steps: {
      platFiscal: true,
      cadBanco: true,
      cadRF: false,
      csc_acSat: false,
      certDigital_atvSat: false,
      impostos: false,
      check_status: false,
    },
    // fileCsc_acSat: fileResponse?.[0].uri,
    fileNameCsc_acSat: "teste",
  };
  // console.log("fileResponse?.[0].uri", fileResponse?.[0].uri);
  // console.log("fileResponse?.name", fileResponse?.[0].name);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.assets !== null) {
        const selectedAsset = result.assets[0];

        const formData = new FormData();
        formData.append("fileCsc_acSat", selectedAsset.uri);
        console.log("formData", formData);
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleSave = useCallback(async () => {
    try {
      axios
        .post("http://taisyuri.pythonanywhere.com/updateregister/", {
          ...data,
        })
        .then((response) => {
          console.log(response);
        });
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <VStack flex={1} justifyContent={"center"}>
      {fileResponse?.map((item) => {
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
      })}

      <Button title="Select 📑" onPress={handleDocumentSelection} />
      <Button title="Save" onPress={handleSave} />
    </VStack>
  );
}
