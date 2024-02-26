import React, { useEffect, useRef, useState } from "react";
import { Box, Icon } from "native-base";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CSSTransition } from "react-transition-group";
import { createRoot } from "react-dom/client";
import { Container, Button } from "react-bootstrap";
import { TouchableOpacity } from 'react-native';
import { Alert as Alerts } from "react-bootstrap";
/* import './style.css' */

const Alert = ({ type, message, closeAlert }) => {
  const [show, setShow] = useState(false);

  const [showButton, setShowButton] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const nodeRef = useRef(null);

  let color;
  let icon;
  switch (type) {
    case "success":
      color = '#BAEDE1';
      icon = "check";
      break;
    case "warning":
      color = '#FFEACA'

      icon = "warning";
      break;

    case "info":
      color =  '#CDEDF6'
      icon = "info";
      break;
    case "error":
      color =  '#FFCACA';
      icon = "warning";
      break;
    default:
      color =  '';
  }

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      handleAlertClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleAlertClose = () => {
    setShow(false);   
  };

  return (
    <CSSTransition
      in={show}
      nodeRef={nodeRef}
      timeout={300}
      classNames="alert"
      unmountOnExit
    >
<View
  style={{
    backgroundColor:  `${color}`,
    borderWidth: 1,
    borderColor: "#d6e9c6",
    padding: 10,
    display: "flex",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
  }}
>
  <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
    <MaterialIcons name={icon} size={20} color="black" />
    <Text style={{ marginLeft: 25, color: "black", flexGrow: 1 }}>
      {message}
    </Text>
      <MaterialIcons
        name="close"
        size={20}
        color="black"   
      />
 
  </View>
</View>
    </CSSTransition>
  );
};

export default Alert;
