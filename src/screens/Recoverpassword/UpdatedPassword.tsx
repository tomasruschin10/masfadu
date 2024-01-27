import { Box, Button, Text } from "native-base";
import React from "react";
import Container from "../../components/Container";
import { NoHeader } from "../../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { store } from "../../redux/store";
import { updateMessage } from "../../redux/actions/message";
import { updatetoken } from "../../redux/actions/token";
import { updateUserdata } from "../../redux/actions/user";
import * as RootNavigation from "../../navigation/RootNavigation";

function UpdatedPassword({ route, navigation }) {
  const logout = () => {
    store.dispatch(
      updateMessage({ body: "Iniciá Sesión", type: "success", open: true })
    );
    store.dispatch(updatetoken(""));
    store.dispatch(updateUserdata({}));
    RootNavigation.reset("SplashScreen");
  };

  return (
    <Container>
      <NoHeader />

      <Box alignItems={"center"} justifyContent={"center"} mx={5} h={"100%"}>
        <Text
          fontSize={22.78}
          fontWeight={700}
          w={"50%"}
          textAlign={"center"}
          my={5}
        >
          Contraseña actualizada
        </Text>
        <Ionicons name="checkmark-circle" size={100} color="#3A71E1" />
        <Text mb={5} mt={3} fontSize={13}>
          Tu contraseña fue actualizada!
        </Text>

        <Button
          py={4}
          backgroundColor="#DA673A"
          onPress={() => logout()}
          mb={3}
          w="100%"
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default UpdatedPassword;
