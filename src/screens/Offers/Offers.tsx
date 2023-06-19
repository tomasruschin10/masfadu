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
import { Input as Inpu2, Icon as Icon2 } from "react-native-elements";
import { Image, TextInput } from "react-native";
import Layout from "../../utils/LayoutHeader&BottomTab";
import { getServices } from "../../utils/hooks/services";
import { EvilIcons } from "@expo/vector-icons";
import {
  Linking,
  TouchableOpacity,
  Dimensions,
  View,
  Alert,
} from "react-native";
import { MaterialIcons} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useSearchOfferts from "../../utils/hooks/userSearchOffers";

function Offers({ route, navigation }) {
  const [menuShow, setMenu] = useState(false)
  const [offerCategory, setOfferCategory] = useState([]);
  const [items, setItems] = useState([]);
  const [AllItems, setAllItems] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [advertisement, setAdvertisement] = useState([]);
  const SLIDER_WIDTH = (Dimensions.get("window").width - 45) / 2;
  const { search, setSearch, filteredSubjects,  } =
    useSearchOfferts();
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
            backgroundColor: item.id == currentFilter ? "#EB5E29" : "#ffffff",
            marginLeft: 14,
            padding: 10,
            color: item.id == currentFilter ? "#fff" : "#EB5E29",
          
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
  }, []);

  useEffect(() => {
    
    if (filteredSubjects.length > 0) {
      setItems(filteredSubjects.map((obj) => obj.offers).flat());
    }
  }, [search, filteredSubjects]);

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
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center", 
          marginLeft: "5%"
        }}
      >
        <View
          style={{
            backgroundColor: "#f6f7f9",
            width: "100%",
          height: "35%",
            margin: 3,
            borderRadius: 10,

            
          }}
        >
          <Image
            style={{
              height: 140,
              width: "100%",
              borderRadius: 15,
            }}
            source={{
              uri: item.image.url,
            }}
          />
          <View
            style={{
              height: 80
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
                marginTop: "1%",
                marginBottom: "1%",
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

  const styles = {
    inputContainer: {
      justifyContent: 'center',
    },
    input: {
      height: 50,
    },
    icon: {
      position: 'absolute',
      right: 10,
    }
  }

  return (
    <Layout route={route} navigation={navigation} title="El Mercado de Fadu" addButtonUrl={'OfferForm'}>
      <HStack mt={0} mb={4} alignItems={"center"} justifyContent="center">
      <MaterialIcons
        name={"search"}
        size={17}
        color="gray"
        style={{ position: 'absolute', left: "8.8%", zIndex: 1}}
      />

        <Input
        style={{marginLeft: "8%"}}
          onChangeText={(text) => setSearch(text)}
          value={search}
          
          w={{ base: "75%", md: "25%" }}
          pb="1"
          type={"text"}
          placeholder="Buscar"
          placeholderTextColor="#666666" 
          
          
        />
        <IconButton
          onPress={() => {
            setSearch("");
          }}
          ml="3"
          rounded={"xl"}
          backgroundColor={"primary.900"}
          icon={
            <Icon
              as={EvilIcons}
              name="close-o"
              size="md"
              color={search.length > 0 ? "red.500" : "muted.400"}
            />
          }
        />
      </HStack>


      <Box alignContent={"center"} mt={3}  mb={1}>
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
          flexDirection: "row",
          alignItems: "center",
          height: 50,
          justifyContent: "center",
          marginTop: -20,
          marginBottom: 10,
          marginLeft:"3%",
          marginRight: "6.5%"
        
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            horizontal={true}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={offerCategory}
            renderItem={HeaderFilters}
          />
        </ScrollView>
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        marginBottom={"10%"}
        contentContainerStyle={{
          marginRight: "7%",
          marginLeft: "1.8%",
          justifyContent: "center",
          paddingBottom: 50,
        }}
      />
    </Layout>
  );
}

export default Offers;
