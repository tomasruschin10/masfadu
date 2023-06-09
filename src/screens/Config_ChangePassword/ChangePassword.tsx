import { Box, Icon, IconButton, Input, ScrollView, Text } from 'native-base'
import React, { useState } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { store } from '../../redux/store';
import { putServices } from '../../utils/hooks/services';
import { updateUserdata } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage } from '../../redux/actions/message';

function ChangePassword({route, navigation}) {
  const userdata = useSelector((state: any) => state.user.userdata)
  const [form, setForm] = useState({password: '', newpassword: ''})
  const [repeatPassword, setRepeatPassword] = useState('')
  const dispatch = useDispatch()

  const sendForm = () => {
    if (form.newpassword === repeatPassword) {
      putServices(`auth/update/${userdata.id}`, form).then(({data}:any) => {
        store.dispatch(updateUserdata(data))
        dispatch(updateMessage({body: 'Contraseña Guardada con Exito!', open: true, type: 'success'}))
      }).catch(err => dispatch(updateMessage({body: 'Asegurese de haber escrito correctamente su contraseña', open: true, type: 'danger'})))
    } else {
      dispatch(updateMessage({body: 'Asegurese de que las contraseñas coincidan', open: true, type: 'danger'}))
    }
  }

  return (
    <ScrollView>
      <Box alignItems={'center'}>
        <Box   mx={6} my={7}>
          <Box w={'100%'} mb={'7'} alignItems={'left'}>
            <Text fontSize={18} mb='2' color={'#C0C0C0'} fontWeight={'600'} fontFamily={'Poppins'}>Contraseña anterior</Text>
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
						/>} placeholder={'+5491164619938'} />
          </Box>

          <Box mb={'7'} alignItems={'left'}>
            <Text fontSize={18} mb='2' color={'#3A71E1'} fontWeight={'600'}  fontFamily={'Poppins'}>Contraseña nueva</Text>
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
						/>}  value={form.newpassword} onChangeText={(text) => setForm({...form, newpassword: text})} fontSize={'18'} bg={'#c4c4c41a'} px={'2'} fontFamily={'Poppins'} placeholder={'hola123'} />
          </Box>

          <Box mb={'7'} alignItems={'left'}>
            <Text fontSize={18} mb='2' color={'#3A71E1'} fontWeight={'600'}  fontFamily={'Poppins'}>Confirmar contraseña</Text>
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
						/>}  value={repeatPassword} onChangeText={(text) => setRepeatPassword(text)}  fontSize={'18'} bg={'#c4c4c41a'} px={'2'} fontFamily={'Poppins'} placeholder={'hola123'} />
          </Box>
        </Box>

        { form.newpassword.length > 0 && form.password.length > 0 ?
          <TouchableOpacity onPress={() => sendForm()}>
            <Box h={42} flexDir={'row'} bg='blue.500' alignItems={'center'} borderRadius='2xl' px='2'>
              <Ionicons name="arrow-forward-circle" size={26} color="white" />
              <Text color='white' fontSize={14}>Cambiar contraseña</Text>
            </Box>
          </TouchableOpacity>
          :
          <Box h={42} flexDir={'row'} bg='blue.200' alignItems={'center'} borderRadius='2xl' px='2'>
            <Ionicons name="arrow-forward-circle" size={26} color="white" />
            <Text color='white' fontSize={14}>Cambiar contraseña</Text>
          </Box>
        }
        
        <Box mt='6' mb={24}>
          <TouchableOpacity onPress={() => navigation.navigate('RecoveryPassword')}>
            <Text color='blue.500' fontWeight={'500'}>Uy, no me acuerdo la contraseña</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </ScrollView>
  )
}

export default ChangePassword