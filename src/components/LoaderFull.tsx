import { Box, Heading, HStack, Spinner } from "native-base";

export default function LoaderFull() {
	return (
		<Box backgroundColor={'rgba(255,255,255,0.98)'} style={{
			height: '100%',
			position:'absolute',
			zIndex:1000,
			width: '100%',
			justifyContent: 'center',
		}} flex={1}>
			<HStack space={2} justifyContent="center">
			<Spinner color="brand.primary" accessibilityLabel="Cargando" />
			<Heading color="brand.primary" fontSize="md">
				Cargando...
			</Heading>
		</HStack>
		</Box>
	);
}
