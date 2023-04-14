import { Box, Button, Input, Text } from 'native-base'
import React, { useState } from 'react'
import Container from '../../components/Container'
import { HeaderBack } from '../../components/Header'
import { getServices } from '../../utils/hooks/services';
import { useDispatch } from 'react-redux';
import { updateMessage } from '../../redux/actions/message';

function ChooseAnOption({route, navigation}) {
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)
    const {email} = route.params
    const dispatch = useDispatch()

    const sendCode = () => {
        setLoading(true);
        getServices(`auth/delete-token?token=${token}`).then(({data}: any) => {
            navigation.navigate('NewPassword', {id: data.id})
        }).catch(err => {
            dispatch(updateMessage({body: 'Asegurate de haber escrito correctamente el código!', open: true, type: 'danger'}))
        }).finally(() =>{
            setLoading(false)
        })
    }

    return (
        <Container>
            <HeaderBack />

            <Box mx={5} mt={5}>
                <Text fontSize={22.78} fontWeight={'600'}>Elegí una opción</Text>
                <Text mb={5} fontSize={13}>Elegí una opción</Text>
                
                <Text fontSize={13}>
                    Introducí el código que te enviamos a <Text fontWeight={'bold'}>{email}</Text>
                </Text>
                
                <Text mb={3}>para recuperar la contraseña de tu cuenta de +Fadu!</Text>
                <Text>PD: No te olvides de revisar la carpeta de spam!</Text>
                
                <Input placeholder='EXUIA' autoCapitalize={'characters'} value={token} onChangeText={text => setToken(text)} maxLength={6} />
                <Button isLoading={loading} py={4} mt={10} onPress={() => sendCode()}>Enviar</Button>
            </Box>
        </Container>
    )
}

export default ChooseAnOption