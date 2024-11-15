import React, { useCallback } from "react";
import {
  Box,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Input,
  ScrollView,
  Text,
} from "native-base";
import { Image } from "react-native";
import * as amplitude from "@amplitude/analytics-react-native";
import { useFocusEffect } from "@react-navigation/native";

import Layout from "../../utils/LayoutHeader&BottomTab";
import { getServices } from "../../utils/hooks/services";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, Dimensions, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import useSearchOfferts from "../../utils/hooks/userSearchOffers";
import { fontStyles } from "../../utils/colors/fontColors";

import { store } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateModal } from "../../redux/actions/user";

const { width: screenWidth } = Dimensions.get("window");

function Offers({ route, navigation }) {
  const [offerCategory, setOfferCategory] = useState([]);
  const [items, setItems] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [AllItems, setAllItems] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedButton, setSelectedButton] = useState("Todo");
  const [advertisement, setAdvertisement] = useState([]);
  const SLIDER_WIDTH = (Dimensions.get("window").width - 45) / 2;
  const { search, setSearch, filteredSubjects } = useSearchOfferts();
  const state: any = store.getState();

  const { width } = Dimensions.get("window");
  const cardWidth = width * 0.44;

  const user = useSelector((state: any) => state.user.userdata);
  const dispatch = useDispatch();
  const handleNavigate = (route: string, additional?: any) => {
    if (user?.userRole[0]?.role?.name === "Visit") {
      dispatch(updateModal(true));
      return;
    }
    navigation.navigate(route, additional);
  };

  useFocusEffect(
    useCallback(() => {
      amplitude.logEvent("Pantalla visitada", {
        screen: "El Mercado de Fadu",
      });
    }, [])
  );

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
        ></TouchableOpacity>
      </Box>
    );
  };

  const HeaderFilters = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ marginRight: 10 }}
        onPress={() => handleFilter(item)}
      >
        <Text
          numberOfLines={1}
          style={{
            backgroundColor: item.id == currentFilter ? "#EB5E29" : "#ffffff",
            color: item.id == currentFilter ? "#fff" : "#EB5E29",
            width: "100%",
            zIndex: 9999,
            borderRadius: 12,
            overflow: "hidden",
            textAlign: "center",
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleFilter = (item) => {
    if (currentFilter === item.id) {
      setCurrentFilter(null);
      setItems(AllItems);
    } else {
      setCurrentFilter(item.id);
      const data = AllItems.filter(
        (itemFilter) => itemFilter.offer_category_id === item.id
      );
      setItems(data);
    }
  };

  useEffect(() => {
    setLoading(true);
    const {
      userdata: { id },
    } = state.user;
    getServices("advertisement/all/active?key=business_offers").then(
      ({ data }: any) => {
        setAdvertisement(data);
      }
    );
    getServices("offer-category/all")
      .then(({ data }: any) => {
        let result = data.map((obj) => {
          const newObj = { id: obj.id, name: obj.name };
          return newObj;
        });
        setOfferCategory(result);
        setItems(data.map((obj) => obj.offers).flat());
        setAllItems(data.map((obj) => obj.offers).flat());

        const myItems = data
          .map((obj) => obj.offers.filter((offer) => offer.user_id === id))
          .flat();
        setMyItems(myItems);
      })
      .catch((error) => {
        if (__DEV__) {
          console.log(error);
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
        __DEV__ && console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const renderItem = ({ item }) => {
    console.log(JSON.stringify(item, null, 2));

    const {
      userdata: { id },
    } = state.user;

    return (
      <TouchableOpacity
        onPress={() => {
          if (item.user_id === id) {
            handleNavigate("OfferEditForm", { data: item });
          } else {
            navigation.navigate("MarketDetail", { data: item });
          }
        }}
        style={{
          width: cardWidth,
          marginBottom: "5%",
          backgroundColor: "#f6f7f9",
          elevation: 3,
          borderRadius: 15,
          paddingBottom: 3,
        }}
      >
        <View>
          <Image
            style={{
              height: 140,
              width: "100%",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              marginBottom: 10,
            }}
            source={{
              uri: item.image.url,
            }}
          />
          <Text
            style={[
              fontStyles.headingText,
              {
                fontWeight: "bold",
                fontSize: 13,
                lineHeight: 18,
                paddingLeft: "5%",
                paddingRight: "2%",
              },
            ]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              marginTop: 5,
              marginBottom: 5,
              lineHeight: 18,
              paddingLeft: "5%",
              paddingRight: "2%",
            }}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = {
    inputContainer: {
      justifyContent: "center",
    },
    input: {
      height: 50,
    },
    icon: {
      position: "absolute",
      right: 10,
    },
  };

  return (
    <Layout
      route={route}
      navigation={navigation}
      title="El Mercado de Fadu"
      addButtonUrl={"OfferForm"}
    >
      <HStack mt={0} mb={3} alignItems={"center"} justifyContent="center">
        <MaterialIcons
          name={"search"}
          size={17}
          color="gray"
          style={{ position: "absolute", left: "5%", zIndex: 1 }}
        />

        <Input
          style={{ marginLeft: "6%" }}
          onChangeText={(text) => setSearch(text)}
          value={search}
          w={{ base: "80%", md: "85%" }}
          pb="1"
          type={"text"}
          placeholder="Buscar"
          placeholderTextColor="#666666"
          rounded={8}
        />
        <IconButton
          onPress={() => {
            setSearch("");
          }}
          ml="3"
          rounded={8}
          backgroundColor={"#fff"}
          icon={
            <Icon as={AntDesign} name="close" size="md" color={"muted.400"} />
          }
        />
      </HStack>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginLeft: 35,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => setSelectedButton("Todo")}
          style={{
            borderRadius: 0,
            height: 40,
            borderBottomLeftRadius: 2,
            borderBottomStartRadius: 2,
            marginRight: 20,
            borderBottomWidth: selectedButton === "Todo" ? 1 : 0,
            borderBottomColor: "#EB5E29",
          }}
        >
          <Text
            style={{
              paddingVertical: 10,
              textAlign: "center",
              color: selectedButton === "Todo" ? "#EB5E29" : "#797979",
            }}
          >
            Todo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedButton("Mis Publicaciones")}
          style={{
            borderRadius: 0,
            borderBottomLeftRadius: 2,
            height: 40,
            borderBottomStartRadius: 2,
            borderBottomWidth: selectedButton === "Mis Publicaciones" ? 1 : 0,
            borderBottomColor: "#EB5E29",
          }}
        >
          <Text
            style={{
              paddingVertical: 10,
              borderRadius: 99,
              textAlign: "center",
              color:
                selectedButton === "Mis Publicaciones" ? "#EB5E29" : "#797979",
            }}
          >
            Mis Publicaciones
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: "#DEE8EE",
          marginLeft: 17,
          marginRight: 17,
        }}
      />
      <Box alignContent={"center"} mt={3}>
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
          width: "100%",
          height: 50,
          marginBottom: 15,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            justifyContent: "flex-start",
            flexDirection: "row",
            paddingHorizontal: "3%",
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {offerCategory.map((item) => (
            <HeaderFilters key={item.id} item={item} />
          ))}
        </ScrollView>
      </View>

      <FlatList
        style={{
          width: "100%",
        }}
        data={selectedButton === "Mis Publicaciones" ? myItems : items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 50,
        }}
        columnWrapperStyle={{
          columnGap: 20,
        }}
      />
    </Layout>
  );
}

export default Offers;
