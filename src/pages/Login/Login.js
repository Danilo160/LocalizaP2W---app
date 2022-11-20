import React, {useState, useEffect} from "react";
import { styles } from "./Styles";
import { View, Text, Image, Linking, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, BackHandler, ActivityIndicator } from "react-native";
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import imagelogin from './../../../assets/image-login.png'
import { ScrollView } from "react-native-gesture-handler";

export default function Login({navigation}){

    const [loading, setloading] = useState(false)
    
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    useEffect(()=>{
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => false)
        return () => backHandler
    },[])

    const verify = () =>{
        setloading(true)
        if(email===""|| senha===""){
            Alert.alert("Erro","Preencha os campos em branco!")
            setloading(false)
        }else{
        var data = JSON.stringify({
            email,
            password:senha,
  
          })
      
          var requestOptions = {
            method: 'POST',
            body: data,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            redirect: 'follow'
          };
          
          fetch("https://localiza-p2w-api.herokuapp.com/place/signIn", requestOptions)
            .then((res) => res.json())
            .then((data) => {
                if(data.message =="Place not found"){
                    Alert.alert("Falha ao autenticar","Email não encontrado na base de dados!")
                    setloading(false)
                }else{
                    if(data.message =="Invalid password"){
                        Alert.alert("Falha ao autenticar","Senha incorreta!")
                        setloading(false)
                    }else{
                        navigation.navigate("profile", {placeName: data.place.name})
                        setloading(false)
                    }
                    
                }   
            }).catch((err) => Alert.alert("Erro", "Erro no servidor!"))
        }
    }

    const HeaderImage = () => {
        return(
            <View style={styles.header}>
                <Image style={styles.image} source={imagelogin} resizeMode="contain"></Image>
            </View>
        )
    }

    const Title = () => {
        return(
            <View style={styles.title}>
                <Text style={styles.text}>{'Acesse a conta da empresa'}</Text>
            </View>
        )
    }

    const Acess = () =>{
        return(
            <View>
                <TouchableOpacity style={styles.button} onPress={verify} >
                    <View style={{display:"flex", flexDirection:"row", alignSelf:"center"}}>
                    <Text style={styles.textButton}>Acessar</Text>
                    {loading===true?<ActivityIndicator style={{marginLeft:10}} color="white" />: null}
                    </View>
                </TouchableOpacity>

                <View style={styles.containerRegister}>
                    <Text style={styles.textContainerRegister}>{'Ainda não tem acesso?'}</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('register')}>
                        <Text style={styles.textLink}>Criar Conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return(

        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container} > 
            <ScrollView>  
            <HeaderImage/>
            <View style={styles.sectionInput}>
                <TextInput
                    style={styles.input}
                    label="Email"
                    placeholder="Email"
                    value={email}
                    textContentType="emailAddress"
                    onChangeText={text => setEmail(text)}
                />
            </View>

            <View style={styles.sectionInput}>
                <TextInput
                    style={styles.input}
                    label="Senha"
                    placeholder="Senha"
                    secureTextEntry={true}
                    value={senha}
                    textContentType="password"
                    onChangeText={text => setSenha(text)}
                />
            </View>

            <Acess/>
            </ScrollView>

        </KeyboardAvoidingView>
    )
}
