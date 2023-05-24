import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Box, Center, CheckIcon, Input, ScrollView, Select, Stack, Text } from 'native-base'
import { getServices, putServices } from '../../utils/hooks/services';
import { store } from '../../redux/store';
import { updateUserdata } from '../../redux/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { updateMessage } from '../../redux/actions/message';
import Alert from "../../components/alert/Alert";

function ChangeCareer({route, navigation}) {
  const userdata = useSelector((state: any) => state.user.userdata)
  const [selectCareer, setSelectCareer] = React.useState({career_id: null});
  const [career, setCareer] = React.useState([]);
  const dispatch = useDispatch()
  const [alert, setAlert] = React.useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  useEffect(() => {
		getServices('career/all').then(({data}: any) => {
      userdata.career ? setCareer(data.filter(items => items.id !== userdata.career.id)) : setCareer(data)
		}).catch(error => {
			if(__DEV__){
				console.log("🚀 ~ file: On2Screen.tsx ~ line 21 ~ getServices ~ error", error)
			}
		})
	},[setCareer])

  const sendForm = () => {
    if ( selectCareer.career_id ) {
        putServices(`auth/update/${userdata.id}`, selectCareer).then(({data}:any) => {
        store.dispatch(updateUserdata(data))
       /*  dispatch(updateMessage({body: 'Guardado con Exito!', open: true, type: 'success'})) */
       showAlert('success', 'Guardado con Exito!')
      }).catch(err =>  showAlert('error', 'Sucedió un error al Guardar su Carrera'))
    } else {
			/* dispatch(updateMessage({body: 'Por favor Seleccione una Carrera', open: true, type: 'danger'})) */
      showAlert('warning', 'Por favor seleccioná una carrera')
    }
  }

  return (
    <ScrollView>
        {alert && (
        <Alert type={alert.type} message={alert.message} closeAlert={closeAlert} />
      )}
      <Stack space={5} m={5}>
        <Box>
          <Text fontSize={18} mb='2' color={'#3A71E1'} fontWeight={'600'}  fontFamily={'Poppins'}>Carrera actual</Text>
          <Input isDisabled={true} value={userdata.career ? userdata.career.name : ''} fontSize={'18'} bg={'#c4c4c41a'} textAlign={'left'} px={'2'} fontFamily={'Poppins'} placeholder="Diseño Gráfico" />
        </Box>
        <Box>
          <Text fontSize={18} mb='2' color={'#3A71E1'} fontWeight={'600'}  textAlign={'left'} fontFamily={'Poppins'}>Cambiar carrera</Text>
          { career.length > 0 ?
            <Select 
              selectedValue={selectCareer.career_id} 
              minWidth="335" 
              accessibilityLabel="Choose Service" 
              placeholder="Choose Service" 
              _selectedItem={{ bg: "teal.600", endIcon: <CheckIcon size="5" />}} mt={1} 
              onValueChange={itemValue => setSelectCareer({...selectCareer, career_id: itemValue})}
              textAlign={'left'}
            >
              { career.map(item => <Select.Item label={item.name} value={item.id} key={item.id} />) }
            </Select>
            :
            <Select rounded={'3xl'} textAlign={'center'} isDisabled accessibilityLabel="Elegir carrera" placeholder="No hay mas carreras"></Select>
          }
        </Box>
        <Center>
          <TouchableOpacity onPress={() => sendForm()}>
            <Box flexDir={'row'} bg='blue.500' alignItems={'center'} borderRadius='2xl' p='2'>
              <Ionicons name="arrow-forward-circle" size={26} color="white" />
              <Text color='white' fontSize={14}>Cambiar carrera</Text>
            </Box>
          </TouchableOpacity>
        </Center>
      </Stack>
    </ScrollView>
  )
}

export default ChangeCareer