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
  VStack,
  CheckIcon,
} from "native-base";
import { TouchableOpacity, Modal, View } from "react-native";
import { SwipeablePanel } from "rn-swipeable-panel";
import { Entypo } from "@expo/vector-icons";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import {
  getCategories,
  getServices,
  publishOffer,
} from "../../utils/hooks/services";
import { fontStyles } from "../../utils/colors/fontColors";
import { ErrorModal, SuccessModal } from "../AboutSubject/Modals";

function OfferForm({ route, navigation }) {
  const [allTags, setAllTags] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [previewImage, setPreviewImage] = useState(null);

  const [imagen, setImagen] = useState(null);
  const [asunto, setAsunto] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useState();
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [showSelectCategory, setShowSelectCategory] = useState(false);
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
        imageUri,
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
      const response = await publishOffer({
        title: asunto,
        description: mensaje,
        offer_category_id: categoryId?.id,
        url: "",
        email: email,
        image: imagen,
      });

      if (response.status !== 201) {
        throw new Error(JSON.stringify(response), {
          cause: "no se obtuvo el status 201",
        });
      }
      setLoading(false);
      setSuccessModalOpen(true);
      setTimeout(() => {
        cleanSuccessModal();
      }, 3000);
    } catch (error) {
      setErrorModalOpen(true);
      setLoading(false);

      cleanModals();
    }
  };

  const selectCategory = (item) => {
    setCategoryId(item);
  };

  return (
    <Container>
      <Layout
        route={route}
        navigation={navigation}
        title={`Publicá en el Mercado de Fadu`}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
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

              <Box
                mt={2}
                borderBottomWidth={1}
                borderBottomColor={"#EBEEF2"}
                mb={5}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    backgroundColor: "#F7FAFC",
                    paddingHorizontal: 10,
                    height: 50,
                    borderRadius: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onPress={() => setShowSelectCategory(true)}
                >
                  {categoryId ? (
                    <Text
                      bold={true}
                      numberOfLines={2}
                      style={[fontStyles.poppins400, { fontSize: 14 }]}
                      color={"#171717"}
                    >
                      {categoryId.name}
                    </Text>
                  ) : (
                    <Text
                      bold={true}
                      numberOfLines={2}
                      style={[fontStyles.poppins400, { fontSize: 14 }]}
                      color={"#C4C4C4"}
                    >
                      Elegir categoria
                    </Text>
                  )}
                  <Entypo name="chevron-down" size={25} color="#797979" />
                </TouchableOpacity>
              </Box>

              <VStack space={2} alignItems="flex-start">
                <Modal
                  visible={!!showSelectCategory}
                  transparent
                  children={
                    <SwipeablePanel
                      style={{ height: 480 }}
                      closeOnTouchOutside
                      onClose={() => setShowSelectCategory(false)}
                      fullWidth
                      onlyLarge
                      isActive={!!showSelectCategory}
                    >
                      <ScrollView>
                        <View
                          style={{
                            paddingVertical: 27,
                            paddingBottom: 54,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                          }}
                        >
                          {categories &&
                            categories
                              .slice()
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((item, index) => (
                                <TouchableOpacity
                                  key={index}
                                  onPress={() => {
                                    selectCategory(item);
                                    setShowSelectCategory(false);
                                  }}
                                  style={{
                                    paddingRight: 27,
                                    paddingLeft: 30,
                                    paddingVertical: 10,
                                    backgroundColor:
                                      item === categoryId
                                        ? "#DA673A"
                                        : "transparent",
                                  }}
                                >
                                  <Text
                                    style={[
                                      fontStyles.poppins400,
                                      {
                                        fontSize: 16,
                                        color:
                                          item === categoryId
                                            ? "white"
                                            : "black",
                                      },
                                    ]}
                                  >
                                    {item.name}
                                  </Text>
                                </TouchableOpacity>
                              ))}
                        </View>
                      </ScrollView>
                    </SwipeablePanel>
                  }
                />
              </VStack>

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
                <TouchableOpacity
                  style={{
                    backgroundColor: "#d3d3d3",
                    width: "30%",
                    borderRadius: 50,
                    marginLeft: "30%",
                    marginTop: "13%",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    height: "20%",
                    zIndex: 99,
                  }}
                  onPress={selectImage}
                >
                  <Text style={{ fontSize: 14, color: "white" }}>
                    Agregar Imagen
                  </Text>
                </TouchableOpacity>
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
          setOpen={cleanSuccessModal}
        />
      </Layout>
    </Container>
  );
}

export default OfferForm;
