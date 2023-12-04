import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "./AuthProvider";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Routes = () => {
  const { user } = useContext(AuthContext);

  const initialRouteName = user ? "AppStack" : "AuthStack";

  return (
    <NavigationContainer>
      {initialRouteName === "AppStack" ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
/**/
/*
<NavigationContainer>
      <AppStack />
    </NavigationContainer>
     */
