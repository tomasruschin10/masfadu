import {
  Avatar,
  Box,
  FlatList,
  HStack,
  ScrollView,
  Text,
  VStack,
  Pressable
} from "native-base";
import React, { useState } from "react";

import { useEffect } from "react";
import Layout from "../../utils/LayoutHeader&BottomTab";
import Container from "../../components/Container";
import { getServices } from "../../utils/hooks/services";
interface Notification {
  body: string;
  value: boolean,
  title: string,
  opinionsCount: number,
  id: number,
  date: string;
  datetime: number;
  image: string;
}
function Notificaciones({ route, navigation }) {
  const [notifications, setNotifications] = useState<any>([]);
  const getDataNotifications = async () => {
    getServices("general-notification/user").then((res: any) => {
      setNotifications(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    getDataNotifications();
  }, []);

  return (
    <Container>
      <Layout route={route} navigation={navigation} title={`Notificaciones`}>
        <ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps={"handled"}
        >
          <Box mx={"3.5%"} alignItems={"center"}>
            <Box width={"100%"}>
              <FlatList
                data={notifications}
                renderItem={({ item }: { item: Notification }) => (
                  <Pressable
                    onPress={() => {
                      navigation.navigate('SeeSubjectThread', {
                        value: item?.value ? false : true,
                        subject_id: item.id,
                        title: item.title,
                        rating: item.opinionsCount
                      })
                    }}
                  >
                    <Box
                      borderBottomWidth="0"
                      _dark={{ borderColor: "muted.50" }}
                      borderColor="muted.800"
                      pl={["0", "4"]}
                      pr={["0", "3"]}
                      py="2"
                    >
                      <HStack
                        space={[4, 3]}
                        justifyContent="space-between"
                        alignItems={"center"}
                      >
                        <Avatar
                          size="60px"
                          bg={"transparent"}
                          source={require("../../../assets/icons/new_notificaciones_new.png")}
                        />
                        <VStack width={"85%"} pr={2}>
                          <Text color="black">{item.body}</Text>
                          <Text
                            fontSize="xs"
                            color="#A8A8A8"
                            alignSelf="flex-start"
                          >
                            {item.date}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </Pressable>
                )}
                contentContainerStyle={{ paddingBottom: 220 }}
                keyExtractor={(item) => item.datetime.toString()}
              />
            </Box>
          </Box>
        </ScrollView>
      </Layout>
    </Container>
  );
}

export default Notificaciones;
