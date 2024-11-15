import { Box, Button, ScrollView, TextArea } from "native-base";
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { KeyboardAvoidingView } from 'react-native';
import * as amplitude from "@amplitude/analytics-react-native";
import { useFocusEffect } from "@react-navigation/native";
import {  KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';

import { updateMessage } from "../../redux/actions/message";
import { postServices } from "../../utils/hooks/services";

function Suggestions({ route, navigation }) {
  const [text, useText] = useState("");
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      amplitude.logEvent("Pantalla visitada", {
        screen: "Escribinos tu sugerencia",
      });
    }, [])
  );

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
    <KeyboardAvoidingView>
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <Box mt={3} mb={20}>
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
              w={'90%'}
              isDisabled={!text}
              mb={10}
              onPress={() => sendEmail()}
              _pressed={{ bgColor: 'rgba(218, 103, 58, .5)' }}
              _text={{ fontSize: 14, fontWeight: '600', textAlign: 'center' }}
              bg={"#DA673A"}
              py={5}
              color={'white'}
              rounded={8}
            >
              Enviar
            </Button>

          </Box>
        </Box>

      </ScrollView>
      <KeyboardAccessoryNavigation
        nextHidden
        previousHidden
        doneButtonStyle={{ marginBottom: 5 }}
      />
    </KeyboardAvoidingView>
  );
}

export default Suggestions;
