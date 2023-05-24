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

function Offers({ route, navigation }) {
  const [offerCategory, setOfferCategory] = useState([]);
  const [items, setItems] = useState([]);
  const [AllItems, setAllItems] = useState([]);
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
      <TouchableOpacity onPress={() => handleFilter(item)}>
        {/* <View
          style={{
            // height: 60,
            margin: 10,
            backgroundColor: "red",
            justifyContent: "center",
            borderRadius: 30,
          }}
        > */}
        <Text
          style={{
            backgroundColor: item.id == currentFilter ? "#6523e3" : "#ffffff",
            marginLeft: 14,
            padding: 10,
            color: item.id == currentFilter ? "#fff" : "#051f45",
            fontWeight: "bold",
            shadowRadius: 10,
            borderRadius: 20,
            overflow: "hidden", // agrega esta línea

            // padding: 12,
          }}
        >
          {item.name}
        </Text>
        {/* </View> */}
      </TouchableOpacity>
    );
  };

  const handleFilter = (item) => {
    console.log("handle ", item);
    setCurrentFilter(item.id);
    const data = AllItems.filter(
      (itemFilter) => itemFilter.offer_category_id === item.id
    );

    setItems(data);
    if (item.id == 0) {
      setItems(AllItems);
    }
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
        setAllItems(data.map((obj) => obj.offers).flat());
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
        {/* <Text
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
        </Text> */}

        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            horizontal={true}
            // numColumns={4}
            // ItemSeparatorComponent={() => <Box mb={3}></Box>}

            keyExtractor={(item) => item.id}
            // contentContainerStyle={{
            //   flex: 1,
            //   backgroundColor: "green",
            //   justifyContent: "center",
            //   alignItems: "center",
            // }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={offerCategory}
            renderItem={HeaderFilters}
          />
        </ScrollView>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Especificar dos columnas
        contentContainerStyle={{
          // backgroundColor: "red",
          marginLeft: 3,
          // marginRight: 5,
          justifyContent: "center",
          // width: 200,
          // alignItems: "center",
          paddingBottom: 80,
        }}
      />
    </Layout>
  );
}

export default Offers;
