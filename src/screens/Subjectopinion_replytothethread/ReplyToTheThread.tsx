import React, { useState } from 'react'
import { Box, Button, ScrollView, Text, TextArea } from 'native-base'
import Container from '../../components/Container'
import Layout from '../../utils/LayoutHeader&BottomTab'
import { postServices } from '../../utils/hooks/services'
import { useDispatch } from 'react-redux';
import { updateMessage } from '../../redux/actions/message';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Alert from "../../components/alert/Alert";
function ReplyToTheThread({route, navigation}) {
  const dispatch = useDispatch()
  const {student, idOpinion, anonymous, title, description, created_at, opinionTags, value} = route.params
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({description: "", opinion_id: idOpinion})
	const {canGoBack, goBack} = useNavigation();

  const [alert, setAlert] = React.useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const postAnswer = () => {
    if (form.description.startsWith(' ')) {
/*       dispatch(updateMessage({body: 'La descripción no debe estar vacía, elimina los espacios del inicio!', open: true, type: "danger"})) */
showAlert('warning', 'La descripción no debe estar vacía, elimina los espacios del inicio!')
      return false
    }

    setLoading(true)
    postServices('opinion-answer/create', form).then(({data}:any) => {
      dispatch(updateMessage({body: 'Respuesta publicada correctamente', open: true, type: "success"}))
      navigation.navigate('OpinionThread', {
        value: value ? false : true,
        student: student, 
        idOpinion: idOpinion, 
        anonymous: anonymous, 
        title: title,
        description: description,
        created_at: created_at,
        opinionTags: opinionTags
      })
    }).catch((err)=> {
      if( err.message == 'Request failed with status code 404' ) {
        /* dispatch(updateMessage({body: 'Publicado Correctamente', open: true, type: "success"})) */
        showAlert('success', 'Publicado Correctamente')
        {canGoBack() && (goBack())}
      } else {
        /* dispatch(updateMessage({body: 'Error al publicar', open: true, type: "danger"})) */
        showAlert('error', 'Error al publicar')
      }
    }).finally(() => setLoading(false))
  }
  
  return (
    <Container>
            {alert && (
        <Alert type={alert.type} message={alert.message} closeAlert={closeAlert} />
      )}
      <Layout route={route} navigation={navigation} title={'Responder al hilo'}>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <Box mx={5} mt={5} borderTopWidth={1} borderTopColor={'#EBEEF2'}>
            <Text></Text>
            {anonymous ?
              <Text fontSize={15}>Vas a responder a un hilo <MaterialCommunityIcons name="incognito" size={24} color="black" /></Text> :
              <Text fontSize={15}>Vas a responderle a {student?.name} {student?.lastname}</Text>
            }
          </Box>

          <Box>
            <Box mx='5' borderBottomWidth={1} borderBottomColor={'#EBEEF2'} pt={6} pb={'12'}>
              <TextArea
                placeholder="Respondele a tu compañer@ en este tópico" 
                autoCompleteType={'off'}
                h={290}
                fontSize={15}
                backgroundColor={'#F7FAFC'}
                borderWidth={0}
                placeholderTextColor={'#C4C4C4'}
                onChangeText={text => setForm({...form, description: text})}
              />
            </Box>
            
            <Box mb={24} my={8} alignItems="center">
              <Button isDisabled={form.description ? false : true} isLoading={loading} onPress={postAnswer} w="90%" py={5} backgroundColor="blue.500">Enviar</Button>
            </Box>
          </Box>
        </ScrollView>
      </Layout>
    </Container>
  )
}

export default ReplyToTheThread