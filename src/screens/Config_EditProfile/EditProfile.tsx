import { Avatar, Box, Button, Icon, IconButton, Image, Input, ScrollView, Text } from 'native-base'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { putServices } from '../../utils/hooks/services'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { store } from '../../redux/store';
import { updateUserdata } from '../../redux/actions/user';
import * as DocumentPicker from 'expo-document-picker';
import { updateMessage } from '../../redux/actions/message';
import { MaterialIcons } from "@expo/vector-icons";
import Alert from "../../components/alert/Alert";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Octicons } from '@expo/vector-icons';
import Container from '../../components/Container';

function EditProfile({route, navigation}) {
  const userdata = useSelector((state: any) => state.user.userdata)
  const [form, setForm] = useState({image: userdata.image.url, phone: userdata.phone})
  const [imagen, setImagen] = React.useState(null);
  const dispatch = useDispatch()

  const [alert, setAlert] = React.useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const sendForm = () => {
    const img:any = { uri: form.image, name:'userProfile.jpg', type:'image/jpg' }
    const formData = new FormData
    formData.append('phone', form.phone)
    formData.append('image', img)

    putServices(`auth/update/${userdata.id}`, formData).then(({data}:any) => {
      store.dispatch(updateUserdata(data))
      dispatch(updateMessage({body: 'Guardado con Exito!', open: true, type: 'success'}))
     /* showAlert('success', 'Guardado con Exito!') */
    }).catch(err => /* showAlert('error', 'Hubo un Error al Guardar')  */dispatch(updateMessage({body: 'Hubo un Error al Guardar', open: true, type: 'danger'})))
  }

  const selectImage = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync();
      if (!image.canceled && image.assets.length > 0) {
        const imageUri = image.assets[0].uri;
        const compressedImage = await compressImage(imageUri);
        setImagen(compressedImage);
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
            {alert && (
        <Alert type={alert.type} message={alert.message} closeAlert={closeAlert} />
      )}
      <Box
      px={4}
      flex={1}
      justifyContent='space-between'
      pb={70}
      >
        <Box>
          <Box mt={'10'} alignItems='center'>
            <TouchableOpacity onPress={selectImage}>
              <Image
                alt="imagen"
                source={{ uri: form.image }}
                w={120}
                h={120}
                rounded={120}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={selectImage}>
              <Text 
              mt={2} 
              fontSize={16} 
              color='brand.darkText'
              >
                Cambiar foto de perfil
              </Text>
            </TouchableOpacity>
          </Box>

          <Box my={7}>
            <Box 
            mb={6} 
            alignItems={'left'} 
            flexDir={'column'} 
            justifyContent={'space-between'}
            >
              <Text 
              fontSize={17} 
              color="brand.darkText" 
              fontWeight={'600'}  
              fontFamily={'Poppins'}
              mb={2}
              >
                Teléfono
              </Text>
              <Input 
              rightElement={<IconButton
              mr={2}
              icon={
                <Octicons name="pencil" size={16} color="#DA673A" />
              }
              bgColor={"#FBF0EB"}
                  rounded={"full"}
                  size={8}
                />} 
              onChangeText={text => setForm({...form, phone: text})} 
              isDisabled={false} 
              value={form.phone}
              fontFamily={'Poppins'} 
              placeholder={'+5491164619938'} 
              rounded={8}
              type={"text"}
              px={5}
              py={3}
              fontSize={16} 
              placeholderTextColor={"#d3d3d3"}
              backgroundColor={"#F7FAFC"}
              />
            </Box>

            <Box mb={'5'} alignItems={'left'} flexDir={'column'} justifyContent={'space-between'}>
              <Text 
              fontSize={17} 
              color="brand.darkText" 
              fontWeight={'600'}  
              fontFamily={'Poppins'}
              mb={2}
              >
                Email
              </Text>
              <Input 
              rightElement={<IconButton
              mr={2}
              icon={
                <Octicons name="pencil" size={16} color="#DA673A" />
              }
              bgColor={"#FBF0EB"}
              rounded={"full"}
              size={8}
              />} 
              isDisabled={true} 
              rounded={8} 
              value={userdata.email}  
              px={5}
              py={3}
              fontFamily={'Poppins'} 
              fontSize={16} 
              placeholder={'correo@gmail.com'} 
              />
            </Box>

            <Box mb={'5'} alignItems={'left'} flexDir={'column'} justifyContent={'space-between'}>
              <Text 
              fontSize={17} 
              color="brand.darkText" 
              fontWeight={'600'}  
              fontFamily={'Poppins'}
              mb={2}
              >
                Usuario
              </Text>
              <Input 
              rightElement={<IconButton
                mr={2}
                icon={
                  <Octicons name="pencil" size={16} color="#DA673A" />
                }
                bgColor={"#FBF0EB"}
                rounded={"full"}
                size={8}
                />} 
              rounded={8} 
              isDisabled={true} 
              value={userdata.username} 
              px={5}
              py={3}
              fontFamily={'Poppins'}  
              fontSize={16} 
              placeholder={'tomasruschin'} 
              />
            </Box>

          </Box>
        </Box>
            <Button
            mb={10}
              onPress={() => sendForm()}
              _pressed={{bgColor:'rgba(218, 103, 58, .5)'}}
              _text={{ fontSize: 14, fontWeight: '600', textAlign:'center' }}                            
              bg={"#DA673A"}
              py={5}
              rounded={8}
            >
              Guardar
            </Button>
      </Box>
    </Container>
  )
}

export default EditProfile