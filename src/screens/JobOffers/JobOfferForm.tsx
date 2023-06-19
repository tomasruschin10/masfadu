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
import RNPickerSelect from "react-native-picker-select";
import Container from "../../components/Container";
import Layout from "../../utils/LayoutHeader&BottomTab";
import {
  getServices,
  publishOffer
} from "../../utils/hooks/services";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { updateMessage } from "../../redux/actions/message";
import { useEffect } from "react";

import { baseApi } from "../../utils/api";
import { store } from "../../redux/store";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from 'react-native';

function OfferForm({ route, navigation }) {

  const [allTags, setAllTags] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedValue, setSelectedValue] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  const [imagen, setImagen] = useState(null)
  const [asunto, setAsunto] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [partnerId, setPartnerId] = useState("")
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
  label:"No existen partners",
  value: "1"
}]

  const [partners, setPartnes] = useState()

  const selectImage = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync();
      
      if (!image.canceled && image.assets.length > 0) {
        console.log('IMAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', image)
        setImagen(image.assets[0])
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

  let FilterTags = () =>
    allTags.length > 0
      ? allTags.filter((it: any) =>
          it.name
            .toLowerCase()
            .includes(searchText.toLowerCase().replace("#", ""))
        )
      : [];


  useEffect(() => {

    getServices("partner/all")
    .then(({ data }: any) => {

   const category =   data.map((data) => {
        return {label: data.name, value: data.id}
      })

      console.log(category)
      setPartnes(category)
      
    })

  }, [])


  const uploadImage = async () => {
    try {

      const response = await publishOffer({
        title: asunto,
        description: mensaje,
        offer_category_id: "1",
        image: imagen,
        partner_id: partnerId
      })

      if (response.status != 201) {
        throw new Error(JSON.stringify(response), { cause: 'no se obtuvo el status 201' });
      }
      console.log('RESPONSE', response.body);

      alert('Publicación exitosa');
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error al enviar la imagen al backend:', error);
      alert("Error al publicar");
    }
  };



  return (
    <Container>
      <Layout
        route={route}
        navigation={navigation}
        title={`Publicá una Oferta Laboral`}
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
  onValueChange={(value) => setPartnerId(value)}
  items={partners ? partners : categorysEmpty}
  placeholder={{ label: 'Partner', value: null }}
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
      </Layout>
    </Container>
  );
}

export default OfferForm;
