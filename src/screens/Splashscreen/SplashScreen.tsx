import jwtDecode from "jwt-decode";
import { Box, Image } from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatetoken } from "../../redux/actions/token";
import { getServices } from "../../utils/hooks/services";
import { updateUserdata } from "../../redux/actions/user";

function SplashScreen({ route, navigation }) {
  const token = useSelector((state: any) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!token) {
      getServices("auth/validate-token")
        .then(({ data }: any) => {
          dispatch(updatetoken(data.token));
          const { userData }: any = jwtDecode(data.token);
          if (userData.email === 'alumno@erickcampas.com') {
            userData.userRole[0].role.name = 'Visit' // Make visit
          }
          dispatch(updateUserdata(userData));
          if (userData.career) {
            navigation.navigate("Home");
          } else {
            navigation.navigate("Onboarding1");
          }
        })
        .catch((error) => {
          if (__DEV__) {
            console.log(error);
          }
        });
    } else {
      navigation.navigate("Login");
    }
  }, []);

  return (
    <Box h="100%" bg={"white"}>
      <Image
        alt="splashScreen"
        source={require("../../../assets/splash.png")}
        h={"100%"}
      />
    </Box>
  );
}

export default SplashScreen;
