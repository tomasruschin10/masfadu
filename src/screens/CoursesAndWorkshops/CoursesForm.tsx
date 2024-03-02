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
import { TouchableOpacity } from "react-native";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { publishOffer } from "../../utils/hooks/services";

import * as ImagePicker from "expo-image-picker";
import { ErrorModal, SuccessModal } from "../AboutSubject/Modals";

function OfferForm({ route, navigation }) {
  const [loading, setLoading] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);

  const [imagen, setImagen] = useState(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const [nombreApellido, setNombreApellido] = useState("");
  const [url, setUrlEmpleo] = useState("");
  const [tituloEmpleo, setTituloEmpleo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectImage = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync();
      console.log("image <>", image);
      if (!image.canceled && image.assets.length > 0) {
        const imageUri = image.assets[0].uri;
        const compressedImage = await compressImage(imageUri);

        setImagen(compressedImage);

        setPreviewImage(image.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const compressImage = async (imageUri: any) => {
    try {
      const compressedImage = await manipulateAsync(
        imagen.uri,
        [{ resize: { width: 800 } }],
        { format: SaveFormat.JPEG, compress: 0.7 }
      );

      return compressedImage;
    } catch (error) {
      console.log("Error al comprimir la imagen:", error);
      return { uri: imageUri };
    }
  };

  const cleanModals = () => {
    setTimeout(() => {
      setSuccessModalOpen(false);
      setErrorModalOpen(false);
    }, 30000);
  };

  const cleanSuccessModal = () => {
    setSuccessModalOpen(false);
    navigation.navigate("Home");
  };

  const uploadImage = async () => {
    try {
      setLoading(true);

      const response = await publishOffer({
        offer_category_id: "2",
        name: nombreApellido,
        title: tituloEmpleo,
        description: descripcion,
        url: url,
        image: imagen,
      });

      if (response.status != 201) {
        console.log(response);
        throw new Error(JSON.stringify(response), {
          cause: "no se obtuvo el status 201",
        });
      }

      setLoading(false);
      setSuccessModalOpen(true);
      setTimeout(() => {
        cleanSuccessModal();
      }, 30000);
    } catch (error) {
      setErrorMessage("Error al publicar");
      console.log("Error al enviar la imagen al backend:", error.message);
      setErrorModalOpen(true);
      setLoading(false);

      cleanModals();
    }
  };

  return (
    <Container>
      <Layout
        route={route}
        navigation={navigation}
        title={`Publicá en Cursos & Workshops`}
      >
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110 }}
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
              Describí de la forma más detallada que puedas, así se entiende
              claro que estás publicando! Gracias :)
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
                  mb={5}
                  placeholder={"Quién lo dicta?"}
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
                  onChangeText={(text) => setUrlEmpleo(text)}
                  type={"text"}
                  p={3.5}
                  mb={5}
                  placeholder={"Url"}
                  placeholderTextColor={"#d3d3d3"}
                  backgroundColor={"#F7FAFC"}
                />
              </Box>
              <Box
                mb={5}
                alignItems={"center"}
                justifyContent="center"
                flexDir={"row"}
              >
                <Input
                  onChangeText={(text) => setTituloEmpleo(text)}
                  type={"text"}
                  px={3.5}
                  placeholder={"Título"}
                  placeholderTextColor={"#d3d3d3"}
                  backgroundColor={"#F7FAFC"}
                />
              </Box>

              <TextArea
                onChangeText={(text) => setDescripcion(text)}
                placeholder="Descripción"
                autoCompleteType={"off"}
                fontSize={15}
                h={100}
                backgroundColor={"#F7FAFC"}
                borderWidth={0}
                placeholderTextColor={"#d3d3d3"}
                mb={5}
              />

              <Box
                mt={1}
                mb={5}
                style={{ backgroundColor: "#F7FAFC", height: 150 }}
              >
                {previewImage && (
                  <Image
                    source={{ uri: previewImage }}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
                <TouchableOpacity
                  style={{
                    backgroundColor: "#d3d3d3",
                    width: "40%",
                    borderRadius: 50,
                    marginLeft: "25%",
                    marginTop: "13%",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    height: "20%",
                    zIndex: 99,
                  }}
                  onPress={selectImage}
                >
                  <Text style={{ fontSize: 14, color: "white", textAlign: 'center', }}>
                    Agregar logo o imagen
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>

            <Box mt={-20} alignItems="center">
              <Button
                style={{ backgroundColor: "#EB5E29" }}
                isLoading={loading}
                onPress={() => uploadImage()}
                w="90%"
                py={5}
                rounded={"2xl"}
              >
                Enviar
              </Button>
            </Box>
          </Box>
        </ScrollView>
        <ErrorModal
          message={errorMessage}
          isOpen={errorModalOpen}
          setOpen={setErrorModalOpen}
        />
        <SuccessModal
          message={
            "Gracias! Vamos a subir tu publicación una vez que la hayamos revisado. No nos va a llevar mucho tiempo.😃"
          }
          isOpen={successModalOpen}
          setOpen={cleanSuccessModal}
        />
      </Layout>
    </Container>
  );
}

export default OfferForm;
