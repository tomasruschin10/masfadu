import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Button, Input, Text } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { Fontisto } from "@expo/vector-icons";

import Container from "../../components/Container";
import { putServices } from "../../utils/hooks/services";
import { updateMessage } from "../../redux/actions/message";

function ConfirmEmailStepOne({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.user.userdata);
  const dispatch = useDispatch();

  const sendRecoveryPassword = () => {
    setLoading(true);
    putServices(`auth/generate-email-confirmation-code/${user.id}`)
      .then(({ status }: any) => {
        status === 200 && navigation.navigate("ConfirmEmailStepTwo");
      })
      .catch((err) => {
        dispatch(
          updateMessage({
            body: "Revisá que el mail esté correctamente escrito",
            open: true,
            type: "danger",
          })
        );
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
      <Box flex={1} justifyContent="center" alignItems="center" mx={5}>
        <Fontisto name="locked" size={30} color="#3A71E1" />
        <Text
          fontSize={22.78}
          fontWeight={700}
          w="50%"
          textAlign="center"
          my={5}
        >
          Confirmá tu email
        </Text>
        <Input mb={4} value={user?.email} isDisabled placeholder="Email" />
      </Box>
      <Box justifyContent="center" alignItems="center" mx={4}>
        <Button
          backgroundColor="#DA673A"
          isLoading={loading}
          py={4}
          onPress={() => sendRecoveryPassword()}
          mb={5}
          w="100%"
          alignSelf="flex-end"
        >
          Enviar
        </Button>
        <TouchableOpacity
          style={{ marginBottom: 50 }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{ fontSize: 14, color: "black" }}>Omitir</Text>
        </TouchableOpacity>
      </Box>
    </Container>
  );
}

export default ConfirmEmailStepOne;
