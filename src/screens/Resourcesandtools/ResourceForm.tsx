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
  publishDoc,
  getServices
} from "../../utils/hooks/services";
import RNPickerSelect from "react-native-picker-select";
import { useEffect } from "react";

import * as ImagePicker from 'expo-image-picker';
import { ErrorModal, SuccessModal } from "../AboutSubject/Modals";
import { StyleSheet } from "react-native";

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    marginBottom: 20,
    color: '#d3d3d3',
    paddingRight: 20, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    backgroundColor: "#F7FAFC",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'blue',
    marginBottom: 20,
    color: '#d3d3d3',
    paddingRight: 20,

  },
});


function ResourceForm({ route, navigation }) {
  const { subject_id } = route.params;
  const [loading, setLoading] = useState(false);
  const [resourceCategories, setResourceCategory] = React.useState([]);

  const [previewImage, setPreviewImage] = useState(null);
  const [imagen, setImagen] = useState(null)
  const [name, setName] = useState(null)

  const [categoriaId, setCategoria] = useState("")
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true)
    getServices('resource-category/all').then(({ data }: any) => {
      setResourceCategory(data)
    }).catch(error => {
      if (__DEV__) {
        console.log("🚀 ~ file: ResourceForm.tsx ~ getServices ~ error", error)
      }
    }).finally(() => setLoading(false))

  }, [])


  useEffect(() => {
    getServices("resource-category/all")
      .then(({ data }: any) => {

        const category = data.map((data) => {
          return { label: data.name, value: data.id }
        })

        setResourceCategory(category)
      })

  }, [])

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


  const categorysEmpty = [{
    label: "No existen partners",
    value: "1"
  }]

  const uploadImage = async () => {
    try {

      const response = await publishDoc({
        subject_id,
        resource_category_id: categoriaId,
        image: imagen,
        name
      })

      if (response.status != 201) {
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
        title={`Publicá un documento`}
      >
        <ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps={"handled"}
        >
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
                  onChangeText={(text) => setName(text)}
                  type={"text"}
                  p={3.5}

                  mb={4}
                  placeholder={"Nombre de archivo"}
                  placeholderTextColor={"#d3d3d3"}
                  backgroundColor={"#F7FAFC"}

                />
              </Box>

              <Box>
                <RNPickerSelect
                  style={customPickerStyles}
                  onValueChange={(value) => setCategoria(value)}
                  items={resourceCategories.length ? resourceCategories : categorysEmpty}
                  placeholder={{ label: 'Categoría', value: null }} />
              </Box>

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

export default ResourceForm;
