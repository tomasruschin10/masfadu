import { Box, Button, Icon, Input, Text } from 'native-base'
import React, { useState } from 'react'
import Container from '../../components/Container'
import { Fontisto, MaterialIcons } from '@expo/vector-icons';
import { HeaderBack } from '../../components/Header';
import { putServices } from '../../utils/hooks/services';
import { updateMessage } from '../../redux/actions/message';
import { useDispatch } from 'react-redux';

function NewPassword({route, navigation}) {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setform] = useState({password: "", repeat_password: ""})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {id} = route.params
    
    const updatePassword = () => {
        if (form.password === form.repeat_password) {
            setLoading(true);
            putServices(`auth/update-password/${id}`, form, 'application/json').then(({status}: any) => {
                status === 200 && navigation.navigate('UpdatedPassword')
            }).catch(err => {
                dispatch(updateMessage({body: 'Hubo un error al cambiar la contraseña, intentalo nuevamente', open: true, type: 'danger'}))
            }).finally(() =>{
                setLoading(false)
            })
        } else {
            dispatch(updateMessage({body: 'Asegurate que las contraseñas coincidan', open: true, type: 'danger'}))
        }
    }
    
    return (
        <Container>
            <HeaderBack />
            
            <Box h={'85%'} alignItems={'center'} justifyContent={'center'} mx={5}>
                <Fontisto name="locked" size={30} color="#3A71E1" />
                <Text fontSize={22.78} fontWeight={700} w={'50%'} textAlign={'center'} my={5}>Nueva contraseña</Text>

                <Input
                    fontSize={16} 
                    placeholder='Nueva contraseña'
                    value={form.password} 
                    onChangeText={(text)=> setform({...form, password: text})}
                    mb={4}
                    type={showPassword ? "text" : "password"}
                    InputRightElement={ <Icon
                        as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} /> }
                        size={5}
                        mr="2"
                        color="muted.400"
                        onPress={() => setShowPassword(!showPassword)}
                    />}
                />

                <Input
                    fontSize={16} 
                    placeholder='Repetir contraseña'
                    value={form.repeat_password} 
                    onChangeText={(text)=> setform({...form, repeat_password: text})}
                    mb={4}
                    type={showPassword ? "text" : "password"}
                    InputRightElement={ <Icon
                        as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} /> }
                        size={5}
                        mr="2"
                        color="muted.400"
                        onPress={() => setShowPassword(!showPassword)}
                    />}
                />

                <Button isLoading={loading} py={4} onPress={() => updatePassword()} mb={3} w="100%">Actualizar</Button>
            </Box>
        </Container>
    )
}

export default NewPassword