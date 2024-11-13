import React, { useCallback } from "react";
import { WebView } from "react-native-webview";
import Container from "../../components/Container";
import * as amplitude from "@amplitude/analytics-react-native";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderBack } from "../../components/Header";

export const SearchCourse = ({ route, navigation }) => {
  useFocusEffect(
    useCallback(() => {
      amplitude.logEvent("Pantalla visitada", {
        screen: "Buscar curso",
      });
    }, [])
  );

  return (
    <Container>
      <HeaderBack title={route.params.title} />
      <WebView source={{ uri: route.params.url }} />
    </Container>
  );
};
