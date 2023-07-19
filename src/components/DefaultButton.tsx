import { Text, View } from "native-base";
import { StyleSheet, StyleProp, ViewStyle, TextStyle, TouchableOpacityProps, TouchableOpacity } from "react-native";
 
export const defaultTextStyle =             {
    width: 150,
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 0.5
  };
interface DefaultButtonProps extends TouchableOpacityProps {
    callBack: () => void;
    title: string;
    containerStyle?: any;
    buttonStyle?: any;
    textStyle?: any;
}

const DefaultButton = ({
    callBack,
    title,
    containerStyle,
    buttonStyle,
    textStyle
}: DefaultButtonProps) => {
    const containerStyleCombined = { ...styles.container, ...containerStyle };
    const buttonStyleCombined = { ...styles.button, ...buttonStyle };
    const textStyleCombined = { ...styles.text, ...textStyle };

    return (
        <TouchableOpacity style={containerStyleCombined} onPress={() => {
            callBack()
        }}>
            <View style={buttonStyleCombined}>
                <Text style={textStyleCombined}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};



const styles = StyleSheet.create({
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: "#EB5E29",
        height: 50,
        width: "100%",
        borderRadius: 10,
        paddingHorizontal: "5%"
        },
    text: {
        color: "#ffffff",
        fontSize: 13,
        textAlign: "center",
        marginTop: 13,
        fontWeight: "bold",
        letterSpacing: 0.5
    }
});

export default DefaultButton;
