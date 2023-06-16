import React, { useState } from "react";
import {
  Box,
  Button,
  Icon,
  Input,
  Modal,
  ScrollView,
  Text,
  TextArea,
  Image,
} from "native-base";
import RNPickerSelect from "react-native-picker-select";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { FontAwesome5, Ionicons, AntDesign } from "@expo/vector-icons";
import {
  getServices,
  postServices,
  postTags,
} from "../../utils/hooks/services";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { updateMessage } from "../../redux/actions/message";
import { useEffect } from "react";
import RecommendedTags from "../../utils/RecommendedTags";
import Alert from "../../components/alert/Alert";
import { baseApi } from "../../utils/api";
import { store } from "../../redux/store";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from 'react-native';
import { AxiosError } from "axios";
import * as FileSystem from 'expo-file-system';

function OfferForm({ route, navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalIcon, setShowModalIcon] = useState(false);
  const [menuShow, setMenu] = useState(false);
  const [allTags, setAllTags] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  const [alert, setAlert] = React.useState(null);
  const [imagen, setImagen] = useState(null)
  const [asunto, setAsunto] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [categoryId, setCategoryId] = useState("")
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

const categorysEmpty = [{
  label:"No existe categorias",
  value: "1"
}]

  const [categorys, setCategorys] = useState()

  const selectImage = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync();       
      
      console.log("image ", image)

      if (!image.canceled && image.assets.length > 0) {
        setImagen(image.assets[0])
        setPreviewImage(image.assets[0].uri); // Guarda la URI de la imagen seleccionada para mostrarla en la vista previa
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getServices("tag/all")
      .then(({ data }: any) => {
        setAllTags(data);
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

  const addNewTag = async () => {
    if (searchText.includes(" ") || searchText.length === 0) {
      dispatch(
        updateMessage({
          body: "Asegurate de no tener espacios en blanco",
          open: true,
          type: "warning",
        })
      );
      /*  showAlert('warning', 'Asegurate de no tener espacios en blanco') */
      return false;
    }
    const state: any = store.getState();
    const authToken = state.token;
    baseApi
      .post(
        `tag/create`,
        { name: searchText },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        setSearchText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  


  useEffect(() => {

    getServices("offer-category/all")
    .then(({ data }: any) => {

   const category =   data.map((data) => {
        return {label: data.name, value: data.id}
      })

      console.log(category)
      setCategorys(category)
      
    })

  }, [])

/*   const uploadImage = async () => {
    const state: any = store.getState();
    const authToken = state.token;
    console.log("AAAA")
    try {
      const formData = new FormData();
      formData.append('image',imagen);
      formData.append('title',asunto);
      formData.append('description',mensaje);
      formData.append('offer_category_id',categoryId);
      console.log(formData,  {
        Authorization: `Bearer ${authToken}`,
      })
      const response =  await baseApi.post('offer/create', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      console.log("RESPONSE ,", response)
    } catch (error) {
      console.log('Error al enviar la imagen al backend:', {
        status: (error as AxiosError).status,
        data: (error as AxiosError).toJSON()
      });
    }
  }; */

  const uploadImage = async () => {
    const state: any = store.getState();
    const authToken = state.token;

    const uploadUrl = baseApi.defaults.baseURL + '/offer/create';
    const options: FileSystem.FileSystemUploadOptions = {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'image',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      parameters: {
        title: asunto,
        description: mensaje,
        offer_category_id: categoryId,
/*         partner_id: "59",
        career_id: "65",
 */      },
    };
    //categoryId
    const response = await FileSystem.uploadAsync(uploadUrl, imagen.uri, options);

    if (response.status === 200) {
      console.log('RESPONSE', response.body);
    } else {
      console.log('Error al enviar la imagen al backend:', response);
    }
  };

  
  const selectDocument = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync();
      console.log(document);
      // Aquí puedes hacer algo con el documento seleccionado, como enviarlo a un servidor o procesarlo de alguna manera.
    } catch (error) {
      console.log(error);
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
              Describí de la forma más precisa y detallada que puedas lo que
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
{/*       <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Opción 1" value="opcion1" />
        <Picker.Item label="Opción 2" value="opcion2" />
        <Picker.Item label="Opción 3" value="opcion3" />
      </Picker>
 */}

<RNPickerSelect

  style={customPickerStyles}
  onValueChange={(value) => setCategoryId(value)}
  items={categorys ? categorys : categorysEmpty}
  placeholder={{ label: 'Categoría', value: null }}
/>



              {allTags.length > 0 && (
                <>
                  <Box
                    mb={searchText !== "" ? 2 : 2}
                    alignItems={"center"}
                    justifyContent="center"
                    flexDir={"row"}
                  >
                    <Input
                      onChangeText={(text) => setAsunto(text)}
                      type={"text"}
                      p={3.5}
                    
                      mb={4}
                      placeholder={"Asunto"}
                      placeholderTextColor={"#d3d3d3"}
                      backgroundColor={"#F7FAFC"}

                    />
                  </Box>
                </>
              )}

              <TextArea
              onChangeText={(text) => setMensaje(text)}
                placeholder="Mensaje"
                autoCompleteType={"off"}
                fontSize={15}
                h={100}
                backgroundColor={"#F7FAFC"}
                borderWidth={0}
                placeholderTextColor={"#d3d3d3"}
                mb={6}
              />

              <Box mb={5} style={{ backgroundColor: "#F7FAFC", height: 150,  }}>
              {previewImage && <Image source={{ uri: previewImage }} style={{ width: "100%", height: "100%" }} />}
                <Button fontSize={1} zIndex={99} style={{backgroundColor: "#d3d3d3", width: "30%", borderRadius: 50, marginLeft: "30%", marginTop: "13%", position: "absolute", height: "20%"}}  onPress={selectImage}>Agregar Imagen</Button>
              </Box>
            </Box>

{/*             <Box mt={-20} alignItems="center">
              <Button
                style={{ backgroundColor: "#EB5E29" }}
                isLoading={loading}
                onPress={() =>{
                  console.log("SSSS")
                  uploadImage()
                }}
                w="90%"
                py={5}
                backgroundColor="blue.500"
                rounded={"2xl"}
              >
                Enviar
              </Button>
            </Box> */}

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
        </ScrollView>
      </Layout>
    </Container>
  );
}

export default OfferForm;
