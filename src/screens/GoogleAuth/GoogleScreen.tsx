import { Box, Button, Text } from "native-base";
import * as React from "react";
import {HeaderBack} from '../../components/Header';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, signInAnonymously, signInWithCredential,FacebookAuthProvider,GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';
import { API_URL } from "../../utils/env";
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage } from '../../redux/actions/message';
import LoaderFull from "../../components/LoaderFull";
import { updatetoken } from '../../redux/actions/token';
import { updateUserdata } from "../../redux/actions/user";
import jwtDecode from "jwt-decode";
import { baseApi } from '../../utils/api';

function GoogleScreen({navigation}) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState(false)
  const { uid } = useSelector((state: any) => state.user)



  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '58870024888-9kjr3cuc1ol7e9okdcrvmtrl3jap2e9d.apps.googleusercontent.com',
      responseType: "id_token",
      expoClientId: "58870024888-jltdo7pnna5a43nm8f6lueg8k93ikona.apps.googleusercontent.com",
      },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      setIsLoading(true)

      const { id_token } = response.params;
      console.log("🚀 ~ file: GoogleScreen.tsx ~ line 35 ~ React.useEffect ~ response", response)
      
      const auth = getAuth();
      console.log("🚀 ~ file: GoogleScreen.tsx ~ line 38 ~ React.useEffect ~ auth", auth)
      try {
        
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential).then(async res => {
                // console.log('user',user)
    
                let user = res.user
                
              const newUser = {
                userOrEmail: user?.email,
                password: user?.uid,
              }
              await baseApi.post(`/auth/login`,newUser,{}).then((us)=>{
                console.log("🚀 ~ file: GoogleScreen.tsx ~ line 51 ~ signInWithCredential ~ us", us)
 
                  dispatch(updatetoken(us.data.token))
                  dispatch(updateMessage({body: 'Inicio correcto. ', open: true,type: 'success'}))
                  setIsLoading(false);
                  const dataa = jwtDecode(us.data.token)
                  dispatch(updateUserdata(dataa))
                  navigation.reset({routes: [{name: 'SplashScreen'}], index: 0});
                
              }).catch((err) => {
                if(err.response.status === 401){
                  setIsLoading(false)
                  dispatch(updateMessage({body: 'Su usuario no existe en nuestro banco de datos. ', open: true,type: 'danger'}))
                }else{
                  setIsLoading(false);
                  dispatch(updateMessage({body: 'Ups Algo salio mal, porfavor vuelva a intentar. ', open: true,type: 'danger'}))
  
                }

              }).finally(()=>{
                setIsLoading(false)

              })
              
              

              }).catch(err => {
                
              console.log("🚀 ~ file: LoginScreen.tsx ~ line 193 ~ signInWithCredential ~ err", err)
                setIsLoading(false);
                dispatch(updateMessage({body: 'Ups Algo salio mal, porfavor vuelva a intentar. ', open: true,type: 'danger'}))
    
    
              })  
      } catch (error) {
        console.log("🚀 ~ file: LoginScreen.tsx ~ line 176 ~ newPromise ~ error", error)
        setIsLoading(false)

      }
        
      
    }else{
      setIsLoading(false)
    }
  }, [response]);
  const LoginGoogle = async () => {
    await promptAsync().finally(()=>{
      setIsLoading(true)
      if (response?.type === 'success') {
        const { id_token } = response.params;
        
        const auth = getAuth();
        try {
          const credential = GoogleAuthProvider.credential(id_token);
          signInWithCredential(auth, credential).then(async res => {
                  // console.log('user',user)
      
                  let user = res.user
                  
                const newUser = {
                  userOrEmail: user?.email,
                  password: user?.uid,
                }
                await baseApi.post(`/auth/login`,newUser,{}).then((us)=>{
                  console.log("🚀 ~ file: GoogleScreen.tsx ~ line 51 ~ signInWithCredential ~ us", us)
   
                    dispatch(updatetoken(us.data.token))
                    dispatch(updateMessage({body: 'Inicio correcto. ', open: true,type: 'success'}))
                    setIsLoading(false);
                    const dataa = jwtDecode(us.data.token)
                    dispatch(updateUserdata(dataa))
                    navigation.reset({routes: [{name: 'SplashScreen'}], index: 0});
                  
                }).catch((err) => {
                  if(err.response.status === 401){
                    setIsLoading(false)
                    dispatch(updateMessage({body: 'Su usuario no existe en nuestro banco de datos. ', open: true,type: 'danger'}))
                  }else{
                    setIsLoading(false);
                    dispatch(updateMessage({body: 'Ups Algo salio mal, porfavor vuelva a intentar. ', open: true,type: 'danger'}))
    
                  }
  
                }).finally(()=>{
                  setIsLoading(false)
  
                })
                
      
                }).catch(err => {
                console.log("🚀 ~ file: LoginScreen.tsx ~ line 193 ~ signInWithCredential ~ err", err)
                  setIsLoading(false);
                  dispatch(updateMessage({body: 'Ups Algo salio mal, porfavor vuelva a intentar. ', open: true,type: 'danger'}))
      
      
                })  
        } catch (error) {
          console.log("🚀 ~ file: LoginScreen.tsx ~ line 176 ~ newPromise ~ error", error)
          setIsLoading(false)

        }
          
        
      }else{
        setIsLoading(false)
      }
    })
  }



  return (
    <Box justifyContent={'center'} alignContent={'center'}>
      <HeaderBack title='Google Login' />
      {isLoading && (
        <LoaderFull/>
      )}
      <Box justifyContent={'center'} alignContent={'center'} p={5} w="100%">
        <Button _text={{color:'white'}} onPress={()=>LoginGoogle()}>
          Iniciar Sesión con Google
        </Button>
      </Box>
    </Box>
  );
}

export default React.memo(GoogleScreen);
