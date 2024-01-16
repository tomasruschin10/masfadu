import { Box, Button, Icon, IconButton, Input, ScrollView, Text } from 'native-base'
import React, { useState } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { store } from '../../redux/store';
import { putServices } from '../../utils/hooks/services';
import { updateUserdata } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage } from '../../redux/actions/message';
import Alert from "../../components/alert/Alert";

function ChangePassword({route, navigation}) {
  const userdata = useSelector((state: any) => state.user.userdata)
  const [form, setForm] = useState({password: '', newpassword: ''})
  const [repeatPassword, setRepeatPassword] = useState('')
  const dispatch = useDispatch()

  const [alert, setAlert] = React.useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const sendForm = () => {
    if (form.newpassword === repeatPassword) {
      putServices(`auth/update/${userdata.id}`, form).then(({data}:any) => {
        store.dispatch(updateUserdata(data))
        dispatch(updateMessage({body: 'Contraseña Guardada con Exito!', open: true, type: 'success'}))
     /*    showAlert('success', 'Contraseña Guardada con éxito!') */
      }).catch(err =>  dispatch(updateMessage({body: 'Asegurese de haber escrito correctamente su contraseña', open: true, type: 'danger'})) )
    } else {
      dispatch(updateMessage({body: 'Asegurate que las contraseñas coincidan' , open: true, type: 'danger'}))
  /*   showAlert('warning', 'Asegurate que las contraseñas coincidan') */
    }
  }

  return (
    <ScrollView>
                  {alert && (
        <Alert type={alert.type} message={alert.message} closeAlert={closeAlert} />
      )}
      <Box mx={6}>
        <Box my={7}>
          <Box w={'100%'} mb={'7'} alignItems={'left'}>
            <Text fontSize={18} mb='2' color="brand.primary" fontWeight={'600'} fontFamily={'Poppins'}>Contraseña anterior</Text>
            <Input value={form.password} onChangeText={(text) => setForm({...form, password: text})} fontSize={'18'} bg={'#c4c4c41a'}  px={'2'} fontFamily={'Poppins'} rightElement={<IconButton
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
						/>} placeholder={'Contraseña'} />
          </Box>

          <Box mb={'7'} alignItems={'left'}>
            <Text fontSize={18} mb='2' color="brand.primary" fontWeight={'600'}  fontFamily={'Poppins'}>Contraseña nueva</Text>
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
						/>}  value={form.newpassword} onChangeText={(text) => setForm({...form, newpassword: text})} fontSize={'18'} bg={'#c4c4c41a'} px={'2'} fontFamily={'Poppins'} placeholder={'Nueva contraseña'} />
          </Box>

          <Box mb={'7'} alignItems={'left'}>
            <Text fontSize={18} mb='2' color="brand.primary" fontWeight={'600'}  fontFamily={'Poppins'}>Confirmar contraseña</Text>
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
						/>}  value={repeatPassword} onChangeText={(text) => setRepeatPassword(text)}  fontSize={'18'} bg={'#c4c4c41a'} px={'2'} fontFamily={'Poppins'} placeholder={'Nueva contraseña'} />
          </Box>
        </Box>

            <Button
              onPress={() => sendForm()}
              _pressed={{bgColor:'rgba(218, 103, 58, .5)'}}
              _text={{ fontSize: 14, fontWeight: '600', textAlign:'center' }} 
              isDisabled={!(form.newpassword.length > 0 && form.password.length > 0)}                          
              bg={"#DA673A"}
              // w="90%"
              py={5}
              color={'white'}
              px={'50px'}
              rounded={8}
            >
              Guardar
            </Button>
        
        <Box mt='6' mb={24} marginX='auto'>
          <TouchableOpacity onPress={() => navigation.navigate('RecoveryPassword')}>
            <Text color="brand.primary" fontWeight={'500'}>Uy, no me acuerdo la contraseña</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </ScrollView>
  )
}

export default ChangePassword