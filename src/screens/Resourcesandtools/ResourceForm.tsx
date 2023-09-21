import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  ScrollView,
  Text,
  Image,
  Select,
  CheckIcon,
} from "native-base";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import {
  publishDoc,
  getServices
} from "../../utils/hooks/services";
import { useEffect } from "react";

import * as ImagePicker from 'expo-image-picker';
import { ErrorModal, SuccessModal } from "../AboutSubject/Modals";
import { StyleSheet } from "react-native";
import { fontStyles } from "../../utils/colors/fontColors";
import { AxiosError } from "axios";


function ResourceForm({ route, navigation }) {
  const [loading, setLoading] = useState(false);
  const [resourceCategories, setResourceCategory] = React.useState([]);

  const [previewImage, setPreviewImage] = useState(null);
  const [imagen, setImagen] = useState(null)
  const [name, setName] = useState(null)
  const [subjectName, setSubjectName] = useState("");
  const [selectedCategoryId, setCategory] = useState("")
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [careers, setCareers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  if (route.params && route.params?.career_id) {
    setSelectedCareerId(route.params.career_id)
  }

  const handleSubjectChange = (itemValue) => {
    setSelectedSubjectId(itemValue);
    setSubjectName(subjects.find(el => el.id === itemValue).name)
  };

  const handleCareerChange = (itemValue) => {
    setSelectedCareerId(itemValue);
    setSelectedSubjectId(null);
  };

  const handleCategoryChange = (itemValue) => {
    setCategory(itemValue)
  };


  useEffect(() => {
    getServices('career/all').then((res: any) => {
      setCareers(res.data)
    }).catch(() => { });
  }, [])

  useEffect(() => {
    getServices("subject/career/" + selectedCareerId)
      .then(({ data }: any) => {
        setSubjects(data);
      })
      .catch(() => { });
  }, [selectedCareerId])



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
      const image = await ImagePicker.launchImageLibraryAsync({ base64: false });

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
    }, 30000);
  }


  const categorysEmpty = [{
    label: "No existen partners",
    value: "1"
  }]

  const uploadImage = async () => {
    try {
      setLoading(true);

      const response = await publishDoc({
        subject_id: selectedSubjectId,
        resource_category_id: selectedCategoryId,
        image: imagen,
        name
      })

      if (response.status != 201) {
        throw new Error(JSON.stringify(response), { cause: 'no se obtuvo el status 201' });
      }
      console.log('RESPONSE', response.body);

      setSuccessModalOpen(true);
      setLoading(false);

      cleanModals();
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error al enviar la imagen al backend:', (error as AxiosError).request);
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
        title={`Publicá un documento`}
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
              Publicá un documento {subjectName && "en"}
            </Text>
            {subjectName && <Text style={[fontStyles.headingText]}>{subjectName}</Text>}
          </Box>
          <Box>


            <Box
              mx="5"
              mb={3}
              borderBottomWidth={1}
              borderBottomColor={"#EBEEF2"}
              pt={2}
            >
              {careers.length > 0 ? (
                <Select
                  backgroundColor={"#F7FAFC"}
                  placeholderTextColor={"#C4C4C4"}
                  selectedValue={selectedCareerId}
                  minWidth="335"
                  accessibilityLabel="Elegir Carrera"
                  placeholder="Elegir Carrera"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(e) => handleCareerChange(e)}
                  textAlign={"left"}
                >
                  {careers.map((item) => (
                    <Select.Item label={item.name} value={item.id} key={item.id} />
                  ))}
                </Select>
              ) : (
                <Select
                  backgroundColor={"#F7FAFC"}
                  placeholderTextColor={"#C4C4C4"}
                  textAlign={"left"}
                  isDisabled
                  accessibilityLabel="Elegir Materia"
                  placeholder="No hay más materias"
                ></Select>
              )}
            </Box>
            <Box
              mx="5"
              mb={3}
              borderBottomWidth={1}
              borderBottomColor={"#EBEEF2"}
            >
              {subjects.length > 0 ? (
                <Select
                  backgroundColor={"#F7FAFC"}
                  placeholderTextColor={"#C4C4C4"}
                  selectedValue={selectedSubjectId}
                  minWidth="335"
                  accessibilityLabel="Elegir Materia"
                  placeholder="Elegir Materia"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(e) => handleSubjectChange(e)}
                  textAlign={"left"}
                >
                  {subjects.map((item) => (
                    <Select.Item label={item.name} value={item.id} key={item.id} />
                  ))}
                </Select>
              ) : (
                <Select
                  backgroundColor={"#F7FAFC"}
                  placeholderTextColor={"#C4C4C4"}
                  textAlign={"left"}
                  isDisabled
                  accessibilityLabel="Elegir Materia"
                  placeholder="No hay más materias"
                ></Select>
              )}
            </Box>

            <Box
              mx="5"
              borderBottomWidth={1}
              borderBottomColor={"#EBEEF2"}

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
                  mb={3}
                  placeholder={"Nombre de archivo"}
                  placeholderTextColor={"#d3d3d3"}
                  backgroundColor={"#F7FAFC"}

                />
              </Box>

              <Box>
                {resourceCategories.length > 0 ? (
                  <Select
                    backgroundColor={"#F7FAFC"}
                    placeholderTextColor={"#C4C4C4"}
                    selectedValue={selectedCategoryId}
                    minWidth="335"
                    accessibilityLabel="Elegir Categpría"
                    placeholder="Elegir Categoría"
                    _selectedItem={{
                      bg: "teal.600",
                      endIcon: <CheckIcon size="5" />,
                    }}  
                    mt={1}
                    onValueChange={(e) => handleCategoryChange(e)}
                    textAlign={"left"}
                  >
                    {resourceCategories.map((item) => (
                      <Select.Item label={item.name} value={item.id} key={item.id} />
                      ))}
                  </Select>
                ) : (
                  <Select
                    backgroundColor={"#F7FAFC"}
                    placeholderTextColor={"#C4C4C4"}
                    rounded={"3xl"}
                    textAlign={"left"}
                    isDisabled
                    accessibilityLabel="Sin Categorías"
                    placeholder="No hay categorías"
                  ></Select>
                )}
              </Box>

              <Box mb={5} mt={5} style={{ backgroundColor: "#F7FAFC", height: 150, }}>
                {previewImage && <Image alt="Imagen" source={{ uri: previewImage }} style={{ width: "100%", height: "100%" }} />}
                <Button fontSize={1} zIndex={99} style={{ backgroundColor: "#d3d3d3", width: "30%", borderRadius: 50, marginLeft: "30%", marginTop: "13%", position: "absolute", height: "20%" }} onPress={selectImage}>Subir Archivo</Button>
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
        <SuccessModal message={"Gracias! Vamos a subir tu publicación una vez que la hayamos revisado. No nos va a llevar mucho tiempo.😃"} isOpen={successModalOpen} setOpen={setSuccessModalOpen} />
      </Layout>
    </Container>
  );
}

export default ResourceForm;
