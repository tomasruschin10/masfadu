import { Box, Button, Text } from "native-base";
import * as React from "react";
import Container from "../../components/Container";
import { NoHeader } from "../../components/Header";

interface WelcomeProps {
    redirect: () => void,
    title: string
    buttonText: string
}

const WelcomePage:React.FC<WelcomeProps> = ({redirect, title, buttonText}) => {
  return (
    <Container>
		<NoHeader />
			<Box flex={1} mt={-5} justifyContent={'space-between'} alignItems="center">
                <Box
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                h='80%'
                >
                    <Text 
                    mt='2'
                    mx={4} 
                    fontSize={'4xl'} 
                    fontWeight={500}
                    color={'#9A9A9A'} 
                    textAlign='center'
                    >
                        Bienvenido a
                    </Text>
                    <Text 
                    mt='2'
                    mb={8}
                    mx={4} 
                    fontSize={'4xl'} 
                    fontWeight={500}
                    color={'#9A9A9A'} 
                    textAlign='center'
                    >
                        {title}
                    </Text>
                </Box>
				<Button 
				_pressed={{bgColor:'rgba(218, 103, 58, .5)'}}
				_text={{ fontSize: 14, fontWeight: '600' }}                            
				bg="brand.primary"
				mb={3} 
				w="90%"
				py={5}
				rounded={8}
                onPress={redirect}
				>
					{buttonText}
				</Button>
			</Box>
	</Container>
  )
}

export default WelcomePage
