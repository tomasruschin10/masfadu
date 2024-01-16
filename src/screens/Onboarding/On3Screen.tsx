import { Avatar, Box, Button, Image, Text } from "native-base";
import * as React from "react";
import Container from "../../components/Container";
import { NoHeader } from "../../components/Header";
import * as DocumentPicker from 'expo-document-picker';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { putServices } from "../../utils/hooks/services";
import { store } from "../../redux/store";
import { updateUserdata } from "../../redux/actions/user";
import { updateMessage } from "../../redux/actions/message";

const On3Screen = ({ route, navigation }) => {    
    const userdata = useSelector((state: any) => state.user.userdata)
    const [form, setForm] = React.useState({image: null})
    const dispatch = useDispatch()
  
  const sendForm = () => {
    const img:any = { uri: form.image, name:'userProfile.jpg', type:'image/jpg' }
    const formData = new FormData
    formData.append('image', img)

    putServices(`auth/update/${userdata.id}`, formData).then(({data}:any) => {
      store.dispatch(updateUserdata(data))
      navigation.navigate('Home')
      dispatch(updateMessage({body: 'Guardado con Exito!', open: true, type: 'success'}))
    }).catch(err => /* showAlert('error', 'Hubo un Error al Guardar')  */dispatch(updateMessage({body: 'Hubo un Error al Guardar', open: true, type: 'danger'})))
  }

    const pickImg = async () => {
        try {
          const img:any = await DocumentPicker.getDocumentAsync({type: 'image/*'})
          setForm({...form, image: img.assets[0]?.uri})
        } catch(err) {
          console.log(err)
        }
    
      }
  return (
    <Container>{console.log(userdata)}
		<NoHeader />
			<Box flex={1} mt={-5} justifyContent={'center'} alignItems="center">
            <Box mt={'10'} alignItems='center'>
            </Box>              
                <Avatar
                bg="brand.primary"
                source={{ uri: form.image }}
                size={'60px'}
                >
                </Avatar>
                <TouchableOpacity onPress={pickImg}>
                <Text 
                mt='2'
                mb={8} 
                fontSize={'2xl'} 
                fontWeight={500}
                color={'#9A9A9A'} 
                textAlign='center'
                >
                    ¡Agrega una foto de perfil!
                </Text>
                </TouchableOpacity>
				<Button 
				_pressed={{bgColor:'rgba(218, 103, 58, .5)'}}
				_text={{ fontSize: 14, fontWeight: '600' }}                            
				bg="brand.primary" 
				onPress={sendForm} 
                isDisabled={!form.image}
				mb={3} 
				w="90%"
				py={5}
				rounded={8}
				>
					Ir al inicio
				</Button>
			</Box>
	</Container>
  )
}

export default On3Screen
