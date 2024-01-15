import { Box, Button, ScrollView, TextArea } from "native-base";
import React, { useState } from "react";
import { Linking } from "react-native";

function Suggestions({ route, navigation }) {
  const [text, useText] = useState("");

  const sendEmail = async () => {
    try {
      await Linking.openURL(
        encodeURI(`mailto:muyfadu@gmail.com?subject=Sugerencia&body=${text}`)
      );
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps={"handled"}>
      <Box mt={5} mb={20}>
        <Box mx="5">
          <TextArea
            placeholder="Dejanos cualquier tipo de sugerencia/idea para ayudarnos a seguir mejorando la app."
            autoCompleteType={"off"}
            h={290}
            fontSize={15}
            backgroundColor={"#F7FAFC"}
            borderWidth={0}
            placeholderTextColor={"#C4C4C4"}
            onChangeText={(text) => useText(text)}
          />
        </Box>

        <Box my={8} alignItems="center">
          <Button
            w="90%"
            isDisabled={text ? false : true}
            py={5}
            backgroundColor="blue.500"
            onPress={() => sendEmail()}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </ScrollView>
  );
}

export default Suggestions;
