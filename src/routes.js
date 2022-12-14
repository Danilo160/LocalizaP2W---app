import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./pages/Home/Home";
import Location from "./pages/Location/Location";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Entertainment from "./pages/Entertainment/Entertainment";
import GameList from "./pages/GameList/GameList";
import Gallery from "./pages/Gallery/Gallery";

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
                headerStyle:{backgroundColor:"#73388A"},
                headerTintColor:"#fff",
                headerShadowVisible:false,
                headerShown:false
            
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

                <Stack.Screen 
                name = "entertainment" 
                component={Entertainment} 
                options={{ title: 'Cadastrar entretenimento', 
                headerStyle:{backgroundColor:"#612F74"},
                headerTintColor:"#fff",
                headerShadowVisible:false,
                }} />

                <Stack.Screen 
                name = "gamelist" 
                component={GameList} 
                options={{ title: 'Lista de jogos', 
                headerStyle:{backgroundColor:"#612F74"},
                headerTintColor:"#fff",
                headerShadowVisible:false,
                }} />

                <Stack.Screen 
                name = "gallery" 
                component={Gallery} 
                options={{ title: 'Adicionar imagens do local', 
                headerStyle:{backgroundColor:"#612F74"},
                headerTintColor:"#fff",
                headerShadowVisible:false,
                }} />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;