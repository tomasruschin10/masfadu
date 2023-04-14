import { Box } from 'native-base';
import { WebView } from 'react-native-webview';

export const PolicyPrivacity = () =>{
    return(
        <Box flex={1} pb={100}>
            <WebView source={{ uri: 'https://fadu-1c40d.web.app/politica-de-privacidad' }}/>
        </Box>
    )
}