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
        <Text fontSize={13} textAlign="center">
          Ingresá el código enviado a <Text fontWeight={"bold"}>{email}</Text>
        </Text>

        <Text fontSize={13} mb={3} textAlign="center">
          para recuperar la contraseña de tu cuenta en Muyfadu
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

      <Box flex={1} justifyContent="flex-end" mx={4} mb={10}>
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
