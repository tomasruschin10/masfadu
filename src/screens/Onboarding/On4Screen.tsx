import { Box, Button, Icon, IconButton, Image, Text } from "native-base";
import * as React from "react";
import Container from "../../components/Container";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons, FontAwesome5, Entypo } from "@expo/vector-icons";
import { moderateScale } from "../../utils/media.screens";
import { MaterialIcons } from '@expo/vector-icons';
import { fontStyles } from "../../utils/colors/fontColors";

const On4Screen = ({navigation}) => {
  const [step, setStep] = React.useState<number>(0)
  const [pageWidth, setPageWidth] = React.useState<number>(0)
    const redirect = () => {
        navigation.navigate('Home')
    }

    const screens = [
      {
        title:'MATERIAS',
        text: 'Agregá tus notas, confirmá qué materias cursar según correlativas y calculá tu promedio.',
        image:<Image
        w={100}
        mb={5}
        h={100}
        alt="Logo de Fadu"
        source={require('../../../assets/onboarding/materias.png')}
        />,
        showBg: false,
        buttonText:'Continuar',
        action: () => setStep(1)
      },
      {
        title:'OPINIONES',
        text: 'Hablemos de las cátedras, materias, profesores y lo que querramos. Sin faltar el respeto :)',
        image:<Image
        w={100}
        mb={5}
        h={100}
        alt="Logo de Fadu"
        source={require('../../../assets/onboarding/opiniones.png')}
        />,
        showBg: true,
        buttonText:'Continuar',
        action: () => setStep(2)
      },
      {
        title:'MERCADO',
        text: 'Si te olvidaste, encontraste algo en Fadu, querés donar resumenes, libros o apuntes, es por acá!',
        image:<Image
        w={50}
        mb={5}
        h={100}
        alt="Logo de Fadu"
        source={require('../../../assets/onboarding/mercado.png')}
        />,
        showBg: false,
        buttonText:'Finalizar',
        action: () => redirect()
      },
    ]

    const handleOnboarding = (positionX: number) => {
      if((positionX) > (pageWidth/2)) {
        screens[step].action()
      } else {
        if(step > 0){
          setStep(step - 1)
        }
      }
    }
  
    const handleWidth = (position: {width: number}) => {
      setPageWidth(position.width)
    }
  return (
    <Container>
			<Box 
      onLayout={(e) => handleWidth(e.nativeEvent.layout)}
      onTouchStart={(e) => handleOnboarding(e.nativeEvent.pageX)}
      flex={1} 
      mt={-5} 
      justifyContent={'space-between'}
      pb={14}
      mx={6}
      >
        {
          step < screens.length &&
            <Box 
            position={'absolute'} 
            right={-10} 
            top={7}
            zIndex={999}
            >
              <IconButton
                rounded="xl"
                icon={
                  <Icon
                    as={MaterialIcons}
                    name="navigate-next"
                    size={moderateScale(30)}
                    color='#CCC'
                  />
                }
              />
            </Box>
        }
        <Box 
        w={600}
        h={600}
        borderRadius={600}
        // bgColor={screens[step].showBg ? '#D7FF00' : '#ECF2FE'}
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
          // borderColor={screens[step].showBg ? '#D7FF00' : '#ECF2FE'}
          borderWidth={4}
          bgColor='#1E1E23'
          mt={6}
          h={140}
          w={140}
          borderRadius={140}
          mb={6}
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
        <Box
        display='flex'
        justifyContent='center'
        >
          <Text 
            fontSize={44} 
            fontWeight={600}
            color={'#333030'} 
            textAlign='center'
            mb={1}
            >
              {screens[step].title}
          </Text>
          <Box>
            <Text  
            textAlign='center'
            fontSize={20} 
            lineHeight={28}
            fontWeight={600}
            color={'#797979'} 
            marginX='auto'
            style={[
              fontStyles.poppins400
            ]}
            >
                {screens[step].text}
            </Text>
          </Box>
        </Box>
        </Box>
        <Box 
        mb={9}
        >
          <Box 
          display='flex' 
          justifyContent='space-between'
          flexDirection='row'
          mb={2}
          marginX={'auto'}
          w={'18%'}
          >
            {
              screens.map((screen, index) => (
                <Box 
                h={3}
                w={3}
                bg={step === index ? 'brand.primary' : '#D9D9D9'}
                borderRadius={10}
                // ml={2}
                />
              ))
            }
          </Box>
          {/* <Text 
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
          </Text> */}
        </Box>
				{/* <Button 
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
				</Button> */}
			</Box>
	  </Container>
  )
}

export default On4Screen
