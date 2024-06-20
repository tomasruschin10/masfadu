import React, { memo, useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Dimensions,
  TouchableOpacity,
  Platform,
  View,
  PixelRatio,
} from "react-native";
import { Box, HStack, Icon, Image, ScrollView, Text } from "native-base";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { FontAwesome } from "@expo/vector-icons";

import BottomTab from "../../components/BottomTab";
import Container from "../../components/Container";
import { HeaderPerfil } from "../../components/Header";
import TitleSliders from "../../components/TitleSliders";
import DefaultButton from "../../components/DefaultButton";
import { getServices, putServices } from "../../utils/hooks/services";

import { store } from "../../redux/store";
import { useEventNavigation } from "../../context";
import Menu from "../Menu/Menu";
import { fontStyles } from "../../utils/colors/fontColors";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utils/media.screens";
import { useDispatch, useSelector } from "react-redux";
import ModalRestriction from "../modal/ModalRestriction";
import { updateModal } from "../../redux/actions/user";

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
  const [modalShow, setModalShow] = useState(false);

  const [advertisement, setAdvertisement] = useState([]);
  const [textNews, setTextNews] = useState([]);
  const [offer, setOffer] = useState([]);
  const [allOffers, setAllOffers] = useState([]);
  const [offertTitle, setOffertTitle] = useState("El Mercado de Fadu");
  const [courses, setCourses] = useState([]);
  const [career, setCareer] = useState([]);
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

  const { width, height } = Dimensions.get("window");
  const cardWidth = width * 0.41;
  const cardHeight = height * 0.27;
  const imageWidth = width + 0.14
  const imageHeight = height * 0.14;

  const user = useSelector((state: any) => state.user.userdata);

  useEffect(() => {
    return navigation.addListener("focus", () => {
      getServices("config/1")
        .then(({ data }: { data: Config }) => {
          setOffertTitle(data.value);
        })
        .catch(handleError);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
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

      getServices("offer-category/all")
        .then(({ data }: any) => {
          setOffer(data.map((obj) => obj.offers).flat());
        })
        .catch(handleError);

      getServices("offer/all/work")
        .then(({ data }: any) => {
          setAllOffers(data);
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
    }, [setAdvertisement, setTextNews, setOffer, setCourses])
  );

  const dispatch = useDispatch();
  const handleNavigate = (route: string, additional?: any) => {
    if (user?.userRole[0]?.role?.name === "Visit") {
      dispatch(updateModal(true));
      return;
    }
    navigation.navigate(route, additional);
  };

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
    const { image, name } = item;
    item.subject.subjectId = item.subject.id;
    return (
      <TouchableOpacity
        onPress={() => handleNavigate("SubjectContent", item.subject)}
        style={{
          width: cardWidth,
          maxWidth: cardWidth,
          height: cardHeight,
          minHeight: cardHeight,
          maxHeight: cardHeight,
          marginRight: 2,
          marginLeft: 10,
          marginTop: 10,
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
              style={[fontStyles.poppins400, { fontSize: 16, marginTop: 8 }]}
              fontWeight={700}
              numberOfLines={2}
            >
              {name}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  const renderOffer = ({ item }) => {
    const {
      title,
      description,
      url,
      image,
      partner,
      time,
      hours,
      id,
      name,
      phone,
      company,
    } = item;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Anoffer", {
            mainTitle: "Ofertas Laborales",
            image: image.url,
            title: title,
            buttonValue: "Ver más",
            url: url,
            description: description,
            time: time,
            hours: hours,
            method: "",
            subject_id: 0,
            id: id,
            partner: partner,
            name,
            phone,
            company,
          })
        }
        style={{
          width: cardWidth,
          marginRight: 5,
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
          <Box borderRadius={15} overflow="hidden">
            <Image
              alt={"logo"}
              style={{
                width: imageWidth,
                height: imageHeight,
              }}
              resizeMethod="auto"
              resizeMode="cover"
              source={{ uri: image.url }}
            />
            <Box pt={1} px={2} pb={3}>
              <Text
                style={[fontStyles.poppins400, { fontSize: 16, marginTop: 8 }]}
                fontWeight={700}
                fontFamily="Manrope"
                numberOfLines={2}
              >
                {title}
              </Text>

              <Text
                fontWeight={700}
                fontFamily="Manrope"
                style={[
                  fontStyles.poppins400,
                  { fontSize: 12, marginBottom: 4, color: "#bcbecc" },
                ]}
                numberOfLines={1}
                mt={1}
              >
                {company}
              </Text>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  const renderShop = ({ item }) => {
    const { title, description, image } = item;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("MarketDetail", item)}
        style={{
          width: cardWidth,
          marginRight: 5,
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
          <Box borderRadius={15} overflow="hidden">
            <Image
              alt={"logo"}
              style={{
                width: imageWidth,
                height: imageHeight,
              }}
              resizeMethod="scale"
              resizeMode="cover"
              source={{ uri: image.url }}
            />
            <Box pt={1} px={2} pb={3}>
              <Text
                style={[fontStyles.poppins400, { fontSize: 16, marginTop: 8 }]}
                fontWeight={700}
                fontFamily="Manrope"
                numberOfLines={2}
              >
                {title}
              </Text>
              <Text
                fontWeight={700}
                style={[
                  fontStyles.poppins400,
                  { fontSize: 15, marginBottom: 4, color: "#bcbecc" },
                ]}
                numberOfLines={1}
                mt={1}
                fontSize={"sm"}
              >
                {description || " "}
              </Text>
            </Box>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  const renderWorkShop = ({ item }) => {
    const { title, description, image } = item;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Anoffer", {
            mainTitle: "Cursos & Workshops",
            title: item.title,
            url: item.url,
            description: item.description,
            id: item.id,
            partner: item.partner,
            image: item.image.url,
          })
        }
        style={{
          width: cardWidth,
          maxWidth: cardWidth,
          height: cardHeight,
          minHeight: cardHeight,
          maxHeight: cardHeight,
          marginRight: 2,
          marginLeft: 10,
          marginTop: 10,
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
          <Box borderRadius={15} overflow="hidden">
            <Image
              alt={"logo"}
              style={{
                width: imageWidth,
                height: imageHeight,
              }}
              resizeMethod="auto"
              resizeMode="cover"
              source={{ uri: image.url }}
            />
            <Box pt={1} px={2} pb={3} maxWidth={cardWidth}>
              <Text
                style={[fontStyles.poppins400, { fontSize: 16, marginTop: 8 }]}
                fontWeight={700}
                numberOfLines={2}
              >
                {title}
              </Text>

              <Text
                fontWeight={700}
                style={[
                  fontStyles.poppins400,
                  { fontSize: 15, marginBottom: 4, color: "#bcbecc" },
                ]}
                numberOfLines={1}
                mt={1}
                fontSize={"sm"}
              >
                {description || " "}
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
      <TouchableOpacity onPress={() => handleNavigate("Config")}>
        <HeaderPerfil
          showICon={true}
          statusBarColor="#e8eef4"
          barStyle="dark-content"
          navigation={navigation}
          style={{ marginTop: 10 }}
        />
      </TouchableOpacity>
      <ScrollView
        backgroundColor={"#e8eef3"}
        showsVerticalScrollIndicator={false}
      >
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
                  style={{
                    ...fontStyles.poppins400,
                  }}
                >
                  No hay publicidad para mostrar
                </Text>
              </Box>
            </Box>
          )}
        </Box>

        <Box w={"100%"} flex={1} px={3} mb={32}>
          <HStack justifyContent={"space-around"} mb={5} mt={1}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#F5F6FA",
                paddingHorizontal: verticalScale(20),
                paddingVertical: verticalScale(15),
                borderRadius: moderateScale(8),
              }}
            >
              <View>
                <Text
                  fontWeight={"700"}
                  style={[
                    {
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 2,
                      marginTop: 4,
                      fontSize: moderateScale(14),
                    },
                    fontStyles.poppins700,
                  ]}
                >
                  ¿En qué aula curso?
                </Text>
                <Text
                  style={[
                    {
                      flex: 1,
                      alignItems: "center",
                      color: "#797979",
                      fontSize: moderateScale(14),
                      padding: 2,
                      marginTop: 2,
                    },
                    fontStyles.poppins400,
                  ]}
                >
                  Encontrá dónde cursás
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <DefaultButton
                  callBack={() =>
                    handleNavigate("SearchCourse", {
                      title: "Buscar curso",
                      url: "https://aulas.fadu.uba.ar/aulas.php",
                    })
                  }
                  textStyle={{
                    ...fontStyles.poppins500,
                    color: "#F5F5F5",
                    fontSize: moderateScale(12),
                    fontWeight: "500",
                  }}
                  buttonStyle={{
                    height: horizontalScale(30),
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: moderateScale(8),
                    paddingHorizontal: horizontalScale(30),
                  }}
                  title="Buscar"
                />
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
              contentContainerStyle={{
                justifyContent: "space-between",
                paddingBottom: 20,
              }}
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
              contentContainerStyle={{
                justifyContent: "space-between",
                paddingBottom: 20,
              }}
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
            navigateTo={"Ofertas Laborales"}
            isSubsection={true}
            title={"Ofertas Laborales"}
            to={null}
            navigation={navigation}
          />
          {allOffers.length > 0 ? (
            <FlatList
              keyExtractor={(item) => item?.id}
              contentContainerStyle={{ justifyContent: "space-between" }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={allOffers.slice(0, 3)}
              renderItem={renderOffer}
            />
          ) : (
            <Box
              alignItems={"center"}
              justifyContent={"center"}
              h={"100"}
              _text={{ fontSize: 15 }}
            >
              No Hay ofertas disponibles
            </Box>
          )}

          {/* <TitleSliders
            navigateTo={'Recursos y herramientas'}
            isSubsection={true}
            title={"Recursos y herramientas"}
            to={null}
            navigation={navigation}
          /> */}
          {/* {courses.length > 0 ? (
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
          )} */}
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
