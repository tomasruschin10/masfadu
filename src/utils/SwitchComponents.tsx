import { Text } from "native-base";
import AboutSubject from "../screens/AboutSubject/AboutSubject";
import Config from "../screens/Config/Config";
import ChangeCareer from "../screens/Config_ChangeCareer/ChangeCareer";
import ChangePassword from "../screens/Config_ChangePassword/ChangePassword";
import EditProfile from "../screens/Config_EditProfile/EditProfile";
import Suggestions from "../screens/Config_Suggestions/Suggestions";
import CoursesAndWorkshops from "../screens/CoursesAndWorkshops/CoursesAndWorkshops";
import JobOffers from "../screens/JobOffers/JobOffers";
import LostObjects from "../screens/Lostobjects/LostObjects";
import Notificaciones from "../screens/Notificaciones/Notificaciones";
import { PolicyPrivacity } from "../screens/policy-privacity/PolicyPrivacity";
import ResourcesAndTools from "../screens/Resourcesandtools/ResourcesAndTools";
import SubjectOpinions from "../screens/Subjectopinion/SubjectOpinions";

export default function SwitchComponents({ component, route, navigation }) {
  console.log(
    "🚀 ~ file: SwitchComponents.tsx:17 ~ SwitchComponents ~ component:",
    component
  );
  switch (component) {
    case "Escribinos tu sugerencia":
      return <Suggestions route={route} navigation={navigation} />;
    case "Editar Perfil":
      return <EditProfile route={route} navigation={navigation} />;
    case "Cambiar contraseña":
      return <ChangePassword route={route} navigation={navigation} />;
    case "Cambiar de carrera":
      return <ChangeCareer route={route} navigation={navigation} />;
    case "Ofertas Laborales":
      return (
        <JobOffers
          route={route}
          navigation={navigation}
          mainTitle={component}
        />
      );
    case "Recursos y herramientas":
      return <ResourcesAndTools route={route} navigation={navigation} />;
    case "Opiniones de materias":
      return (
        <SubjectOpinions
          route={route}
          navigation={navigation}
          mainTitle={component}
        />
      );
    case "Publicar":
      return (
        <SubjectOpinions
          route={route}
          navigation={navigation}
          mainTitle={component}
        />
      );
    case "Cursos, charlas y workshops":
      return (
        <CoursesAndWorkshops
          route={route}
          navigation={navigation}
          mainTitle={component}
        />
      );
    case "Materias":
      return <AboutSubject value={"5"} route={route} navigation={navigation} />;
    case "Objetos perdidos":
      return <LostObjects route={route} navigation={navigation} />;
    case "Notificaciones":
      return <Notificaciones route={route} navigation={navigation} />;
    case "Cuenta":
      return <Config value={"5"} route={route} navigation={navigation} />;
    case "Politica de privacidad":
      return <PolicyPrivacity />;
    default:
      return <Text mx="5">Nada Por aquí!</Text>;
  }
}
