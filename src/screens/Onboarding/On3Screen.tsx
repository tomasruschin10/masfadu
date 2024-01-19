import { Box, Button, Image, Text } from "native-base";
import * as React from "react";
import Container from "../../components/Container";
import { NoHeader } from "../../components/Header";
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { putServices } from "../../utils/hooks/services";
import { store } from "../../redux/store";
import { updateUserdata } from "../../redux/actions/user";
import { updateMessage } from "../../redux/actions/message";

import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { SimpleLineIcons } from '@expo/vector-icons';

const On3Screen = ({ navigation }) => {    
    const userdata = useSelector((state: any) => state.user.userdata)
    const [form, setForm] = React.useState({image: null})
    const dispatch = useDispatch()
    const [previewImage, setPreviewImage] = React.useState(null);  
    const [imagen, setImagen] = React.useState(null);
  
  const sendForm = () => {
    const img:any = { uri: form.image, name:'userProfile.jpg', type:'image/jpg' }
    const formData = new FormData
    formData.append('image', img)

    putServices(`auth/update/${userdata.id}`, formData).then(({data}:any) => {
      store.dispatch(updateUserdata(data))
      navigation.navigate('Onboarding4')
      dispatch(updateMessage({body: 'Guardado con Exito!', open: true, type: 'success'}))
    }).catch(err => /* showAlert('error', 'Hubo un Error al Guardar')  */dispatch(updateMessage({body: 'Hubo un Error al Guardar', open: true, type: 'danger'})))
  }

      const selectImage = async () => {
        try {
          const image = await ImagePicker.launchImageLibraryAsync();
          console.log("image <>", image);
          if (!image.canceled && image.assets.length > 0) {
            const imageUri = image.assets[0].uri;
            const compressedImage = await compressImage(imageUri);
    
            setImagen(compressedImage);
    
            setPreviewImage(image.assets[0].uri);
            setForm({...form, image: image.assets[0]?.uri})
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
  return (
    <Container>
			<Box 
      flex={1} 
      mt={-5} 
      justifyContent={'space-between'} 
      alignItems="center"
      pb={14}
      >
            <Box mt={'10'} alignItems='center'>
            </Box>
                <TouchableOpacity onPress={selectImage}>
                  {previewImage
                  ? (
                    <Image
                      alt="imagen"
                      source={{ uri: previewImage }}
                      w={200}
                      h={200}
                      rounded={200}                      
                      mb={6}
                    />
                  )
                  : (
                    <Button
                      fontSize={12}
                      w={200}
                      h={200}
                      rounded={200}
                      mb={6}
                      style={{
                        backgroundColor: "#d3d3d3",
                      }}
                      onPress={selectImage}
                      textAlign='center'
                      alignItems='center'
                    >
                      <SimpleLineIcons 
                      name="camera" 
                      size={24} 
                      color="white" 
                      style={{
                        marginLeft:'auto',
                        marginRight:'auto',
                        marginBottom:4
                      }}
                      />
                      <Text
                      color="white" 
                      textAlign='center'
                      >
                        AGREGAR IMAGEN DE
                      </Text>
                      <Text
                      color="white" 
                      textAlign='center'
                      >
                        PERFIL
                      </Text>
                    </Button>                    
                  )}
                </TouchableOpacity>
				<Button 
				_pressed={{bgColor:'rgba(218, 103, 58, .5)'}}
				_text={{ fontSize: 14, fontWeight: '600' }}                            
				bg="brand.primary" 
				onPress={sendForm} 
                isDisabled={!form.image}
				mb={12} 
				w="90%"
				py={5}
				rounded={8}
				>
					Siguiente
				</Button>
			</Box>
	</Container>
  )
}

export default On3Screen
