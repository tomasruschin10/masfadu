import React, { useState, useEffect } from "react";
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
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";

import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import {
  getCategories,
  getServices,
  updateOffer,
} from "../../utils/hooks/services";
import { ErrorModal, SuccessModal } from "../AboutSubject/Modals";

function OfferEditForm({ route, navigation }) {
  const [allTags, setAllTags] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [previewImage, setPreviewImage] = useState(
    route.params.data?.image.url
  );

  const [imagen, setImagen] = useState(route.params.data?.image);
  const [asunto, setAsunto] = useState(route.params.data?.title);
  const [email, setEmail] = useState(route.params.data?.email);
  const [url, setUrl] = useState(route.params.data?.url);
  const [mensaje, setMensaje] = useState(route.params.data.description);
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useState(
    route.params.data?.offer_category_id
  );
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

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

  const cleanSuccessModal = () => {
    setSuccessModalOpen(false);
    navigation.navigate("Home");
  };

  const uploadImage = async () => {
    try {
      setLoading(true);
      const response = await updateOffer({
        title: asunto,
        description: mensaje,
        offer_category_id: categoryId,
        partner_id: route.params.data?.partner_id,
        url: url,
        id: route.params.data?.id,
        email: email,
        image: imagen,
      });

      if (response.status !== 200) {
        throw new Error(JSON.stringify(response), {
          cause: "no se obtuvo el status 200",
        });
      }

      console.log("RESPONSE", response.body);

      setLoading(false);
      setSuccessModalOpen(true);
      setTimeout(() => {
        cleanSuccessModal();
      }, 3000);
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
        title={`Editar mi publicación`}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 110 }}
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
                      value={asunto}
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
                  value={email}
                  px={3.5}
                  borderColor={"transparent"}
                  borderRadius={8}
                  placeholder={""}
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
                  value={url}
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
                value={mensaje}
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
                _pressed={{ bgColor: "rgba(218, 103, 58, .5)" }}
                _text={{ fontSize: 14, fontWeight: "600" }}
                bg={"#DA673A"}
                isLoading={loading}
                onPress={() => uploadImage()}
                w="90%"
                py={5}
                rounded={8}
              >
                Editar
              </Button>
            </Box>
          </Box>
        </ScrollView>
        <ErrorModal
          message={"Error al editar"}
          isOpen={errorModalOpen}
          setOpen={setErrorModalOpen}
        />
        <SuccessModal
          message={"Todo listo"}
          isOpen={successModalOpen}
          setOpen={cleanSuccessModal}
        />
      </Layout>
    </Container>
  );
}

export default OfferEditForm;
