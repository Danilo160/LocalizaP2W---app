import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from "expo-splash-screen";
import Routes from "./src/routes"

//import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
//SplashScreen.preventAutoHideAsync();

export default function App() {

  /*let [fontsLoaded] = useFonts({
    Montserrat_400Regular, 
    Montserrat_500Medium, 
    Montserrat_700Bold
  })

  if (fontsLoaded) {
      SplashScreen.hideAsync();
  }

  if (!fontsLoaded) return null;*/

  return (
    <>
      <StatusBar style="light" backgroundColor="#612F74" translucent={false} />
      <Routes/>
    </>
  );
}



