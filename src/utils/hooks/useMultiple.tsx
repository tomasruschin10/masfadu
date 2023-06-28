import { Box, Text, Image, Avatar, Pressable } from 'native-base';
import { TouchableHighlight } from 'react-native';
import { fontStyles } from '../colors/fontColors';

export const RenderItem = ({title, id, setIdCopy, idCopy}) => (
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

export const RenderOffer = ({firstLetter, redirect_to, title, text, time, hours, method, rating, navigation, mainTitle, buttonValue, border, image, url, subject_id, id}) => {
  return (
    <TouchableHighlight underlayColor='white' onPress={() => navigation.navigate(
        redirect_to, {mainTitle: mainTitle, image: image, title: title, buttonValue: buttonValue, url: url, description: text, time: time, hours: hours, method: method, subject_id: subject_id, id: id, partner: time}
      )}
    >
      <Box shadow={2} mx='5' bg='white' py="4" flexDir={'row'} justifyContent="space-around" mb="5" rounded="2xl" borderColor={ border ? '#EC5F5F' : 'white'} borderWidth="2">
        <Box flexDir={'row'} ml='4'>
          <Box mr='4' my={'auto'}>
            {
              image?.length > 0 ?
              <Image source={{uri: image}} w={'12'} h={'12'} alt="logo" />
              :
              <Box rounded={'md'} alignItems={'center'} w={52.57} h={52.57} bg={"#0A968E"}>
                <Text position={'absolute'} bottom={2} h={'100%'} fontSize={42.06} color={'white'} bold={true} fontFamily='SourceSansPro_400Regular'>{firstLetter}</Text>
              </Box>
            }
          </Box>
          <Box w="74%">
            <Text fontFamily={'SourceSansPro_400Regular'} fontSize={15} numberOfLines={2} fontWeight={'bold'}>{title}</Text>
            <Text fontFamily={'SourceSansPro_400Regular'} fontSize={12} numberOfLines={2}>{text}</Text>
            <Text fontFamily={'SourceSansPro_400Regular'} numberOfLines={2} fontWeight={'bold'} fontSize={10} mt={1}>{time?.name}  {hours}  {method}</Text>
          </Box>
        </Box>
        <Box mr='4' alignItems={'flex-end'} justifyContent='center'>
          {/* <Text fontSize={15.86} color='primary.100' fontWeight="600">{rating}</Text> */}
        </Box>
      </Box>
    </TouchableHighlight>
  )
}

export const RenderOpinion = ({color, title, text, time, hours, method, subject_id, id, firstLetter, redirect_to, rating, navigation, mainTitle, border}) => {
  return (
    <Pressable onPress={() => navigation.navigate (
        redirect_to, {mainTitle: mainTitle, title: title, description: text, time: time, hours: hours, method: method, subject_id: subject_id, id: id, rating: rating, color: color, firstLetter: firstLetter}
      )}
    >
      <Box shadow={2} mx='5' bg='white' py={3} flexDir={'row'} justifyContent="space-around" mb="3" rounded="2xl" borderColor={ border ? '#EC5F5F' : 'white'} borderWidth="2">
        <Box flexDir={'row'} ml='3'>
          <Box mr='4'>
            {
              <Box rounded={'md'} alignItems={'center'} justifyContent={'center'} w={52} h={50}>
                <Avatar rounded={5}  _text={{fontSize: (30/firstLetter?.length)+(firstLetter?.length*1.5)}} bg={color} mr="1" >{firstLetter.toUpperCase()}</Avatar>
              </Box>
            }
          </Box>
          <Box w="64%" justifyContent={'center'}>
            <Text style={fontStyles.bodyText} fontSize={14} lineHeight={17} fontWeight={'bold'} numberOfLines={2}>{title}</Text>
            {
              text ? <Text style={fontStyles.bodyText} fontSize={9.64} fontWeight={'bold'}>{text}</Text> : null
            }
            {
              time ? <Text style={fontStyles.bodyText} numberOfLines={2} fontSize={10}>{time}</Text> : null
            }
          </Box>
        </Box>
        <Box mr='4' alignItems={'flex-end'} justifyContent='center'>
          <Text fontSize={16} style={fontStyles.bodyText} color='primary.100' fontWeight="600">{rating}</Text>
        </Box>
      </Box>
    </Pressable>
  )
} 