import React, { useCallback } from "react";
import { Box } from "native-base";
import { WebView } from "react-native-webview";
import * as amplitude from "@amplitude/analytics-react-native";
import { useFocusEffect } from "@react-navigation/native";

export const PolicyPrivacity = () => {
  useFocusEffect(
    useCallback(() => {
      amplitude.logEvent("Pantalla visitada", {
        screen: "Politica de privacidad",
      });
    }, [])
  );

  return (
    <Box flex={1} pb={100}>
      <WebView
        source={{ uri: "https://fadu-1c40d.web.app/politica-de-privacidad" }}
      />
    </Box>
  );
};
