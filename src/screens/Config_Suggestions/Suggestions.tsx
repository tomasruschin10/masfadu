import { Box, Button, ScrollView, TextArea } from "native-base";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { updateMessage } from "../../redux/actions/message";
import { postServices } from "../../utils/hooks/services";

function Suggestions({ route, navigation }) {
  const [text, useText] = useState("");
  const dispatch = useDispatch();

  const submitSuggestion = () => {
    const url = "suggestion/submit";
    const body = { suggestion: text };

    return postServices(url, body);
  };

  const sendEmail = async () => {
    try {
      const { status } = await submitSuggestion();
      if (status === 201) {
        dispatch(
          updateMessage({
            body: "Sugerencia enviada exitosamente",
            open: true,
            type: "success",
          })
        );
        navigation.goBack();
      }
    } catch (err) {
      console.error("Error al enviar la sugerencia:", err);
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
