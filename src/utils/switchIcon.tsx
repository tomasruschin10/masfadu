import {FontAwesome, MaterialCommunityIcons, MaterialIcons, Entypo, Octicons} from "@expo/vector-icons";

export default function switchIcon(iconType) {
	switch (iconType) {
		case "MaterialIcons":
			return <MaterialIcons />;
		case "MaterialCommunityIcons":
			return <MaterialCommunityIcons />;
        case "Entypo":
			return <Entypo />;
		case "Octicons":
			return <Octicons />;
		default:
			return <FontAwesome />;
	}
};