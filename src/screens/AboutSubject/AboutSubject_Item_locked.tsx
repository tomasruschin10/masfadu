import React from 'react'
import { Box, Text, HStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const AboutSubject_Item_locked = ({ name, setShowIcon }) => (
        <HStack mt='3' justifyContent={'space-between'}>
            <HStack alignItems={'center'} flex={1} bg={'#EBEEF2'} rounded={'xl'} px={3}>
                <Text color={'#C4C4C4'} fontSize={13} numberOfLines={2} bold={true}>{ name }</Text>
            </HStack>
            <Box alignItems={'center'} w={'53'} h={'56px'} bg={'#EBEEF2'} mx={'3'} rounded={'xl'} justifyContent={'center'}>
                <MaterialCommunityIcons name="message-text-outline" size={30} color="#CCCED1" />
            </Box>
            <TouchableOpacity onPressIn={() => setShowIcon(true)} onPressOut={() => setShowIcon(false)}>
                <Box alignItems={'center'} justifyContent={'center'} w={'53'} bg={'#EBEEF2'} rounded={'xl'} h={'56px'}>
                    <AntDesign name="warning" size={24} color="#C4C4C4" />
                </Box>
            </TouchableOpacity>
        </HStack>
)

export default AboutSubject_Item_locked