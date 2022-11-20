//import mapmarker  from "../../../assets/map-marker-radius.png"
//import mapplus  from "../../../assets/map-plus.png"

import React from "react";
import { styles } from "./Styles";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imagehome  from "../../../assets/image-home.png"
import loginIcon from "../../../assets/icons/login-icon.png"
import mapMarkerIcon from "../../../assets/icons/map-marker.png"

const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>


const jogos = [
    { id: '1', value: 'Brasil X Suécia',km: "50.4 km", local:"Esquina da Maria", desc: " Localizado no Bairro São Francisco, trata de um ambiente espaçoso com capacidade de até 150 clientes, visão boa de um projetor de 70 polegadas.", hour:"16:00", date:"24/11" },
    { id: '2', value: 'Brasil X Suécia', km: "96.5 km", local:"Esquina do Zé",desc: " Localizado no Bairro São Francisco, trata de um ambiente espaçoso com capacidade de até 150 clientes, visão boa de um projetor de 70 polegadas.", hour:"16:00", date:"24/11" },
    { id: '3', value: 'Brasil X Suécia', km: "96.5 km", local:"Esquina do Zé",desc: " Localizado no Bairro São Francisco, trata de um ambiente espaçoso com capacidade de até 150 clientes, visão boa de um projetor de 70 polegadas.", hour:"16:00", date:"24/11" },
];

var total = jogos.length

export default function Home({navigation}){


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
                <TouchableOpacity style={styles.buttonPrimary} onPress={()=> navigation.navigate('login', {paramKey:jogos})}>
                        <View style={styles.buttonContainer2}>
                            <Image style={styles.imageButton} source={loginIcon}/> 
                            <Text style={styles.textButton}>Estabelecimento</Text>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary} onPress={()=> navigation.navigate('location', {paramKey:jogos})}>
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
                <TouchableOpacity style={styles.buttonLocal} onPress={()=> navigation.navigate('location', {paramKey:jogos})}>
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

