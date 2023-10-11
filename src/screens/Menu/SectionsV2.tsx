import { Box, IconButton, Text, Image } from "native-base";
import SvgUri from "react-native-svg-uri";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { fontStyles } from "../../utils/colors/fontColors";
import { horizontalScale, moderateScale, verticalScale } from "../../utils/media.screens";

export default function SectionsV2({ title, icon, navigation, setMenu }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <TouchableOpacity
            style={{
                borderWidth: 1,
                borderColor: isHovered ? '#7faaff' : 'transparent',
                borderRadius: moderateScale(14),
                flexDirection: 'row', // Place icon and text side by side
                alignItems: 'center', // Center items vertically
                backgroundColor: isHovered ? '#E18561' : 'transparent', // Change background color on hover
                width: "100%",
                height: verticalScale(60),
                paddingVertical: verticalScale(10),
            }}
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
            onBlur={() => setIsHovered(true)}
            onPress={() => {
                navigation.navigate("Subsections", { title: title });
                setMenu(false);
            }}
        >
            <Box marginLeft={horizontalScale(20)}>
                <Image
                    alt="imagen"
                    source={icon}
                    resizeMode="contain"
                    style={{ width: 45, height: 45 }} // Adjust icon size
                />
            </Box>
            <Box ml={10}>
                <Text
                    style={[fontStyles.poppins500, { color: "#EB5E29" }]}
                    fontSize={moderateScale(10)}
                    textAlign="center"
                >
                    {title}
                </Text>
            </Box>
        </TouchableOpacity>
    );
}
