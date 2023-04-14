import { Box, Text, useTheme } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		bottom: 0,
		position: "absolute",
	},
	shadow: {
		backgroundColor: "white", 
		borderRadius: 18,
		elevation: 3,
		shadowColor: 'gray',
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 2
	},
	items: {
		alignItems: 'center',
		backgroundColor: 'rgba(41, 114, 254, 0.1);',
		borderRadius: 12,
		flexDirection: "row",
		paddingHorizontal: 12,
		paddingVertical: 8
	}
})

export default function BottomTab({ route, navigation }) {
	const { colors }: any = useTheme();
	const { name } = route;
	return (
		<Box
			safeAreaBottom
			mb={2}
			width={"100%"}
			px={6}
			style={[styles.container, Platform.OS == "android" ? { paddingBottom: 24 } : { paddingBottom: 24 }]}
		>
			<Box py={4} px={4} shadow={5} style={styles.shadow}>
				<Box flexDirection={"row"} justifyContent={"space-between"}>
					<TouchableOpacity onPress={() => name !== 'Home' ? navigation.navigate("Home") : null} style={styles.items}>
						<MaterialIcons name="home" size={23} color={colors.brand.principal} />
						<Box ml={1} justifyContent={"center"}>
							<Text fontWeight={'bold'} fontFamily={'SourceSansPro'} fontSize={'15.76'} color={"brand.principal"}>{" "}Inicio</Text>
						</Box>
					</TouchableOpacity>

					<TouchableOpacity style={styles.items} onPress={() => navigation.navigate("AboutSubject")}>
						<MaterialIcons name="format-list-bulleted" size={22} color={colors.brand.principal} />
					</TouchableOpacity>
					
					<TouchableOpacity onPress={() => name !== "Subsections" ? navigation.navigate('Subsections', { title: 'Opiniones de materias' }):navigation.navigate('Subsections', { title: 'Opiniones de materias' }) } style={styles.items}>
						<MaterialIcons name="message" size={22} color={colors.brand.principal} />
					</TouchableOpacity>

					<TouchableOpacity onPress={() => navigation.navigate("Menu")} style={styles.items}>
						<MaterialIcons name="apps" size={22} color={colors.brand.principal} />
					</TouchableOpacity>
				</Box>
			</Box>
		</Box>
	);
}
