import { Avatar, Box, Button, Icon, IconButton, Input, ScrollView, Text } from 'native-base'
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
import RNFS from 'react-native-fs';
import Alert from "../../components/alert/Alert";
function EditProfile({route, navigation}) {
  const userdata = useSelector((state: any) => state.user.userdata)
  const [form, setForm] = useState({image: userdata.image.url, phone: userdata.phone})
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

  const pickImg = async () => {
    try {
      const img:any = await DocumentPicker.getDocumentAsync({type: 'image/*'})
      setForm({...form, image: img.assets[0]?.uri})
      // await RNFS.readFile(img.assets[0]?.uri, 'base64').then(data => {
      //   console.log('base64',data);
      // })
    } catch(err) {
      console.log(err)
    }

  }

  return (
    <ScrollView>
            {alert && (
        <Alert type={alert.type} message={alert.message} closeAlert={closeAlert} />
      )}
      <Box mt={'10'} alignItems='center'>
        <Avatar
          bg="brand.primary"
          source={{ uri: form.image }}
          size={'lg'}
        >
        </Avatar>
        <TouchableOpacity onPress={pickImg}>
          <Text mt='2' fontSize={'13'} color={'#9A9A9A'} fontWeight={'700'}>Cambiar foto de perfil</Text>
        </TouchableOpacity>
      </Box>

      <Box mx={5} my={7}>
        <Box mb={'5'} alignItems={'left'} flexDir={'column'} justifyContent={'space-between'}>
          <Text fontSize={17} color="brand.primary" fontWeight={'600'}  fontFamily={'Poppins'}>Teléfono</Text>
          <Input 
          rightElement={<IconButton
							icon={
								<Icon
									as={MaterialIcons}
									size={3}
									color="#9A9A9A"
									name="edit"
								/>
							}
							bgColor={"#EBEEF2"}
							rounded={"full"}
							size={5}
						/>} 
          autoFocus={true} 
          onChangeText={text => setForm({...form, phone: text})} 
          isDisabled={false} 
          value={form.phone}
          fontFamily={'Poppins'} 
          placeholder={'+5491164619938'} 
          type={"text"}
          px={3.5}
          placeholderTextColor={"#d3d3d3"}
          backgroundColor={"#F7FAFC"}
          />
          {/* <Input
                onChangeText={text => setForm({...form, phone: text})} 
                type={"text"}
                px={3.5}
                mb={5}
                placeholder={"+5491164619938"}
                placeholderTextColor={"#d3d3d3"}
                backgroundColor={"#F7FAFC"}
              /> */}
        </Box>

        <Box mb={'5'} alignItems={'left'} flexDir={'column'} justifyContent={'space-between'}>
          <Text fontSize={17} color="brand.primary" fontWeight={'600'}  fontFamily={'Poppins'}>Email</Text>
          <Input rightElement={<IconButton
							icon={
								<Icon
									as={MaterialIcons}
									size={3}
									color="#9A9A9A"
									name="edit"
								/>
							}
							bgColor={"#EBEEF2"}
							rounded={"full"}
							size={5}
						/>} isDisabled={true} value={userdata.email}  px={'2'} fontFamily={'Poppins'} placeholder={'correo@gmail.com'} />
        </Box>

        <Box mb={'5'} alignItems={'left'} flexDir={'column'} justifyContent={'space-between'}>
          <Text fontSize={17} color="brand.primary" fontWeight={'600'}  fontFamily={'Poppins'}>Usuario</Text>
          <Input rightElement={<IconButton
							icon={
								<Icon
									as={MaterialIcons}
									size={3}
									color="#9A9A9A"
									name="edit"
								/>
							}
							bgColor={"#EBEEF2"}
							rounded={"full"}
							size={5}
						/>} isDisabled={true} value={userdata.username}  px={'2'} fontFamily={'Poppins'}  placeholder={'tomasruschin'} />
        </Box>

        <Box alignItems='center' mb={20}>
          <TouchableOpacity onPress={() => sendForm()}>
            <Button
              _pressed={{bgColor:'rgba(218, 103, 58, .5)'}}
              _text={{ fontSize: 14, fontWeight: '600', textAlign:'center' }}                            
              bg={"#DA673A"}
              // w="90%"
              py={5}
              px={'50px'}
              rounded={8}
            >
              Guardar
            </Button>
            {/* <Box 
            h={42} 
            flexDir={'row'} 
            bg="brand.primary" 
            w={'40%'} 
            alignItems={'center'} 
            justifyContent={'space-around'} 
            borderRadius={8} 
            px='2'>
              <Ionicons name="arrow-forward-circle" size={26} color="white" />
              <Text color='white' fontSize={14}>Guardar</Text>
            </Box> */}
          </TouchableOpacity>
        </Box>
      </Box>
    </ScrollView>
  )
}

export default EditProfile