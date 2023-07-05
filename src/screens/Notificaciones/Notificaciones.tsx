import { Avatar, Box, FlatList, HStack, Icon, IconButton, Input, ScrollView, Spacer, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { store } from '../../redux/store';
import { putServices, getServices } from '../../utils/hooks/services';
import { updateUserdata } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage } from '../../redux/actions/message';
import { useEffect } from 'react';
interface Notification {
  body: string;
  date: string;
  datetime: number;
  image: string;
}
function Notificaciones({route, navigation}) {
  const userdata = useSelector((state: any) => state.user.userdata)
  const [notifications, setNotifications] = useState<any>([])
  const getDataNotifications = async () => {
    getServices('general-notification/user').then((res: any) => {
      setNotifications(res.data);
      console.log(res.data)
    })
  }
  useEffect(()=>{
    getDataNotifications();
  },[])

  return (
    <Box w={'100%'}>
      <Box  mx={"3.5%"}  alignItems={'center'}>
        <Box  width={'100%'} >
        <FlatList data={notifications} renderItem={({
      item
    } : {item : Notification}) => <Box borderBottomWidth="0" _dark={{
      borderColor: "muted.50"
    }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "3"]} py="2">
            <HStack space={[4, 3]} justifyContent="space-between">
              <Avatar size="60px" source={require('../../../assets/icons/new_notificaciones.png')} />
              <VStack width={'85%'} pr={2}>
                <Text  color="black">
                  {item.body}{" "}<Text fontSize="xs"  color="#A8A8A8" alignSelf="flex-start">
                {item.date}
              </Text>
                </Text>
                
              </VStack>
              
            </HStack>
          </Box>} contentContainerStyle={{paddingBottom:220}} keyExtractor={item => item.datetime.toString()} />
        </Box>
      </Box>
    </Box>
  )
}

export default Notificaciones