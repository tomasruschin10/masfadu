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
import Container from '../../components/Container';
import { Octicons } from '@expo/vector-icons';

function ChangePassword({route, navigation}) {
  const userdata = useSelector((state: any) => state.user.userdata)
  const [form, setForm] = useState({password: '', newpassword: ''})
  const [repeatPassword, setRepeatPassword] = useState('')
  const dispatch = useDispatch()

  const [alert, setAlert] = React.useState(null);
  const [oldPasswordDisabled, setOldPasswordDisabled] = useState<boolean>(true)
  const [newPasswordDisabled, setNewPasswordDisabled] = useState<boolean>(true)
  const [confirmdDisabled, setConfirmDisabled] = useState<boolean>(true)

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
    <Container>
      {alert && (
        <Alert type={alert.type} message={alert.message} closeAlert={closeAlert} />
      )}
      <Box       
      px={4}
      flex={1}
      justifyContent={'space-between'}
      pb={70}
      >
        <Box my={7}>
          <Box w={'100%'} mb={'7'} alignItems={'left'}>
            <Text fontSize={18} mb='2' color="brand.darkText" fontWeight={'600'} fontFamily={'Poppins'}>Contraseña anterior</Text>
            <Input 
            isDisabled={oldPasswordDisabled}
            value={form.password} 
            rounded={8}
            onChangeText={(text) => setForm({...form, password: text})} 
            fontSize={16} 
            bg={'#c4c4c41a'}  
            px={5}
            py={3}
            fontFamily={'Poppins'} 
            placeholder={'Contraseña'} />
            <IconButton
                  position={'absolute'}
                  right={0}
                  top={'50%'}
            onPress={() => setOldPasswordDisabled(!oldPasswordDisabled)}
            mr={2}
							icon={
								<Octicons name="pencil" size={16} color="#DA673A" />
							}
							bgColor={"#FBF0EB"}
							rounded='full'
							size={8}
						/>
          </Box>

          <Box mb={'7'} alignItems={'left'}>
            <Text fontSize={18} mb='2' color="brand.darkText" fontWeight={'600'}  fontFamily={'Poppins'}>Contraseña nueva</Text>
            <Input 
            isDisabled={newPasswordDisabled}  
            value={form.newpassword} 
            onChangeText={(text) => setForm({...form, newpassword: text})} 
            fontSize={16} 
            bg={'#c4c4c41a'} 
            px={5}
            py={3}
            fontFamily={'Poppins'} 
            placeholder={'Nueva contraseña'}
            rounded={8}
             />
             <IconButton
              position={'absolute'}
              right={0}
              top={'50%'}
             onPress={() => setNewPasswordDisabled(!newPasswordDisabled)}
             mr={2}
               icon={<Octicons name="pencil" size={16} color="#DA673A" />}
               bgColor={"#FBF0EB"}
               rounded='full'
               size={8}
             />
          </Box>

          <Box mb={'7'} alignItems={'left'}>
            <Text fontSize={18} mb='2' color="brand.darkText" fontWeight={'600'}  fontFamily={'Poppins'}>Confirmar contraseña</Text>
            <Input
            isDisabled={confirmdDisabled} 
            value={repeatPassword} 
            onChangeText={(text) => setRepeatPassword(text)}  
            fontSize={16} 
            bg={'#c4c4c41a'} 
            px={5}
            py={3}
            fontFamily={'Poppins'} 
            placeholder={'Nueva contraseña'}
            rounded={8} 
            />
            <IconButton
            position={'absolute'}
            right={0}
            top={'50%'}
            onPress={() => setConfirmDisabled(!confirmdDisabled)}
            on
            mr={2}
							icon={<Octicons name="pencil" size={16} color="#DA673A" />}
							bgColor={"#FBF0EB"}
							rounded='full'
							size={8}
						/>
          </Box>
        </Box>        
        
        <Box mt='6' mb={24} marginX='auto'>
          <TouchableOpacity onPress={() => navigation.navigate('RecoveryPassword')}>
            <Text color="brand.primary" fontWeight={'500'}>Uy, no me acuerdo la contraseña</Text>
          </TouchableOpacity>
        </Box>

        <Button
          mb={10}
          onPress={() => sendForm()}
          _pressed={{bgColor:'rgba(218, 103, 58, .5)'}}
          _text={{ fontSize: 14, fontWeight: '600', textAlign:'center' }} 
          isDisabled={!(form.newpassword.length > 0 && form.password.length > 0)}                          
          bg={"#DA673A"}
          py={5}
          color={'white'}
          rounded={8}
        >
          Guardar
        </Button>
      </Box>
    </Container>
  )
}

export default ChangePassword