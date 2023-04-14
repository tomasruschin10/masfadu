import { Box, Button, Input, Text } from 'native-base'
import React, { useState } from 'react'
import { Fontisto } from '@expo/vector-icons';
import { HeaderBack } from '../../components/Header';
import Container from '../../components/Container';
import { postServices } from '../../utils/hooks/services';
import { useDispatch } from 'react-redux';
import { updateMessage } from '../../redux/actions/message';

function RecoveryPassword({route, navigation}) {
    const [form, setForm] = useState({email: ''})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const sendRecoveryPassword = () => {
        setLoading(true);
        postServices('auth/remember-password', form).then(({status}:any) => {
            status === 201 && navigation.navigate('ChooseAnOption', {email: form.email})
        }).catch(err => {
            dispatch(updateMessage({body: 'Verifica que el correo esté correctamente escrito', open: true, type: 'danger'}))
            if (__DEV__) {
                console.log(err)
            }
        }).finally(() =>{
            setLoading(false)
        })
    }
    
    return (
        <Container>
            <HeaderBack />
            
            <Box h={'85%'} alignItems={'center'} justifyContent={'center'} mx={5}>
                <Fontisto name="locked" size={30} color="#3A71E1" />
                <Text fontSize={22.78} fontWeight={700} w={'50%'} textAlign={'center'} my={5}>Recuperá tu contraseña</Text>
                <Input mb={4} value={form.email} onChangeText={(text)=> setForm({...form, email: text})} placeholder="Email" />
                <Button isLoading={loading} py={4} onPress={() => sendRecoveryPassword()} mb={3} w="100%" isDisabled={form.email.length > 0 ? false : true}>Enviar</Button>
            </Box>
        </Container>
    )
}

export default RecoveryPassword