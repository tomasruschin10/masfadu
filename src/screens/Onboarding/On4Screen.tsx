import { Box, Button, Icon, IconButton, Image, Text } from "native-base";
import * as React from "react";
import Container from "../../components/Container";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { moderateScale } from "../../utils/media.screens";

const On4Screen = ({navigation}) => {
  const [step, setStep] = React.useState<number>(0)
    const redirect = () => {
        navigation.navigate('Home')
    }

    const screens = [
      {
        title:'Materias',
        text: 'Agregá tus notas, confirmá qué materias cursar según correlativas y calculá tu promedio.',
        image:<Image
        w={100}
        mb={5}
        h={100}
        alt="Logo de Fadu"
        source={require('../../../assets/onboarding/materias.jpg')}
        />,
        showBg: false,
        buttonText:'Continuar',
        action: () => setStep(1)
      },
      {
        title:'Opiniones',
        text: 'Hablemos de las cátedras, materias, profesores y lo que querramos. Sin faltar el respeto :)',
        image:<Image
        w={100}
        mb={5}
        h={100}
        alt="Logo de Fadu"
        source={require('../../../assets/onboarding/opiniones.jpg')}
        />,
        showBg: true,
        buttonText:'Continuar',
        action: () => setStep(2)
      },
      {
        title:'Mercado de Fadu',
        text: 'Si te olvidaste, encontraste algo en Fadu, querés donar resumenes, libros o apuntes, es por acá!',
        image:<Image
        w={100}
        mb={5}
        h={100}
        alt="Logo de Fadu"
        source={require('../../../assets/onboarding/mercado.jpg')}
        />,
        showBg: false,
        buttonText:'Finalizar',
        action: redirect
      },
    ]
  return (
    <Container>
			<Box 
      flex={1} 
      mt={-5} 
      justifyContent={'space-between'}
      pb={14}
      mx={6}
      >
        {
          step > 0 &&
            <Box 
            position={'absolute'} 
            // left={2} 
            top={10}
            zIndex={999}
            >
              <IconButton
              onPress={() =>setStep(step - 1)}
                rounded="xl"
                icon={
                  <Icon
                    as={Ionicons}
                    name="chevron-back"
                    size={moderateScale(25)}
                    color="black"
                  />
                }
              />
            </Box>
        }
        <Box 
        w={600}
        h={600}
        borderRadius={600}
        bgColor={screens[step].showBg ? '#D7FF00' : '#ECF2FE'}
        position='absolute'
        top={-300}
        left={-100}
        />
        <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        flex={1}
        >
          <Box 
          alignItems='center'
          justifyContent='center'
          borderColor={screens[step].showBg ? '#D7FF00' : '#ECF2FE'}
          borderWidth={4}
          bgColor='#1E1E23'
          mt={6}
          h={140}
          w={140}
          borderRadius={140}
          >
            {
              step === 0 &&
                <Image
                size={12}
                alt="Logo de Fadu"
                source={require('../../../assets/onboarding/materias.png')}
                />
            }
            {
              step === 1 &&
                <Image
                size={16}
                alt="Logo de Fadu"
                source={require('../../../assets/onboarding/opiniones.png')}
                />
            }
            {
              step === 2 &&
                <Image
                size={16}
                alt="Logo de Fadu"
                source={require('../../../assets/onboarding/mercado.png')}
                />
            }
          </Box>
        </Box>
        <Box 
        mb={9}
        >
          <Box 
          display='flex' 
          flexDirection='row'
          mb={2}
          >
            {
              screens.map((screen, index) => (
                <Box 
                h={2}
                w={2}
                bg={step === index ? 'brand.primary' : '#D9D9D9'}
                borderRadius={10}
                mr={2}
                />
              ))
            }
          </Box>
          <Text 
            fontSize={34} 
            fontWeight={600}
            color={'#333030'} 
            >
              {screens[step].title}
          </Text>
          <Text  
            fontSize={16} 
            lineHeight={28}
            fontWeight={500}
            color={'#797979'} 
            w={'80%'}
            >
              {screens[step].text}
          </Text>
        </Box>
				<Button 
        marginX='auto'
				_pressed={{bgColor:'rgba(218, 103, 58, .5)'}}
				_text={{ fontSize: 16, fontWeight: '500' }}                            
				bg="brand.primary"
				mb={12} 
				w="100%"
				py={5}
				rounded={8}
        onPress={screens[step].action}
				>
					{'Continuar'}
				</Button>
			</Box>
	  </Container>
  )
}

export default On4Screen
