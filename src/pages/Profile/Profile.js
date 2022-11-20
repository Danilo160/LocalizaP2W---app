import React, {useEffect,useState} from "react";
import { styles } from "./Styles";
import { View, Text, Image, TouchableOpacity,BackHandler} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageprofile  from "../../../assets/icons/profile.png"
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibrary } from "react-native-image-picker";
import NativeUploady from "@rpldy/native-uploady";


const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>


export default function Profile({navigation, route}){

    const [selectedImage, setSelectedImage] = useState(null);


    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.cancelled) {
          console.log(result.uri)
          setSelectedImage(result.uri);
        } else {
          console.log('You did not select any image.');
        }
      };


    useEffect(()=>{
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    },[])

    const Title = () =>{
        return(
            <View style={styles.title}>
                <Text style={styles.text}>{'Usuário administrador'}</Text>
                <Text style={styles.text}>Email: {route.params.paramKey}</Text>
                <TouchableOpacity style={styles.buttonPrimary} onPress={()=> navigation.navigate('login')}>
                    <Text style={styles.textButton}>Sair</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const Upload = () => {

          return (
            <View style={styles.buttonPhotoContainer}>
            <TouchableOpacity style={styles.buttonPhoto} onPress={pickImageAsync}>
            <View style={styles.buttonContainer2}>
                <Text style={styles.textButton}>Atualizar foto</Text>
            </View>
            </TouchableOpacity>
            </View>
          )
      };
    
    const TitleRemake = () =>{
        return(

            <View style={styles.title}>
                <Text style={styles.text}><B>{'Olá, ' + route.params.placeName}</B></Text>
            </View>
        )
    }

    const HeaderImage = () => {
        return(
            <View style={styles.header}>
                {selectedImage===null?<Image style={styles.imageSelect} source={imageprofile} resizeMode="contain"></Image>:
                <Image style={styles.imageSelect} source={{uri:selectedImage}} resizeMode="contain"></Image>}
            </View>
        )
    }

    const ContainerButtons = () =>{
        return(
            <View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonPrimary} onPress={()=> navigation.navigate('login')}>
                        <View style={styles.buttonContainer2}>
                            <Text style={styles.textButton}>Cadastrar Entretenimento</Text>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonPrimary} onPress={()=> navigation.navigate('login')}>
                        <View style={styles.buttonContainer2}>
                            <Text style={styles.textButton}>Cadastrar imagens</Text>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonPrimary} onPress={()=> navigation.navigate('login')}>
                        <View style={styles.buttonContainer2}>
                            <Text style={styles.textButton}>Lista de jogos</Text>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary} onPress={()=> navigation.navigate('login')}>
                        <View style={styles.buttonContainer2}>
                            <Text style={styles.textButton}>Sair</Text>
                        </View>
                </TouchableOpacity>
            </View>

            </View>
        )    
    }

    return(
        <SafeAreaView style={styles.container}>
            <TitleRemake/>
            <HeaderImage/>
            <Upload/>
            <ContainerButtons/>
        </SafeAreaView>
    )
}