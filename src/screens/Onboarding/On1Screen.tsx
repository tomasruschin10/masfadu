import { Box, Button, Image, Text } from "native-base";
import * as React from "react";
import Container from "../../components/Container";
import { NoHeader } from "../../components/Header";

function On1Screen({ route, navigation }) {
  return (
    <Container>
      <NoHeader />
      <Box flex={1} mt={-5} justifyContent={"center"} alignItems="center">
        <Image
          w={150}
          mb={7}
          h={150}
          alt="Logo de Fadu"
          source={require("../../../assets/logo.png")}
        />
        <Text fontSize={"4xl"} fontWeight={500} mb={7}>
          ¡Qué lindo verte!
        </Text>
        <Button
          _pressed={{ bgColor: "rgba(218, 103, 58, .5)" }}
          _text={{ fontSize: 14, fontWeight: "600" }}
          bg="brand.primary"
          onPress={() => navigation.navigate("Onboarding2")}
          mb={3}
          w="90%"
          py={5}
          rounded={8}
        >
          Elegí tu carrera
        </Button>
      </Box>
    </Container>
  );
}

export default On1Screen;
