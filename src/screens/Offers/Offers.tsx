import {
  Box,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Text,
  Button,
  Spinner,
  Heading,
} from "native-base";
import { Image } from "react-native";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { getServices } from "../../utils/hooks/services";
import {
  Linking,
  TouchableOpacity,
  Dimensions,
  View,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const renderOfertas = ({ item }) => {
  const { title, description, url, image, partner } = item;
  return (
    <Box
      shadow={"5"}
      bgColor={"white"}
      m={2}
      p={1}
      borderRadius={"md"}
      mr={3}
      mb={5}
      minH={159}
      w={307}
    >
      <Box
        flexDirection={"row"}
        pt={1}
        pl={2}
        borderBottomColor={"light.200"}
        borderBottomWidth={1}
      >
        <Image
          alt={"logo"}
          w={92}
          h={92}
          resizeMode={"cover"}
          borderRadius={"md"}
          source={{ uri: image.url }}
        />
        <Box px={3} minH={105} w={180}>
          <Text fontSize={"md"} fontWeight={700} fontFamily="Manrope">
            {title}
          </Text>
          <Text
            fontWeight={700}
            fontFamily="Manrope"
            color={"mutedText"}
            numberOfLines={2}
            mt={1}
            fontSize={"sm"}
          >
            {partner.name}
          </Text>
          <Box w={180} mb={3}>
            <Text
              fontFamily="Manrope"
              numberOfLines={2}
              fontSize={16}
              lineHeight={21.86}
            >
              {description}
            </Text>
          </Box>
        </Box>
      </Box>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(url.includes("https://") ? url : `https://${url}`)
        }
        style={{ justifyContent: "center" }}
      >
        <Text
          pt={2}
          fontWeight={700}
          fontSize={"sm"}
          color={"alternativeLink"}
          fontFamily="Manrope"
          textAlign={"center"}
        >
          Ver más
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

function Offers({ route, navigation }) {
  const [offerCategory, setOfferCategory] = useState([]);
  const [items, setItems] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [advertisement, setAdvertisement] = useState([]);
  const SLIDER_WIDTH = (Dimensions.get("window").width - 45) / 2;

  const { canGoBack, goBack, navigate } = useNavigation();

  const renderNews = ({ item }) => {
    return (
      <Box
        shadow={4}
        bgColor={"white"}
        mb={3}
        width={SLIDER_WIDTH}
        mx={2}
        h={93.37}
        borderRadius={"2xl"}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("News", {
              url: item.url,
              image: item.image.url,
            })
          }
        >
          {/* <Image
            borderRadius={"2xl"}
            resizeMode={"cover"}
            h={"100%"}
            alt="news1"
            source={{ uri: item.image.url }}
          /> */}
        </TouchableOpacity>
      </Box>
    );
  };

  const HeaderFilters = ({ item }) => {
    // console.log("item category: " + JSON.stringify(item, null, 2));

    return (
      <>
        <View
          style={{
            // height: 60,
            // backgroundColor: "red",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              backgroundColor: "#ffffff",
              marginLeft: 14,
              padding: 10,
              color: "#051f45",
              fontWeight: "bold",
              borderRadius: 30,
              // padding: 12,
            }}
          >
            {item.name}
          </Text>
        </View>
      </>
    );
  };

  useEffect(() => {
    setLoading(true);
    getServices("advertisement/all/active?key=business_offers").then(
      ({ data }: any) => {
        setAdvertisement(data);
      }
    );
    getServices("offer-category/all")
      .then(({ data }: any) => {
        const filter = {
          id: 0,
          name: "Todos",
        };

        // const result = data.map((obj) => ({ ...obj }));
        let result = data.map((obj) => {
          const newObj = { id: obj.id, name: obj.name };
          return newObj;
        });
        result.unshift(filter);
        setOfferCategory(result);
        setItems(data.map((obj) => obj.offers).flat());
        console.log("items ", JSON.stringify(items, null, 2));
        console.log("offerCategory ", JSON.stringify(result, null, 2));
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(
            "🚀 ~ file: On2Screen.tsx ~ line 21 ~ getServices ~ error",
            error
          );
        }
      })
      .finally(() => setLoading(false));
    // }, [setOfferCategory, reload]);
  }, []);

  const byWords = () => {
    setLoading(true);
    getServices(`offer-category/all?search=${searchText.trim()}`)
      .then(({ data }: any) => {
        setOfferCategory(data);
        setSearchText("");
      })
      .catch((error) => {
        __DEV__ &&
          console.log("🚀 ~ file: SeeSubjectThread getServices:", error);
      })
      .finally(() => setLoading(false));
  };

  const renderItem = ({ item }) => {
    console.log(
      "🚀 ~ file: Offers.tsx:219 ~ renderItem ~ item:",
      JSON.stringify(item, null, 2)
    );

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("MarketDetail", { data: item })}
      >
        <View
          style={{
            backgroundColor: "#f6f7f9",
            width: 180,
            height: 250,
            margin: 6,
            borderRadius: 10,
          }}
        >
          <Image
            style={{
              height: 140,
              width: 180,
              borderRadius: 10,
            }}
            source={{
              uri: item.image.url,
            }}
          />
          <View
            style={{
              margin: 8,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                // letterSpacing: 1,
                lineHeight: 18,
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                // letterSpacing: 1,
                marginTop: 5,
                lineHeight: 18,
              }}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Layout route={route} navigation={navigation} title="Ofertas!">
      <Box alignContent={"center"} mt={3} mb={1}>
        <FlatList
          alignSelf={"center"}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          data={advertisement}
          renderItem={renderNews}
        />
      </Box>
      <View
        style={{
          // flex: 1,
          // height: 60,
          // width: "100%",
          // marginBottom: 10,
          // marginTop: -12,
          // backgroundColor: "cyan",
          flexDirection: "row",
          alignItems: "center",
          height: 50,
          justifyContent: "center",
          marginTop: -20,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            backgroundColor: "#ffffff",
            marginLeft: 14,
            padding: 10,
            color: "#051f45",
            fontWeight: "bold",
            borderRadius: 30,
            // padding: 12,
          }}
        >
          Filters
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            horizontal={true}
            // numColumns={4}
            // ItemSeparatorComponent={() => <Box mb={3}></Box>}

            keyExtractor={(item) => item.id}
            // contentContainerStyle={{
            //   justifyContent: "space-between",
            // }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={offerCategory}
            renderItem={HeaderFilters}
          />
        </ScrollView>
      </View>
      {/* <Box
        mx="5"
        alignItems={"center"}
        justifyContent="center"
        flexDir={"row"}
        mb="3"
      >
        <Input
          rounded={"full"}
          fontSize={12.27}
          onChangeText={(text) => setSearchText(text)}
          w={{ base: "75%", md: "25%" }}
          pb="1"
          type={"text"}
          placeholder={"Buscar"}
          mr="2"
        />

        <HStack alignItems={"flex-start"}>
          <IconButton
            mr={2}
            onPress={byWords}
            rounded={"xl"}
            backgroundColor={"primary.900"}
            icon={
              <Icon
                as={Ionicons}
                name="search"
                size="md"
                color="primary.1000"
              />
            }
          />
          <IconButton
            onPress={() => setReload(!reload)}
            rounded={"xl"}
            backgroundColor={"primary.900"}
            icon={
              <Icon
                as={AntDesign}
                name="reload1"
                size="md"
                color="primary.1000"
              />
            }
          />
        </HStack>
      </Box> */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Especificar dos columnas
        contentContainerStyle={{
          // backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 80,
        }}
      />

      {/* <ScrollView keyboardShouldPersistTaps={"handled"}> */}

      {/* <Box flex={1} mb={16}>
          {!loading ? (
            <Button display={"none"} />
          ) : (
            <HStack space={2} justifyContent="center">
              <Spinner accessibilityLabel="Loading posts" />
              <Heading color="brand.primary" fontSize="md">
                Cargando
              </Heading>
            </HStack>
          )}

          <Box px={5} alignContent={"center"}>
            {offerCategory.length > 0 &&
              offerCategory.map((item) => {
                return (
                  <Box key={item.id}>
                    <Text
                      fontWeight={700}
                      fontFamily="Manrope"
                      fontSize={"xl"}
                      mb={1}
                    >
                      {item.name}
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <FlatList
                        numColumns={4}
                        ItemSeparatorComponent={() => <Box mb={3}></Box>}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{
                          justifyContent: "space-between",
                        }}
                        showsHorizontalScrollIndicator={false}
                        data={item.offers}
                        renderItem={renderOfertas}
                        mb={1}
                      />
                    </ScrollView>
                  </Box>
                );
              })}
            {!loading && offerCategory.length === 0 && (
              <Box
                alignItems={"center"}
                justifyContent={"center"}
                h={"100"}
                _text={{ fontSize: 15 }}
              >
                No Hay Ofertas
              </Box>
            )}
          </Box>
        </Box> */}
      {/* </ScrollView> */}
    </Layout>
  );
}

export default Offers;
