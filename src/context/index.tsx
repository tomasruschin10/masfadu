import { createContext, useContext, useState } from "react";

//COMO LUCE Y QUE EXPONE CONTEXT
export interface AuthContextProps {
  navigationEvent: string;
  setNavigationEvent: (satring) => void;
}
//CREAR CONTEXTO
export const AuthContext = createContext({} as AuthContextProps);

//PROVEEDOR DEL ESTADO
export const NavigationProvider = ({ children }: { children: any }) => {
  const [eventNav, setEventNav] = useState<string>("inicio");

  const setEventNavCustom = (state: string) => {
    setEventNav(state);
  };
  return (
    <AuthContext.Provider
      value={{
        navigationEvent: eventNav,
        setNavigationEvent: setEventNavCustom,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useEventNavigation = () => useContext(AuthContext);
