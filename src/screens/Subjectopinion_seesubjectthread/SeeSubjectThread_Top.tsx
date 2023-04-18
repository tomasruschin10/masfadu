import { Avatar, Box, Text, HStack } from "native-base";
import React from "react";

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
}) {
  return (
    <HStack rounded="3xl" bg="white" p={4} shadow={2} my={1} mx={5} space={3}>
      <Box>
        <Box
          rounded={"md"}
          alignItems={"center"}
          justifyContent={"center"}
          w={52}
          h={50}
        >
          <Avatar
            h={"100%"}
            rounded={5}
            _text={{
              fontSize: 30 / firstLetter.length + firstLetter.length * 1.5,
            }}
            fontFamily="SourceSansPro_400Regular"
            fontSize={40}
            bg={color}
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
      <Box style={{ flex: 1, justifyContent: "center" }}>
        <Text fontSize={13} fontWeight={"500"}>
          {title}
        </Text>
        {/* <Text fontFamily={'SourceSansPro_400Regular'} numberOfLines={2} fontWeight={'bold'}>{text}</Text> */}
        {/* <Text fontFamily={'SourceSansPro_400Regular'} numberOfLines={2} fontSize={7.89}>{time} {hours} {method}</Text> */}
        {time && (
          <Text
            fontFamily={"SourceSansPro_400Regular"}
            numberOfLines={2}
            fontSize={12}
          >
            {time}
          </Text>
        )}
      </Box>
    </HStack>
  );
}

export default SeeSubjectThread_Top;
