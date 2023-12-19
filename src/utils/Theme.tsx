import { Fonts } from "./Fonts";

export const Theme = {
	colors: {
        white: '#FFFFFF',
        black: '#000000',
        alternativeText: '#1ABC9C',
        alternativeLink: '#FA7A2B',
        lightText: '#FFFFFF',
        mutedText: '#C7C9D9',
        darkText: '#303030',
        background: '#f8f8fe',
        primary:{
            100: "#306EED",
            200: "#5F87EC",
            600: "#3A71E1",
            700: "#224ea8",
            800: "#224ea8",
            900: "#2972fe1A",
            1000: "#2972feB3",
            2000: "#0170F5"
        },
        secondary:{
            100: "#0082CD",
            600: "#0477ba",
            700: "#014f7d",
            800: "#014f7d",
        },
        ligth:{
            100: "##F6F7FA",
            200: "#ECECEC",
            600: "#fcfcfc",
            700: "#d4d4d4",
            800: "#d4d4d4",
        },
		brand: {
			primary: "#DA673A",
			secondary: "#0082CD",
            principal: "#0170F5"
		},
		neutral: {
			gray: {
				100: "#F6F7FA",
				300: "#9D9FA0",
			},
			white: "#ffffff",
		},
        text: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          },
	},
	config: {
		initialColorMode: "light",
	},
	components: {
		Button: {
			variants: {
				solid: {
					rounded: "md",
                    backgroundColor: "red,"
				},
			},

		},
        
		Input: {
			defaultProps: {
				color: "#000",
				backgroundColor: "white",
				placeholderTextColor: "#C0C0C0",
                borderWidth: 0,
				borderBottomWidth: 1,
                borderBottomColor: "#D4D4D4",
				fontSize: "15px",
				fontWeight: "400",
				_ios: {
					py: 3,
				},
			},
		},
	},
	...Fonts,
};
