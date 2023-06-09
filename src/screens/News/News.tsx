import { FontAwesome5 } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Image, useTheme } from 'native-base';
import * as React from "react";
import { Linking, TouchableHighlight } from 'react-native';
import Container from "../../components/Container";

function News({ route, navigation }) {
	const { colors }: any = useTheme();
	const { canGoBack, goBack } = useNavigation();
	const { url, image } = route.params

	return (
		<Container>
			<Box flex={1} zIndex={1} right={7} top={12} position={"absolute"}>
				{ canGoBack() && (
					<TouchableHighlight onPress={() => goBack()} style={{ backgroundColor: '#ecfeff', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 }} underlayColor="">
						<FontAwesome5 name="times-circle" size={22} color={colors.brand.primary} />
					</TouchableHighlight>
				)}
			</Box>
			<Box>
				<Box bg={'blue.900'}>
					<Image 
						source={{uri: image}} 
						resizeMode={"cover"}
						w={'100%'}
						h={'100%'}
						alt="news1" 
					/>
				</Box>
				<Box py={6} safeAreaBottom alignItems="center" left={0} bottom={0} right={0} position={"absolute"}>
					<Button _text={{fontSize: 17}} onPress={() => Linking.openURL(url.includes('http') ? url : `https://${url}`)} py={5} w="52%" backgroundColor="green.500" >
					Ver más
					</Button>
				</Box>
			</Box>
		</Container>
	);
}

export default News;
