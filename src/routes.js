import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/Home/Home";
import Location from "./pages/Location/Location";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";

const Stack = createNativeStackNavigator();

function Routes(){

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="home" screenOptions={{
                animation: "fade_from_bottom", animationDuration:5000
                
                
            }}>
                <Stack.Screen name = "home" component={Home} options={{headerShown:false}} />
                <Stack.Screen 
                name="location" 
                component={Location}
                options={{ title: '', 
                headerStyle:{backgroundColor:"#612F74"},
                headerTintColor:"#fff",
                headerRight: () => (
                    <Text style={{color:"#fff", fontSize:15, fontWeight:"bold"}}>Localiza P2W</Text>
                ),
                headerShadowVisible:false,
            
                }} />
                <Stack.Screen 
                name = "login" 
                component={Login} 
                options={{ title: 'Acesse sua conta', 
                headerStyle:{backgroundColor:"#612F74"},
                headerTintColor:"#fff",
                headerShadowVisible:false}} />

                <Stack.Screen 
                name = "register" 
                component={Register} 
                options={{ title: 'Crie sua conta', 
                headerStyle:{backgroundColor:"#612F74"},
                headerTintColor:"#fff",
                headerShadowVisible:false}} />

                
                <Stack.Screen 
                name = "profile" 
                component={Profile} 
                options={{ title: '', 
                headerStyle:{backgroundColor:"#612F74"},
                headerTintColor:"#fff",
                headerShadowVisible:false,
                headerShown:false
                }} />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;