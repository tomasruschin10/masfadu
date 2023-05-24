import { Box, Icon, IconButton, Text } from "native-base";

export default function Sections({title, icon, iconType, comingSoon, navigation}) {
	return (
        <Box flex={1} alignItems={'center'}>
            <Box>
                { comingSoon ?
                    <IconButton 
                        backgroundColor={'#9A9A9A'} w={20} h={20}
                        borderRadius={40} icon={ 
                            <Icon as={iconType} name={icon} color={'#DADADA'} size={"3xl"} /> 
                        }
                    /> 
                    : title == '' ?
                    <IconButton 
                        w={20} h={20}
                        borderRadius={40} icon={ 
                            <Icon as={iconType} name={icon} color={'#DADADA'} size={"3xl"} /> 
                        }
                    />
                    :
                    <IconButton 
                        onPress={() => navigation.navigate('Subsections', { title: title })}
                        backgroundColor={'white'} w={20} h={20}
                        borderRadius={40} icon={ 
                            <Icon as={iconType} name={icon} color={"primary.100"} size={"3xl"} /> 
                        }
                    />
                }
                <Box position="absolute" backgroundColor="#64E889" rounded={'full'} bottom="30" left="0" right="0">
                    { comingSoon ?
                        <Text textAlign={'center'} fontSize={10}>Proximamente</Text>:
                        <Text display={ 'none'}></Text>
                    }
                </Box>
            </Box>
            
            <Box mt={.5} mb={1} mx={3}>
                <Text fontSize={12} numberOfLines={2}  textAlign={"center"}  color={comingSoon ? '#9A9A9A' : 'white'}>{title}</Text>
            </Box>
        </Box>
	);
}
