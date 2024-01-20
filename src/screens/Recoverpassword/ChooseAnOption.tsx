import { Box, Button, Input, Text } from "native-base";
import React, { useState } from "react";
import Container from "../../components/Container";
import { HeaderBack } from "../../components/Header";
import { getServices } from "../../utils/hooks/services";
import { useDispatch } from "react-redux";
import { updateMessage } from "../../redux/actions/message";
import Alert from "../../components/alert/Alert";

function ChooseAnOption({ route, navigation }) {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { email } = route.params;
  const dispatch = useDispatch();

  const [alert, setAlert] = React.useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const sendCode = () => {
    setLoading(true);
    getServices(`auth/validate-recovery-token?token=${token}`)
      .then(({ data }: any) => {
        navigation.navigate("NewPassword", { id: data.id });
      })
      .catch((err) => {
        dispatch(
          updateMessage({
            body: "Asegurate de haber escrito correctamente el código!",
            open: true,
            type: "danger",
          })
        );
        /* showAlert('error', 'Asegurate de haber escrito correctamente el código!') */
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          closeAlert={closeAlert}
        />
      )}
      <HeaderBack />

      <Box mx={5} mt={5} textAlign="center">
        <Text fontSize={22.78} mb={5} fontWeight={"600"} textAlign="center">
          Recupera tu contraseña
        </Text>
        <Text mb={5} fontSize={13} textAlign="center">
          Ingresa el código de verificación que enviamos a tu correo electrónico
        </Text>

        <Text fontSize={13} textAlign="center">
          Introduce el código enviado a <Text fontWeight={"bold"}>{email}</Text>
        </Text>

        <Text fontSize={13} mb={3} textAlign="center">
          para completar el proceso de recuperación de contraseña de tu cuenta
          en muyfadu!
        </Text>
        <Text mb={20} textAlign="center">
          PD: ¡No olvides revisar la carpeta de spam!
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

      <Box flex={1} justifyContent="flex-end" mx={4} mb={3}>
        <Button
          backgroundColor="#DA673A"
          isLoading={loading}
          py={4}
          onPress={() => sendCode()}
          w="100%"
        >
          Enviar
        </Button>
      </Box>
    </Container>
  );
}

export default ChooseAnOption;
