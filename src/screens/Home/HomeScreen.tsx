import { memo, useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { Box, HStack, Icon, IconButton, Image, Input, ScrollView, Text } from "native-base";
import {
  FlatList,
  Dimensions,
  TouchableOpacity,
  Platform,
  View,
} from "react-native";
import BottomTab from "../../components/BottomTab";
import Container from "../../components/Container";
import TitleSliders from "../../components/TitleSliders";
import { getServices, putServices } from "../../utils/hooks/services";
import { HeaderPerfil } from "../../components/Header";
import * as Notifications from "expo-notifications";
import * as React from "react";
import * as Device from "expo-device";
import { store } from "../../redux/store";
import { useIsFocused } from "@react-navigation/native";
import { useEventNavigation } from "../../context";
import Menu from "../Menu/Menu";
import { FontAwesome, AntDesign } from '@expo/vector-icons';


const handleError = (error) => {
  if (__DEV__) {
    console.log("Error:", error);
  }
};



function HomeScreen({ route, navigation }) {
  const isFocused = useIsFocused();

  const { setNavigationEvent } = useEventNavigation();

  React.useEffect(() => {
    if (isFocused) {
      setNavigationEvent("inicio");
    }
  }, [isFocused]);

  const [menuShow, setMenu] = useState(false);

  const [advertisement, setAdvertisement] = useState([]);
  const [textNews, setTextNews] = useState([]);
  const [offer, setOffer] = useState([]);
  const [offertTitle, setOffertTitle] = useState("...");
  const [courses, setCourses] = useState([]);
  const [career, setCareer] = useState([]);
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

  const { width, height } = Dimensions.get("window");
  const cardWidth = width * 0.35; // Ancho de cada tarjeta, ajustado al 35% del ancho total
  const cardHeight = height * 0.25; // alto de cada tarjeta, ajustado al 25% del alto total


  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] =
    React.useState<Notifications.Notification>();
  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();

  
  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("res", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      getServices("config/1")
        .then(({ data }: { data: Config }) => {
          setOffertTitle(data.value);
        })
        .catch(handleError);
    });
  }, []);

  useEffect(() => {
    getServices("notice/all")
      .then(({ data }: any) => {
        setTextNews(data);
      })
      .catch(handleError);

    getServices("advertisement/all/active?key=home")
      .then(({ data }: any) => {
        setAdvertisement(data);
      })
      .catch(handleError);

    getServices("offer/all")
      .then(({ data }: any) => {
        setOffer(data);
      })
      .catch(handleError);

    getServices("offer/all/course")
      .then(({ data }: any) => {
        setCourses(data);
      })
      .catch(handleError);

    getServices("resource/all/first")
      .then(({ data }: any) => {
        setCareer(data);
      })
      .catch(handleError);

  }, [setAdvertisement, setTextNews, setOffer, setCourses]);

  const renderTextNews = ({ item }) => (
    <Box
      w="100%"
      rounded={"md"}
      backgroundColor={"primary.200"}
      style={{ borderRadius: 8 }}
    >
      <Image
        source={{ uri: item.image.url }}
        alt={"TextNew"}
        w={"100%"}
        h={"90"}
        style={{ borderRadius: 8 }}
      />
      {/* <Text bold textAlign={"center"} color={"white"}>{ item.name }</Text> */}
    </Box>
  );
  const renderNews = ({ item }) => (
    <Box
      style={{
        width: 190,
        height: 190,
        borderRadius: 20,
        overflow: "hidden",
        marginVertical: 20,
        marginLeft: 10,
        marginBottom: 22,
      }}
      borderRadius={"2xl"}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("News", { url: item.url, image: item.image.url })
        }
        style={{ backgroundColor: "white", borderRadius: 30 }}
      >
        <Image
          borderRadius={"2xl"}
          resizeMode={"cover"}
          h={200}
          alt="news1"
          source={{ uri: item.image.url }}
        />
      </TouchableOpacity>
    </Box>
  );

  const renderCareer = ({ item }) => {
    const { title, description, url, image, partner, name } = item;
    item.subject.subjectId = item.subject.id
    console.log("AAA ", item.subject)
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("SubjectContent",  item.subject)}
        style={{
          width: cardWidth,
          maxWidth: cardWidth,
          height: cardHeight,
          minHeight: cardHeight,
          maxHeight: cardHeight,
          marginRight: 2,
          marginLeft: 10,
          marginTop: 10
        }}

      >
        <Box
          shadow={"0"}
          bgColor={"white"}
          borderRadius={15}
          maxWidth={cardWidth}
          height={cardHeight - 20}
          mb={5}
        >
          <Icon
            as={FontAwesome}
            size={"6xl"}
            color="red.400"
            mx={"auto"}
            my={"1/6"}
            name={
              image?.url.endsWith(".pdf")
                ? "file-pdf-o"
                : /\.(jpe?g|png|gif|bmp)$/i.test(image?.url)
                  ? "file-image-o"
                  : "file-o"
            }
          />
          <Box pt={1} pb={3} px={4} pl={2}>
            <Text
              style={{ fontSize: 16, marginTop: 8 }}
              fontWeight={700}
              fontFamily="Manrope"
              numberOfLines={2}
            >
              {name}
            </Text>
          </Box>
          </Box>
      </TouchableOpacity>);
    /*     return (
          <TouchableOpacity
            onPress={() => navigation.navigate("Subjects", item)}
            style={{
              width:cardWidth,
              maxWidth: cardWidth,
              height:cardHeight,
              minHeight: cardHeight,
              maxHeight: cardHeight,
              marginRight: 2,
              marginLeft: 10,
              marginTop: 10
            }}
            
          >
            <Box
              shadow={"0"}
              bgColor={"white"}
              borderRadius={15}
              maxWidth={cardWidth}
              height={cardHeight - 20}
              mb={5}
            >
              <Box borderRadius={15} overflow="hidden"
              >
                <Image
                  alt={"logo"}
                  style={{
                    width:cardWidth
                  }}
                  resizeMethod="scale"
                  h={125}
                  resizeMode="cover"
                  source={{ uri: image.url }}
                />
                <Box pt={1} pb={3} pl={2}>
                  <Text
                    style={{ fontSize: 16, marginTop: 8 }}
                    fontWeight={700}
                    fontFamily="Manrope"
                    numberOfLines={2}
                  >
                    {name}
                  </Text>
                </Box>
              </Box>
            </Box>
          </TouchableOpacity>
        ); */
  };


  const renderShop = ({ item }) => {
    const { title, description, url, image, partner } = item;
    console.log("ITEM <>0", item)
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("MarketDetail", item)}
        style={{
          width: cardWidth,
          marginRight: 2,
          marginLeft: 10,
          marginTop: 10,
          height: cardHeight,
          minHeight: cardHeight,
          maxHeight: cardHeight,
        }}
      >
        <Box
          shadow={"0"}
          bgColor={"white"}
          borderRadius={15}
          maxWidth={cardWidth}
          height={cardHeight}
          mb={5}
        >
          <Box borderRadius={15} overflow="hidden"
          >
            <Image
              alt={"logo"}
              style={{
                width: cardWidth
              }}
              resizeMethod="scale"
              h={125}
              resizeMode="cover"
              source={{ uri: image.url }}
            />
            <Box pt={1} px={2} pb={3}>
              <Text
                style={{ fontSize: 16, marginTop: 8 }}
                fontWeight={700}
                fontFamily="Manrope"
                numberOfLines={2}
              >
                {title}
              </Text>

              <Text
                fontWeight={700}
                fontFamily="Manrope"
                style={{ fontSize: 12, marginBottom: 4, color: "#bcbecc" }}
                numberOfLines={1}
                mt={1}
              >
                {partner?.name}
              </Text>

            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  const renderWorkShop = ({ item }) => {
    const { title, description, url, image, partner } = item;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Anoffer", { mainTitle: "Cursos & Workshops", title: item.title, url: item.url, description: item.description, id: item.id, partner: item.partner, image: item.image.url })}
        style={{
          width: cardWidth,
          maxWidth: cardWidth,
          height: cardHeight,
          minHeight: cardHeight,
          maxHeight: cardHeight,
          marginRight: 2,
          marginLeft: 10,
          marginTop: 10
        }}

      >
        <Box
          shadow={"0"}
          bgColor={"white"}
          borderRadius={15}
          maxWidth={cardWidth}
          height={cardHeight}
          mb={5}
        >
          <Box borderRadius={15} overflow="hidden"
          >
            <Image
              alt={"logo"}
              style={{
                width: cardWidth,
                maxWidth: cardWidth,
              }}

              resizeMethod="scale"
              h={125}
              resizeMode="cover"
              source={{ uri: image.url }}
            />
            <Box pt={1} px={2} pb={3} maxWidth={cardWidth}>
              <Text
                style={{ fontSize: 16, marginTop: 8 }}
                fontWeight={700}
                fontFamily="Manrope"
                numberOfLines={2}
              >
                {title}
              </Text>

              <Text
                fontWeight={700}
                fontFamily="Manrope"
                style={{ fontSize: 15, marginBottom: 4, color: "#bcbecc" }}
                numberOfLines={1}
                mt={1}
                fontSize={"sm"}
              >
                {partner?.name || " "}
              </Text>

            </Box>
          </Box>
        </Box>

      </TouchableOpacity>
    );
  };

  return (
    <Container>
      {menuShow ? (
        <Menu navigation={navigation} route={route} setMenu={setMenu} />
      ) : null}

      <HeaderPerfil
        showICon={true}
        statusBarColor="#e8eef4"
        barStyle="dark-content"
        navigation={navigation}
        style={{ marginTop: 10 }}
      />
      <ScrollView
        backgroundColor={"#e8eef3"}
        showsVerticalScrollIndicator={false}
      >
        <Box>
          {textNews.length > 0 ? (
            <Carousel
              autoplay={true}
              containerCustomStyle={{ marginTop: 10 }}
              data={textNews}
              itemWidth={ITEM_WIDTH}
              lockScrollWhileSnapping={true}
              loop={true}
              renderItem={renderTextNews}
              sliderWidth={SLIDER_WIDTH}
            />
          ) : (
            <Box
              alignSelf={"center"}
              w="94%"
              rounded={"md"}
              py={10}
              mt={4}
              backgroundColor={"primary.200"}
            >
              <Text bold textAlign={"center"} color={"white"}>
                No hay noticias para ver!
              </Text>
            </Box>
          )}
        </Box>

        <Box>
          {advertisement.length > 0 ? (
            <View>
              <FlatList
                data={advertisement}
                renderItem={renderNews}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ) : (
            <Box my={4} alignSelf={"center"} w={"94%"} flexDir="row" h={150}>
              <Box
                mr={1}
                flex={1}
                bg="primary.200"
                borderRadius={"2xl"}
                alignItems="center"
                justifyContent={"center"}
              >
                <Text
                  textAlign={"center"}
                  px={4}
                  fontWeight={"bold"}
                  color="white"
                >
                  No hay publicidad para mostrar
                </Text>
              </Box>
            </Box>
          )}
        </Box>

        <Box w={"100%"} flex={1} px={3} mb={32}>
          <HStack justifyContent={"space-between"} mb={5} mt={1}>
            {/* <TitleSliders
              navigateTo={"a"}
              title={"¿En qué aula cursó?"}
              to={null}
              more={false}
              navigation={navigation}
            /> */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#ffffff",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <View>
                <Text
                  fontWeight={"700"}
                  style={{
                    flex: 1,
                    // backgroundColor: "#b1b1b3",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 2,
                    marginTop: 4,
                    // fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  ¿En qué aula curso?
                </Text>
                <Text
                  style={{
                    flex: 1,
                    // backgroundColor: "#3A71E1",
                    alignItems: "center",
                    color: "#808990",
                    fontSize: 13,
                    padding: 2,
                    marginTop: 2,
                  }}
                >
                  ENCONTRA DONDE CURSAS
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("SearchCourse", {
                      title: "Buscar curso",
                      url: "https://aulas.fadu.uba.ar/aulas.php",
                    })
                  }
                >
                  <View
                    style={{
                      backgroundColor: "#EB5E29",
                      height: 24,
                      width: 118,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 11,
                        textAlign: "center",
                        marginTop: 1.5,
                      }}
                    >
                      Buscar
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </HStack>
        </Box>

        <View style={{ marginTop: -125, marginBottom: 80 }}>
          <TitleSliders
            navigateTo={"Offers"}
            title={offertTitle}
            to={null}
            navigation={navigation}
          />
          {offer.length > 0 ? (
            <FlatList
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ justifyContent: "space-between", paddingBottom: 20 }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={offer.slice(0, 3)}
              renderItem={renderShop}
            />
          ) : (
            <Box
              alignItems={"center"}
              justifyContent={"center"}
              h={"100"}
              _text={{ fontSize: 15 }}
            >
              No Hay Ofertas
            </Box>
          )}

          <TitleSliders
            navigateTo={"Coursesandworkshops"}
            title={"Cursos & Workshops"}
            to={null}
            navigation={navigation}
          />
          {courses.length > 0 ? (
            <FlatList
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ justifyContent: "space-between", paddingBottom: 20 }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={courses.slice(0, 3)}
              renderItem={renderWorkShop}
            />
          ) : (
            <Box
              alignItems={"center"}
              justifyContent={"center"}
              h={"100"}
              _text={{ fontSize: 15 }}
            >
              No Hay Cursos o Workshops
            </Box>
          )}

          <TitleSliders
            navigateTo={'Recursos y herramientas'}
            isSubsection={true}
            title={"Recursos y herramientas"}
            to={null}
            navigation={navigation}
          />
          {courses.length > 0 ? (
            <FlatList
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ justifyContent: "space-between" }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={career.slice(0, 3)}
              renderItem={renderCareer}
            />
          ) : (
            <Box
              alignItems={"center"}
              justifyContent={"center"}
              h={"100"}
              _text={{ fontSize: 15 }}
            >
              No Hay Carreras disponibles
            </Box>
          )}
        </View>
      </ScrollView>
      <BottomTab setMenu={setMenu} navigation={navigation} route={route} />
    </Container>
  );
}
async function registerForPushNotificationsAsync() {
  let token;
  const { user }: any = store.getState();

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    await putServices(`auth/update-device-token/${user.id}`, {
      token: token,
    });
  } else {
    // alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
export default memo(HomeScreen);
