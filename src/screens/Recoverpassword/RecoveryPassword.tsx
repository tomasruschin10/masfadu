import { Box, Button, Input, Text } from "native-base";
import React, { useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import { HeaderBack } from "../../components/Header";
import Container from "../../components/Container";
import { postServices } from "../../utils/hooks/services";
import { useDispatch } from "react-redux";
import { updateMessage } from "../../redux/actions/message";
import Alert from "../../components/alert/Alert";
function RecoveryPassword({ route, navigation }) {
  const [form, setForm] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [alert, setAlert] = React.useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const sendRecoveryPassword = () => {
    setLoading(true);
    postServices("auth/forgot-password", form)
      .then(({ status }: any) => {
        status === 201 &&
          navigation.navigate("ChooseAnOption", { email: form.email });
      })
      .catch((err) => {
        dispatch(
          updateMessage({
            body: "Revisá que el mail esté correctamente escrito",
            open: true,
            type: "danger",
          })
        );
        /* showAlert('warning', 'Revisá que el mail esté correctamente escrito ') */
        if (__DEV__) {
          console.log(err);
        }
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

      <Box flex={1} justifyContent="center" alignItems="center" mx={5}>
        <Fontisto name="locked" size={30} color="#3A71E1" />
        <Text
          fontSize={22.78}
          fontWeight={700}
          w="50%"
          textAlign="center"
          my={5}
        >
          Recuperá tu contraseña
        </Text>
        <Input
          mb={4}
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          placeholder="Email"
        />
      </Box>
      <Box justifyContent="center" alignItems="center" mx={4}>
        <Button
          backgroundColor="#DA673A"
          isLoading={loading}
          py={4}
          onPress={() => sendRecoveryPassword()}
          mb={10}
          w="100%"
          isDisabled={form.email.length > 0 ? false : true}
          alignSelf="flex-end"
        >
          Enviar
        </Button>
      </Box>
    </Container>
  );
}

export default RecoveryPassword;
