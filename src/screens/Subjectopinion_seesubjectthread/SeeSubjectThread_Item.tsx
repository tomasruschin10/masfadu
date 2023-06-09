import { Avatar, Box, Text, HStack } from 'native-base';
import React from 'react'
import { TouchableHighlight } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons';

function SeeSubjectThread_Item({navigation, title, description, created_at, opinionTags, idOpinion, anonymous, student, answersCount, tags, professor}) {
  return (
    <TouchableHighlight underlayColor={''} onPress={() => navigation.navigate('OpinionThread', {anonymous: anonymous, student: student,title: title, description: description, created_at: created_at, opinionTags: opinionTags, idOpinion: idOpinion})}>
      <Box flexDir={'row'} bg={'#F4F6F9'} py='5' rounded={'2xl'} mb={5}>
        <Box mx='4'>
          {
            anonymous ? <FontAwesome name="user-secret" size={35} color="black" /> 
            :
            <Avatar bg="brand.primary" source={{ uri: student.image?.url, }} size="md"></Avatar>
          }
        </Box>

        <Box bg={'#F4F6F9'} flex={1}>
          <Text fontWeight={'700'} fontSize={13} numberOfLines={3}>{title}</Text>
          <Text color='#09101D' fontSize={10} numberOfLines={4}>{description}</Text>
          <Text mt={1} fontSize={10} color='#9A9A9A'>{answersCount} respuestas   {created_at.substring(0, 10)}</Text>
          
          <HStack>
            {
              tags.length ? tags.map(tag => (
                <Text mt={1} fontSize={10} color='#9A9A9A'>#{tag.tag.name} {' '}</Text>
              ))
              :
              <Text display={'none'}></Text>
            }
          </HStack>
          
          { professor ? <Text fontSize={10}>{'Cátedra : ' + professor}</Text>: <Text display={'none'}></Text>}
        </Box>

        <Box ml='3' mr='5'>
          <Ionicons name="arrow-forward-circle" size={35} color="#2972FE" />
        </Box>
      </Box>
    </TouchableHighlight>
  )
}

export default SeeSubjectThread_Item