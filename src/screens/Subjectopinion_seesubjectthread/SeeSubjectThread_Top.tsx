import { Avatar, Box, Text, HStack } from "native-base";
import React from "react";

import { fontStyles } from '../../utils/colors/fontColors';
import { StyleProp, TextStyle } from 'react-native';

function SeeSubjectThread_Top({
  title,
  text,
  time,
  hours,
  method,
  navigation,
  setToggle,
  toggle,
  fadeAnim,
  color,
  firstLetter,
  rating
}) {
  return (
    <HStack rounded="8" bg="white" p={4} my={1} mx={5} space={3}>
      <Box>
        <Box
          rounded={8}
          alignItems={"center"}
          justifyContent={"center"}
          w={52}
          h={50}
        >
          <Avatar
            h={"100%"}
            rounded={5}
            _text={{ 
              fontSize: (30 / firstLetter?.length) + (firstLetter?.length * 1.5), 
              color:"#DA673A"
            }} 
            fontFamily="SourceSansPro_400Regular"
            fontSize={40}
            bg={"#FBF0EB"}
            mr="1"
          >
            {firstLetter}
          </Avatar>
          {/* <Text lineHeight={52} fontSize={42} color={'white'} bold={true} fontFamily='SourceSansPro_400Regular'>
              {firstLetter.toUpperCase()}
            </Text> */}
        </Box>
        {/* <Box rounded={'md'} alignItems={'center'} w={52.57} h={52.57} >
          <Avatar position={'absolute'}  bottom={2} h={'100%'}  rounded={5} fontFamily='SourceSansPro_400Regular' fontSize={40} bg={color} mr="1" >{title.substring(0,1).toUpperCase()}</Avatar> */}
        {/* <Text position={'absolute'} bottom={2} h={'100%'} fontSize={42.06} color={'white'} bold={true} fontFamily='SourceSansPro_400Regular'>{title.substring(0,1)}</Text> */}
        {/* </Box> */}
      </Box>
      <Box style={[fontStyles.poppins700, { flex: 1, justifyContent: "center" }]}>
        <Text style={[fontStyles.poppins700]} fontSize={13} color={"#171717"}>
          {title}
        </Text>
        {/* <Text fontFamily={'SourceSansPro_400Regular'} numberOfLines={2} fontWeight={'bold'}>{text}</Text> */}
        {/* <Text fontFamily={'SourceSansPro_400Regular'} numberOfLines={2} fontSize={7.89}>{time} {hours} {method}</Text> */}
        {time && (
          <Text
            // fontFamily={"SourceSansPro_400Regular"}
            style={[fontStyles.poppins400]}
            numberOfLines={2}
            fontSize={12}
          >
            {time}
          </Text>
        )}
      </Box>
      <Box mr='2' alignItems={'flex-end'} justifyContent='center'>
          <Text fontSize={16} style={(() => {
            delete fontStyles.manrope400["color"];
            return [[{ ...fontStyles.manrope300 }]]
          }) as StyleProp<TextStyle>} color={'#DA673A'} >{rating}</Text>
        </Box>
    </HStack>
  );
}

export default SeeSubjectThread_Top;
