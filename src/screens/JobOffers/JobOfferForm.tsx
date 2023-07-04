import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  ScrollView,
  Text,
  TextArea,
  Image,
} from "native-base";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import {
  publishOffer,
} from "../../utils/hooks/services";

import * as ImagePicker from 'expo-image-picker';
import { ErrorModal, SuccessModal } from "../AboutSubject/Modals";


function OfferForm({ route, navigation }) {
  const [loading, setLoading] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);

  const [imagen, setImagen] = useState(null)
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const [nombreApellido, setNombreApellido] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [tituloEmpleo, setTituloEmpleo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const selectImage = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync();

      if (!image.canceled && image.assets.length > 0) {
        setImagen(image.assets[0])
        setPreviewImage(image.assets[0].uri); // Guarda la URI de la imagen seleccionada para mostrarla en la vista previa
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cleanModals = () => {
    setTimeout(() => {
      setSuccessModalOpen(false);
      setErrorModalOpen(false);
    }, 3000);
  }

  const uploadImage = async () => {
    try {

      const response = await publishOffer({
        offer_category_id: "1",
        name: nombreApellido,
        phone: numeroTelefono,
        company: empresa,
        title: tituloEmpleo,
        description: descripcion,
        image: imagen
      })

      if (response.status != 201) {
        console.log(response)
        throw new Error(JSON.stringify(response), { cause: 'no se obtuvo el status 201' });
      }
      console.log('RESPONSE', response.body);

      setSuccessModalOpen(true);
      cleanModals();
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error al enviar la imagen al backend:', error);
      setErrorModalOpen(true);
      cleanModals();
    }
  };

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
            mb={2}
            mt={-4}
            borderTopWidth={1}
            borderTopColor={"#EBEEF2"}
            pt={6}
          >
            <Text fontSize={15}>
              Describí de la forma más precisa y detallada que puedas
            </Text>
          </Box>

          <Box>
            <Box
              mx="5"
              borderBottomWidth={1}
              borderBottomColor={"#EBEEF2"}
              pt={2}
              pb={"24"}
            >

              <Box
                alignItems={"center"}
                justifyContent="center"
                flexDir={"row"}
              >
                <Input
                  onChangeText={(text) => setNombreApellido(text)}
                  type={"text"}
                  p={3.5}
                  mb={4}
                  placeholder={"Nombre Y Apellido"}
                  placeholderTextColor={"#d3d3d3"}
                  backgroundColor={"#F7FAFC"}
                />
              </Box>

              <Box
                alignItems={"center"}
                justifyContent="center"
                flexDir={"row"}
              >
                <Input
                  onChangeText={(text) => setNumeroTelefono(text)}
                  type={"text"}
                  p={3.5}
                  mb={4}
                  placeholder={"Nro de teléfono"}
                  placeholderTextColor={"#d3d3d3"}
                  backgroundColor={"#F7FAFC"}
                />

              </Box>

              <Box

                alignItems={"center"}
                justifyContent="center"
                flexDir={"row"}
              >
                <Input
                  onChangeText={(text) => setEmpresa(text)}
                  type={"text"}
                  p={3.5}
                  mb={4}
                  placeholder={"Empresa"}
                  placeholderTextColor={"#d3d3d3"}
                  backgroundColor={"#F7FAFC"}
                />

              </Box>

              <Box

                alignItems={"center"}
                justifyContent="center"
                flexDir={"row"}
              >
                <Input
                  onChangeText={(text) => setTituloEmpleo(text)}
                  type={"text"}
                  p={3.5}
                  mb={4}
                  placeholder={"Titulo del empleo"}
                  placeholderTextColor={"#d3d3d3"}
                  backgroundColor={"#F7FAFC"}
                />
              </Box>

              <TextArea
                onChangeText={(text) => setDescripcion(text)}
                placeholder="Sobre el puesto"
                autoCompleteType={"off"}
                fontSize={15}
                h={100}
                backgroundColor={"#F7FAFC"}
                borderWidth={0}
                placeholderTextColor={"#d3d3d3"}
                mb={6}
              />

              <Box mb={5} style={{ backgroundColor: "#F7FAFC", height: 150, }}>
                {previewImage && <Image source={{ uri: previewImage }} style={{ width: "100%", height: "100%" }} />}
                <Button fontSize={1} zIndex={99} style={{ backgroundColor: "#d3d3d3", width: "30%", borderRadius: 50, marginLeft: "30%", marginTop: "13%", position: "absolute", height: "20%" }} onPress={selectImage}>Agregar Imagen</Button>
              </Box>
            </Box>

            <Box mt={-20} alignItems="center">
              <Button
                style={{ backgroundColor: "#EB5E29" }}
                isLoading={loading}
                onPress={() => uploadImage()}
                w="90%"
                py={5}
                backgroundColor="blue.500"
                rounded={"2xl"}
              >
                Enviar
              </Button>
            </Box>
          </Box>
        </ScrollView>
        <ErrorModal message={"Error al publicar"} isOpen={errorModalOpen} setOpen={setErrorModalOpen} />
        <SuccessModal message={"Publicación exitosa"} isOpen={successModalOpen} setOpen={setSuccessModalOpen} />
      </Layout>
    </Container>
  );
}

export default OfferForm;
