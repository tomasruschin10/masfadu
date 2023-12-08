import { Box, Text, Image, Avatar, Pressable } from 'native-base';
import { StyleProp, TextStyle, TouchableHighlight } from 'react-native';
import { fontStyles } from '../colors/fontColors';

export const RenderItem = ({ title, id, setIdCopy, idCopy }) => (
  <TouchableHighlight underlayColor='white' onPress={() => setIdCopy(id)}>
    {
      id == idCopy ?
        <Box borderWidth={1} backgroundColor={'primary.100'} borderColor="primary.100" px="4" py="2" rounded={'full'} mx='1.5'>
          <Text color={'white'}>{title}</Text>
        </Box> :
        <Box borderWidth={1} backgroundColor={'white'} borderColor="primary.100" px="4" py="2" rounded={'full'} mx='1.5'>
          <Text color={'primary.100'}>{title}</Text>
        </Box>
    }
  </TouchableHighlight>
)

export const RenderOffer = ({ firstLetter, redirect_to, title, text, time, hours, method, rating, navigation, mainTitle, buttonValue, border, image, url, subject_id, id, name, phone, company }) => {
  return (
    <TouchableHighlight underlayColor='none' onPress={() => navigation.navigate(
      redirect_to, { mainTitle: mainTitle, image: image, title: title, buttonValue: buttonValue, url: url, description: text, time: time, hours: hours, method: method, subject_id: subject_id, id: id, partner: time, name, phone, company }
    )}
    >
      <Box mx='5' bg='white' py="4" flexDir={'row'} justifyContent="space-around" mb="2.5" rounded={8} borderColor={border ? '#EC5F5F' : 'white'} borderWidth="2">
        <Box flexDir={'row'} ml='4'>
          <Box mr='4' my={'auto'}>
            {
              image?.length > 0 ?
                <Image 
                source={{ uri: image }} 
                w={'12'} 
                h={'12'} 
                alt="logo" 
                borderRadius={8} 
                />
                :
                <Box rounded={'md'} alignItems={'center'} w={52.57} h={52.57} bg={"#0A968E"}>
                  <Text position={'absolute'} bottom={2} h={'100%'} fontSize={42.06} color={'white'} bold={true} fontFamily='SourceSansPro_400Regular'>{firstLetter}</Text>
                </Box>
            }
          </Box>
          <Box w="74%">
            <Text style={fontStyles.headingText} fontSize={15} numberOfLines={2}>{title}</Text>
            <Text style={fontStyles.bodyText} fontSize={12} numberOfLines={2}>{text}</Text>
            <Text style={fontStyles.bodyText} numberOfLines={2} fontWeight={'bold'} fontSize={10} mt={1}>{name}  {hours}  {method}</Text>
          </Box>
        </Box>
        <Box mr='4' alignItems={'flex-end'} justifyContent='center'>
          {/* <Text fontSize={15.86} color='primary.100' fontWeight="600">{rating}</Text> */}
        </Box>
      </Box>
    </TouchableHighlight>
  )
}

export const RenderOpinion = ({ color, title, text, time, hours, method, subject_id, id, firstLetter, redirect_to, rating, navigation, mainTitle, border }) => {
  return (
    <Pressable onPress={() => navigation.navigate(
      redirect_to, { mainTitle: mainTitle, title: title, description: text, time: time, hours: hours, method: method, subject_id: subject_id, id: id, rating: rating, color: color, firstLetter: firstLetter }
    )}
    >
      <Box style={{
        backgroundColor: "#fbfbfb",
        borderRadius: 8,
        // borderWidth: 0.5,
        elevation: 0,
      }} mx='5' bg='white' py={3.5} flexDir={'row'} justifyContent="space-around" mb="3" >
        <Box flexDir={'row'} ml='3'>
          <Box mr='4'>
            {
              <Box 
              rounded={8} 
              alignItems={'center'} 
              justifyContent={'center'} 
              w={60} 
              height={60} 
              >
                <Avatar 
                marginX={"auto"} 
                rounded={5} 
                _text={{ 
                  fontSize: (30 / firstLetter?.length) + (firstLetter?.length * 1.5), 
                  color:"#DA673A"
                }} 
                bg={"#FBF0EB"} 
                mr="1"
                >{firstLetter.toUpperCase()}
                </Avatar>
              </Box>
            }
          </Box>
          <Box w="70%" justifyContent={'center'} >
            <Text style={[fontStyles.poppins700, {
              fontSize: 14.5,
              marginBottom: 2,
              fontWeight:"bold",
              color:"#171717"
            }]} lineHeight={17} numberOfLines={2}>
              {title}
            </Text>
            {
              text ? <Text style={[fontStyles.bodyText, { color: "#939aa0", fontSize: 13, marginTop: 2 }]} fontWeight={'bold'}>{text}</Text> : null
            }
            {
              time ? <Text style={[fontStyles.poppins400, {    fontSize: 12, marginTop: 2 }]} numberOfLines={2} fontSize={10}>{time}</Text> : null
            }
          </Box>
        </Box>
        <Box mr='4' alignItems={'flex-end'} justifyContent='center'>
          <Text fontSize={16} style={(() => {
            delete fontStyles.manrope400["color"];
            return [[{ ...fontStyles.manrope300 }]]
          }) as StyleProp<TextStyle>} color={'#DA673A'} >{rating}</Text>
        </Box>
      </Box>
    </Pressable >
  )
} 