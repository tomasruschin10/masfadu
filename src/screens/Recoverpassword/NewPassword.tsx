import { Box, Button, Icon, Input, Text } from "native-base";
import React, { useState } from "react";
import Container from "../../components/Container";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { HeaderBack } from "../../components/Header";
import { putServices } from "../../utils/hooks/services";
import { updateMessage } from "../../redux/actions/message";
import { useDispatch } from "react-redux";
import Alert from "../../components/alert/Alert";

function NewPassword({ route, navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setform] = useState({ password: "", repeat_password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = route.params;

  const [alert, setAlert] = React.useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const updatePassword = () => {
    if (form.password === form.repeat_password) {
      setLoading(true);
      putServices(`auth/update-password/${id}`, form, "application/json")
        .then(({ status }: any) => {
          status === 200 && navigation.navigate("UpdatedPassword");
        })
        .catch((err) => {
          dispatch(
            updateMessage({
              body: "Hubo un error al cambiar la contraseña, inténtalo nuevamente",
              open: true,
              type: "danger",
            })
          );
          /* showAlert('error', 'Hubo un error al cambiar la contraseña, inténtalo nuevamente') */
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      dispatch(
        updateMessage({
          body: "Asegurate que las contraseñas coincidan",
          open: true,
          type: "danger",
        })
      );
      /*  showAlert('warning', 'Asegurate que las contraseñas coincidan') */
    }
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

      <Box
        flex={1}
        alignItems="center"
        justifyContent="space-between"
        mx={5}
        my={5}
      >
        <Box alignItems="center">
          <Fontisto name="locked" size={30} color="#3A71E1" />
          <Text
            fontSize={22.78}
            fontWeight={700}
            w="50%"
            textAlign="center"
            my={5}
            mb={20}
          >
            Nueva contraseña
          </Text>

          <Input
            fontSize={16}
            placeholder="Nueva contraseña"
            value={form.password}
            onChangeText={(text) => setform({ ...form, password: text })}
            mb={4}
            type={showPassword ? "text" : "password"}
            InputRightElement={
              <Icon
                as={
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          <Input
            fontSize={16}
            placeholder="Repetir contraseña"
            value={form.repeat_password}
            onChangeText={(text) => setform({ ...form, repeat_password: text })}
            mb={4}
            type={showPassword ? "text" : "password"}
            InputRightElement={
              <Icon
                as={
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
        </Box>
        <Button
          backgroundColor="#DA673A"
          isLoading={loading}
          py={4}
          onPress={() => updatePassword()}
          mb={10}
          w="100%"
        >
          Actualizar
        </Button>
      </Box>
    </Container>
  );
}

export default NewPassword;
