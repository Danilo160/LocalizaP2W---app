import React,{useEffect} from "react";
import { styles } from "./Styles";
import { View, Text, Image, TouchableOpacity, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imagehome  from "../../../assets/image-home.png"
import loginIcon from "../../../assets/icons/login-icon.png"
import mapMarkerIcon from "../../../assets/icons/map-marker.png"

const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

export default function Home({navigation}){

    const backAction = () => {
        () => null
        return true;
    };

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
    
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const HeaderImage = () => {
        return(
            <View style={styles.header}>
                <Image style={styles.image} source={imagehome} resizeMode="contain"></Image>
            </View>
        )
    }

    const Title = () =>{
        return(
            <View style={styles.title}>
                <Text style={styles.text}><B>{'Seja bem-vindo(a).\n'}</B>{"O que deseja fazer?"}</Text>
            </View>
        )
    }


    const TitleRemake = () =>{
        return(

            <View style={styles.title}>
                <Text style={styles.text}><B>{"Boas vindas ao\nLocaliza P2W"}</B></Text>
                <Text style={styles.text2}>{"Encontre os melhores lugares para assistir os jogos da Copa do Mundo!"}</Text>
            </View>
        )
    }

    const ContainerButtonsRemake = () =>{
        return(
            <View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonPrimary} onPress={()=> navigation.navigate('login')}>
                        <View style={styles.buttonContainer2}>
                            <Image style={styles.imageButton} source={loginIcon}/> 
                            <Text style={styles.textButton}>Estabelecimento</Text>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary} onPress={()=> navigation.navigate('location')}>
                        <View style={styles.buttonContainer2}>
                            <Image style={styles.imageButton} source={mapMarkerIcon}/> 
                            <Text style={styles.textButton}>Localizar lugares</Text>
                        </View>
                </TouchableOpacity>
            </View>

            </View>
        )    
    }
    

    const ContainerButtons = () =>{
        return(
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonLocal} onPress={()=> navigation.navigate('location')}>
                        <Image style={styles.imageButton} source={mapmarker}/> 
                        <Text style={styles.textButton}>Localizar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonEmpresa} onPress={()=> navigation.navigate('login')}>
                        <Image style={styles.imageButton} source={mapplus}/>
                        <Text style={styles.textButton}>Empresa</Text>
                </TouchableOpacity>
            </View>
        )    
    }

    const TotalLocals = () =>{
        return(
        <View>
            <Text style={styles.textLocals}>{`Total de ${total} locais\ndisponíveis`}</Text>
        </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <HeaderImage/>
            <TitleRemake/>
            <ContainerButtonsRemake/>
            
        </SafeAreaView>
    )
}

