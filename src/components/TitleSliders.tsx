import { Box, Text, useTheme } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function TitleSliders({navigateTo, title, to, navigation, more= true}) {
    const {colors }: any = useTheme();
    
	return (
        <Box mx={2} justifyContent={"space-between"} alignItems={'center'} flexDirection={"row"}>
			<Text fontWeight={700} fontFamily="Manrope" fontSize={"xl"}>{title}</Text>

			{more ? <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
				<Box flexDirection={"row"} alignItems={'center'} bg={'#F2FDFB'} rounded={'full'} pl={3} pr={2}>
					<Text mr={1} fontWeight={600} fontSize={16} fontFamily="Manrope" color={colors.alternativeText} py={1} style={{paddingBottom: 7}}>más</Text>
					<AntDesign name="arrowright" size={17} color={colors.alternativeText} />
				</Box>
			</TouchableOpacity> : null}
		</Box>
    )
}