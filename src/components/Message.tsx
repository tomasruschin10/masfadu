import {
	Box,
	Button,
	Center,
	CheckIcon,
	CloseIcon,
	Heading,
	HStack,
	Input,
	Slide,
	Text,
	VStack,
} from "native-base";
import React, { memo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react';
import { updateMessage } from "../redux/actions/message";
import { TouchableOpacity } from "react-native";
import { NoHeader } from "./Header";

function Message() {
	const message = useSelector((state:any) => state.message);
    const dispatch = useDispatch();
    if(message.open){
        setTimeout(()=>{
            dispatch(updateMessage({body: '', open: false, type: ''}))
        },7000);
    }
    const getColors = (type, resource)=>{
        switch (type) {
            case 'success':
                if(resource === 'color'){
                    return 'green.400'
                }
                if(resource === 'icon'){
                    return <CheckIcon
                    size="6"
                    color="green.900"
                    mt="1"
                />
                }
                break;
            case 'danger':
                if(resource === 'color'){
                    return 'red.400'
                }
                if(resource === 'icon'){
                    return <CloseIcon
                    size="6"
                    color="red.900"
                    mt="1"
                />
                }
                break;
                
        }
    }
	return (
		<Center>
			<Box w="300" justifyContent="center">
				
				<Slide in={message.open} placement="top">
					
                    <Box
                        zIndex={30000}
                        safeAreaTop
						w="100%"
						position="absolute"
						p="2"
						borderRadius="xs"
						bg={getColors(message.type, 'color') as string}
						alignItems="center"
						justifyContent="center"
					>
                        <TouchableOpacity onPress={()=>dispatch(updateMessage({body: '', open: false, type: ''}))}>
						<HStack px={5} space={2}>
							<Box justifyContent={'center'}>
                                {getColors(message.type, 'icon')}
                            
                            </Box>
							<Text
                            bold
                                fontSize="lg"
								color="white"
								textAlign="center"
								fontWeight="medium"
							>
								{message.body}
							</Text>
						</HStack>
                    </TouchableOpacity>
					</Box>
				</Slide>
			</Box>
		</Center>
	);
};
export default memo(Message);