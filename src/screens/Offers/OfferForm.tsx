import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  ScrollView,
  Text,
  TextArea,
  Image,
  Select,
  CheckIcon,
} from "native-base";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import {
  getCategories,
  getServices,
  publishOffer,
} from "../../utils/hooks/services";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import * as ImagePicker from "expo-image-picker";
import { ErrorModal, SuccessModal } from "../AboutSubject/Modals";

function OfferForm({ route, navigation }) {
  const [allTags, setAllTags] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [previewImage, setPreviewImage] = useState(null);

  const [imagen, setImagen] = useState(null);
  const [asunto, setAsunto] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useState();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const selectImage = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync();
      console.log("image <>", image);
      if (!image.canceled && image.assets.length > 0) {
        setImagen(image.assets[0]);
        setPreviewImage(image.assets[0].uri); // Guarda la URI de la imagen seleccionada para mostrarla en la vista previa
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getServices("tag/all")
      .then(({ data }: any) => {
        setAllTags(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getCategories()
      .then(({ data }: any) => {
        setCategories(data);
      })
      .catch(() => {});
  }, []);

  let FilterTags = () =>
    allTags.length > 0
      ? allTags.filter((it: any) =>
          it.name
            .toLowerCase()
            .includes(searchText.toLowerCase().replace("#", ""))
        )
      : [];

  const cleanModals = () => {
    setTimeout(() => {
      setSuccessModalOpen(false);
      setErrorModalOpen(false);
    }, 30000);
  };

  const uploadImage = async () => {
    try {
      setLoading(true);
      const response = await publishOffer({
        title: asunto,
        description: mensaje,
        offer_category_id: categoryId,
        url: url,
        email: email,
        image: imagen,
      });

      if (response.status != 201) {
        throw new Error(JSON.stringify(response), {
          cause: "no se obtuvo el status 201",
        });
      }
      console.log("RESPONSE", response.body);

      setLoading(false);
      setSuccessModalOpen(true);

      cleanModals();
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error al enviar la imagen al backend:", error);
      setErrorModalOpen(true);
      setLoading(false);

      cleanModals();
    }
  };

  const selectCategory = (item) => {
    setCategoryId(item.id);
  };

  return (
    <Container>
      <Layout
        route={route}
        navigation={navigation}
        title={`Publicá en el Mercado de Fadu`}
      >
        <ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps={"handled"}
        >
          <Box
            mx={5}
            mb={5}
            borderTopWidth={1}
            borderTopColor={"#EBEEF2"}
            pt={0}
          >
            <Text fontSize={15}>
              Describí de la forma más detallada posible lo que vas a publicar,
              así queda claro!
            </Text>
          </Box>

          <Box>
            <Box
              mx="5"
              borderBottomWidth={2}
              borderBottomColor={"#EBEEF2"}
              pb={"24"}
            >
              {allTags.length > 0 && (
                <>
                  <Box
                    mb={5}
                    alignItems={"center"}
                    justifyContent="center"
                    flexDir={"row"}
                  >
                    <Input
                      onChangeText={(text) => setAsunto(text)}
                      type={"text"}
                      px={3.5}
                      borderColor={"transparent"}
                      borderRadius={8}
                      placeholder={"Título"}
                      placeholderTextColor={"#797979"}
                      backgroundColor={"#F7FAFC"}
                    />
                  </Box>
                </>
              )}

              <Box
                mb={5}
                alignItems={"center"}
                justifyContent="center"
                flexDir={"row"}
              >
                <Input
                  onChangeText={(text) => setEmail(text)}
                  type={"text"}
                  px={3.5}
                  borderColor={"transparent"}
                  borderRadius={8}
                  placeholder={"Email"}
                  placeholderTextColor={"#797979"}
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
                  onChangeText={(text) => setUrl(text)}
                  type={"text"}
                  px={3.5}
                  borderColor={"transparent"}
                  borderRadius={8}
                  placeholder={"Enlace"}
                  placeholderTextColor={"#797979"}
                  backgroundColor={"#F7FAFC"}
                />
              </Box>

              <TextArea
                onChangeText={(text) => setMensaje(text)}
                placeholder="Descripción"
                autoCompleteType={"off"}
                fontSize={15}
                h={100}
                borderColor={"transparent"}
                borderRadius={8}
                backgroundColor={"#F7FAFC"}
                borderWidth={0}
                placeholderTextColor="#797979"
                mb={5}
              />

              <Box borderBottomWidth={1} borderBottomColor={"#EBEEF2"} mb={5}>
                <Select
                  backgroundColor={"#F7FAFC"}
                  placeholderTextColor={"#C4C4C4"}
                  selectedValue={categoryId}
                  minWidth="335"
                  accessibilityLabel="Elegir categoria"
                  placeholder="Elegir categoria"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  onValueChange={(itemId) => {
                    const selectedItem = categories.find(
                      (item) => item.id === itemId
                    );
                    if (selectedItem) {
                      selectCategory(selectedItem);
                    }
                  }}
                  textAlign={"left"}
                >
                  {categories &&
                    categories.map((item) => (
                      <Select.Item
                        label={item.name}
                        value={item.id}
                        key={item.id}
                      />
                    ))}
                </Select>
              </Box>
              <Box
                mt={1}
                mb={2}
                style={{ backgroundColor: "#F7FAFC", height: 150 }}
              >
                {previewImage && (
                  <Image
                    alt="imagen"
                    source={{ uri: previewImage }}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
                <Button
                  fontSize={1}
                  zIndex={99}
                  style={{
                    backgroundColor: "#d3d3d3",
                    width: "30%",
                    borderRadius: 50,
                    marginLeft: "30%",
                    marginTop: "13%",
                    position: "absolute",
                    height: "20%",
                  }}
                  onPress={selectImage}
                >
                  Agregar Imagen
                </Button>
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
                rounded={8}
              >
                Enviar
              </Button>
            </Box>
          </Box>
        </ScrollView>
        <ErrorModal
          message={"Error al publicar"}
          isOpen={errorModalOpen}
          setOpen={setErrorModalOpen}
        />
        <SuccessModal
          message={
            "Gracias! Vamos a subir tu publicación una vez que la hayamos revisado. No nos va a llevar mucho tiempo.😃"
          }
          isOpen={successModalOpen}
          setOpen={setSuccessModalOpen}
        />
      </Layout>
    </Container>
  );
}

export default OfferForm;
