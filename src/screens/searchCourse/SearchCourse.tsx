import { WebView } from 'react-native-webview';
import Container from '../../components/Container';
import { HeaderBack } from '../../components/Header';

export const SearchCourse = ({route, navigation}) =>{
    return(
        <Container>
            <HeaderBack title={route.params.title}/>
            <WebView source={{ uri: route.params.url }}/>
        </Container>
    )
}