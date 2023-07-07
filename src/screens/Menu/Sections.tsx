import { Box, IconButton, Text, Image } from "native-base";
import SvgUri from "react-native-svg-uri";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { fontStyles } from "../../utils/colors/fontColors";



export default function Sections({ title, icon, comingSoon, navigation, setMenu }) {

  const [isHovered, setIsHovered] = useState(false);

  return (
    <TouchableOpacity
      style={
        {
          borderWidth: 1,
          borderColor: isHovered ? '#7faaff' : 'transparent',
          borderRadius: 25
        }
      }

      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
      onBlur={() => setIsHovered(true)}
      onPress={() => { navigation.navigate("Subsections", { title: title }), setMenu(false) }}>
      <Box
        flex={1}
        borderRadius={25}
        style={{ width: 130, height: 130, backgroundColor: "#F1F6FA" }}
        alignItems={"center"}
      >
        <Box
          flex={1}
          alignItems="center"
          style={{
            justifyContent: "center", // Centrar contenido verticalmente
            overflow: "hidden", // Evitar recorte del ícono
          }}
        >
          {comingSoon ? (
            <IconButton
              size={55}
              icon={
                <Box
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    alt="imagen"
                    source={icon}
                    resizeMode="contain" // Ajustar imagen al contenedor
                    style={{ width: "50%", height: "50%" }} // Reducir el tamaño de la imagen
                  />

                  {/*  <SvgUri width="200" height="200" source={icon} /> */}
                </Box>
              }
            />
          ) : title === "" ? (
            <IconButton
              size={55}
              icon={
                <Box
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    alt="imagen"
                    source={icon}
                    resizeMode="contain" // Ajustar imagen al contenedor
                    style={{ width: "100%", height: "100%" }} // Reducir el tamaño de la imagen
                  />
                </Box>
              }
            />

            
          ) : (
            <Box

          >
            <Image
              size={55}
              alt="image"
              source={icon}
              resizeMode="contain"
            />

          </Box>
          )}
          {comingSoon ? (
            <Box
              position="absolute"
              backgroundColor="#64E889"
              rounded="full"
              bottom={30}
              left={0}
              right={0}
            // Agregado padding para centrar el texto
            >
              <Text textAlign="center" fontSize={10}>
                Próximamente
              </Text>
            </Box>
          ) : null}
          <Box mt={1.5}  mb={1} mx={2}>
            <Text
              style={fontStyles.regularText}
              fontSize={"10"}
              numberOfLines={2}
              textAlign="center"
            >
              {title}
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}
