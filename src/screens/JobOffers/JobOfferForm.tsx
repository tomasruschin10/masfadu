import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  ScrollView,
  Text,
  TextArea,
} from "native-base";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { ErrorModal, SuccessModal } from "../AboutSubject/Modals";


function OfferForm({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [tituloEmpleo, setTituloEmpleo] = useState("");
  const [url, setUrlEmpleo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  return (
    <Container>
      <Layout
        route={route}
        navigation={navigation}
        title={`Publicá una oferta laboral`}
      >
        <ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps={"handled"}
        >
          <Box
            mx={5}
            mb={8}
            borderTopWidth={1}
            borderTopColor={"#EBEEF2"}
            pt={6}
          >
            <Text fontSize={15}>
              Describí de la forma más detallada que puedas la oferta laboral, así se entiende claro que estás buscando! :)
            </Text>
          </Box>
          <Box>
            <Box
              mx="5"
              alignItems={"center"}
              justifyContent="center"
              flexDir={"row"}
            >
              <Input
                onChangeText={(text) => setTituloEmpleo(text)}
                type={"text"}
                px={3.5}
                mb={5}
                placeholder={"Título del empleo"}
                placeholderTextColor={"#d3d3d3"}
                backgroundColor={"#F7FAFC"}
              />
            </Box>
            <Box
              alignItems={"center"}
              justifyContent="center"
              flexDir={"row"}
              mx="5"
            >
              <Input
                onChangeText={(text) => setUrlEmpleo(text)}
                type={"text"}
                p={3.5}
                mb={5}
                placeholder={"Enlace del empleo"}
                placeholderTextColor={"#d3d3d3"}
                backgroundColor={"#F7FAFC"}
              />
            </Box>
            <Box
              mx="5"
              borderBottomWidth={1}
              borderBottomColor={"#EBEEF2"}
            >
              <Box
                alignItems={"center"}
                justifyContent="center"
                flexDir={"row"}
                mb={6}
              >
                <TextArea
                  onChangeText={(text) => setDescripcion(text)}
                  placeholder="Sobre el puesto"
                  autoCompleteType={"off"}
                  fontSize={15}
                  h={100}
                  width={"100%"}
                  backgroundColor={"#F7FAFC"}
                  borderWidth={0}
                  placeholderTextColor={"#d3d3d3"}
                />
              </Box>
            </Box>

            <Box alignItems="center">
              <Button
                style={{ backgroundColor: "#EB5E29" }}
                isLoading={loading}
                onPress={() => {
                  if (tituloEmpleo && url && descripcion) {
                    return navigation.navigate("JobOfferFormMedia", {
                      tituloEmpleo, url, descripcion
                    })
                  }

                  setErrorModalOpen(true)
                }}
                w="90%"
                py={5}
                backgroundColor="blue.500"
                rounded={"2xl"}
              >
                siguiente
              </Button>
            </Box>
          </Box>
        </ScrollView>
        <ErrorModal message={"Rellena todos los campos"} isOpen={errorModalOpen} setOpen={setErrorModalOpen} />
        <SuccessModal message={"Gracias! Vamos a subir tu publicación una vez que la hayamos revisado. No nos va a llevar mucho tiempo.😃"} isOpen={successModalOpen} setOpen={setSuccessModalOpen} />
      </Layout>
    </Container>
  );
}

export default OfferForm;
