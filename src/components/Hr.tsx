import { Text, View } from "native-base";

export default function Hr({ text, ...props }) {
  return (<View style={{flexDirection: 'row', alignItems: 'center'}} {...props}>
  <View style={{flex: 1, height: 1, backgroundColor: 'rgba(0,0,0,0.3)'}} />
  <View>
    <Text style={{width: 50, color:  'rgba(0,0,0,0.3)', textAlign: 'center'}}>{text}</Text>
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: 'rgba(0,0,0,0.3)'}} />
</View>);
}