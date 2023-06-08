import { Box, Button, Heading, HStack, Image, ScrollView, Spinner, Text } from 'native-base'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableHighlight, Linking } from 'react-native';
import { getServices } from '../../utils/hooks/services'

export const Item = ({id, navigation, name, image_id, created_at, updated_at, image, item}) => (
  <Box mt={1} w={'50%'} mb="2">
    <TouchableHighlight underlayColor="" onPress={() => navigation.navigate('Subjects', item)}>
      <Box style={styles.shadow} bgColor={'white'} shadow={'5'} rounded="md" mx="1.5">
        <Image source={{uri: image.url}} alt="Career_Image" mb={2} h={100} borderTopRadius={'md'} />
        <Text textAlign={'center'} pb={2}>{name}</Text>
      </Box>
    </TouchableHighlight>
  </Box>
)

function ResourcesAndTools({route, navigation}) {
	const [career, setCareer] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
	
  useEffect(() => {
    setLoading(true)
		getServices('career/all').then((res: any) => {
			setCareer(res.data)
		}).catch(error => {
			if(__DEV__){
				console.log("🚀 ~ file: On2Screen.tsx ~ line 21 ~ getServices ~ error", error)
			}
		}).finally(() => setLoading(false))
	},[setCareer])
  
  return (
    <>
      <ScrollView>
        {
          !loading? 
          <Button display={'none'} /> :
          <HStack mb={3} space={2} justifyContent="center">

            <Spinner accessibilityLabel="Loading posts" />
            <Heading color="brand.primary" fontSize="md">Cargando</Heading>
          </HStack>
        }
        
        <Box mt="2" px="3" flexDir={'row'} flexWrap={'wrap'} mb={'48'}>
          { career.length > 0 && career.map(item => 
            <Item 
              id={item.id}
              key={item.id}
              name={item.name}
              image_id={item.image_id}
              created_at={item.created_at}
              updated_at={item.updated_at}
              image={item.image}
              navigation={navigation}
              item={item}
            />
          )}
        </Box>
      </ScrollView>
      <Box alignSelf={"center"} position={"absolute"} bottom={32}>
          <Button
            _text={{ fontSize: 15 }}
            onPress={()=> Linking.openURL('mailto:hola@masfadu.com?subject=Elemento para Donar&body=Buen día: ')}
            w="205"
            h="10"
            backgroundColor="#eb5e29"
          >
            Publicar
          </Button>
        </Box>
    </>
  )
}

const styles = StyleSheet.create({
	shadow: {
		backgroundColor: "white",
		elevation: 15,
		shadowColor: 'rgba(48,110,237,.7)',
		shadowOffset: { width: 0, height: -3 },
		shadowRadius: 5,
		borderWidth: 2,
		borderColor: 'rgba(242,242,242,.2)',
		borderRadius: 10,
	}
})

export default ResourcesAndTools