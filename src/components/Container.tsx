import {
    Box
} from "native-base";
import React from "react";

export default function Container({ children, ...props }) {
	return (
		<Box flex={1} background={"neutral.white"}>
			{children}
		</Box>
	);
}
