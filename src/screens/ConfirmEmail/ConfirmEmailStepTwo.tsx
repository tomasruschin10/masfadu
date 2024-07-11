import { Box, Button, Input, Text } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import Container from "../../components/Container";
import { useSelector } from "react-redux";
import { updatetoken } from "../../redux/actions/token";
import { getUserDataWithToken } from "../../utils/storage";

import { postServices } from "../../utils/hooks/services";
import { useDispatch } from "react-redux";
import { updateMessage } from "../../redux/actions/message";

function ConfirmEmailStepTwo({ navigation }) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.user.userdata);
  const dispatch = useDispatch();

  const sendCode = () => {
    setLoading(true);
    postServices(`auth/confirm-email/${user.id}`, {
      code: token,
    })
      .then(({ status, data }: any) => {
        if (status === 200) {
          dispatch(
            updateMessage({
              body: "Email confirmado con éxito",
              open: true,
              type: "success",
            })
          );
          dispatch(updatetoken(data.token));
          getUserDataWithToken(data.token);
          navigation.navigate("Home");
        }
      })
      .catch((err) => {
        dispatch(
          updateMessage({
            body: "Asegurate de haber escrito correctamente el código!",
            open: true,
            type: "danger",
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <Box flex={1} justifyContent="center" alignItems="center" mx={5}>
        <Text fontSize={22.78} mb={5} fontWeight={"600"} textAlign="center">
          Confirmá tu email
        </Text>
        <Text fontSize={13} textAlign="center">
          Ingresá el código enviado a{" "}
          <Text fontWeight={"bold"}>{user.email}</Text>
        </Text>

        <Text fontSize={13} mb={3} textAlign="center">
          para confirmar el mail de tu cuenta en Muyfadu
        </Text>
        <Text mb={20} textAlign="center">
          PD: No te olvides de revisar la carpeta se spam!
        </Text>

        <Input
          placeholder="EXUIA"
          autoCapitalize="characters"
          value={token}
          onChangeText={(text) => setToken(text)}
          maxLength={6}
          textAlign="center"
        />
      </Box>

      <Box justifyContent="center" alignItems="center" mx={4}>
        <Button
          backgroundColor="#DA673A"
          isLoading={loading}
          py={4}
          mb={5}
          onPress={() => sendCode()}
          w="100%"
        >
          Confirmar
        </Button>
        <TouchableOpacity
          style={{ marginBottom: 40 }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{ fontSize: 14, color: "black" }}>Omitir</Text>
        </TouchableOpacity>
      </Box>
    </Container>
  );
}

export default ConfirmEmailStepTwo;
