import React, {useEffect, useState} from "react";
import { View, Text, Alert,TouchableOpacity, Image, ActivityIndicator, Platform,KeyboardAvoidingView, Linking, Share, Modal, BackHandler } from "react-native";
import { TextInput } from 'react-native-paper';
import * as Location from "expo-location";
import {styles} from "./Styles"
import { ScrollView } from "react-native-gesture-handler"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import axios from "axios"
import notsearch from "../../../assets/icons/notsearch.png"
import filterOff from "../../../assets/icons/filter_off.png"
import filterOn from "../../../assets/icons/filter_on.png"
import whatsapp from "../../../assets/icons/whatsapp.png"
import share from "../../../assets/icons/share.png"

export default function Home({navigation, route}){

    const [hide, setHide] = useState(false)
    const [loading, setloading] = useState(false)
    const [selecao, setSelecao] = useState("")
    const [loc, setLocal] = useState("")
    const [image, setImage] = useState(filterOff)


    const backAction = () => {
        navigation.goBack()
        return true;
    };

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
    
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);


    const send = async (local) =>{
        await Linking.openURL(`https://api.whatsapp.com/send?phone=558899080440&text=Olá!%20Encontrei%20o%20${local}%20pelo%20LocalizaP2W.%20Gostaria%20de%20mais%20informações!`)
    
    }

    const onShare = async () => {
        await Share.share({
            message:
              'React Native | A framework for building native apps using React',
          })
        
    }


    const [locals, setLocals] = useState([])


    const visible = () =>{
        if(hide===false){
            setImage(filterOn)
            setHide(true)
        }else{
            setImage(filterOff)
            setHide(false)
        }
    }
    
    const LocationComplete = () =>{

     return(
    
        <GooglePlacesAutocomplete
            styles={{
                textInputContainer:{
                    width: '100%',
                    backgroundColor: '#fff',
                    padding:8,
                    borderRadius:15
                },
            }}
            listViewDisplayed={false}
            enablePoweredByContainer={false}
            minLength={2}
            autoFocus={false}
            returnKeyType={'default'}
            fetchDetails={true}
            placeholder='Local'
            onPress={(data, details = null) => {
                    setLocal(data.description)
                    
            }}
            textInputProps={{
                value: loc,
                onChange: text => setLocal(text),
                
            }}
            
            query={{
                key: 'AIzaSyAa_LL4_ubZs6Ofpfl33buJEVfexaf8_mE',
                language: 'pt-BR',
            }}
        />
        
     )
    }

    const getLocal = (latitude,longitude) =>{
        axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`).then(({ data }) => {
          
            if(data){
               var local = data.address.road +" - " + data.address.suburb +", " + data.address.city +" - " + data.address.state +", " + data.address.country
               setLocal(local)
               getEvents(latitude,longitude)
            }
            else{
              Alert.alert("Erro","Local não encontrado!")
            }
    
    
          })
          .catch(err => { 
            Alert.alert("Erro","Local não encontrado!")
            
          })
    }

    const getEvents = (latitude,longitude) =>{
        const url = `https://localiza-p2w-api.vercel.app/entertainment/list?lng=${longitude}&lat=${latitude}&selecao=${selecao}`
        setImage(filterOff)
        setHide(false)
        setloading(true)

        var requestOptions = {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            redirect: 'follow'
          };
          
          fetch(url, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setLocals(data)
                setloading(false)
            }).catch((err) => Alert.alert("Erro", "Erro no servidor!"))
    }

    const getNewCoords = () =>{

        axios.get(`https://geocode.maps.co/search?q=${loc}`).then(({ data }) => {
          
            if(data){
                getEvents(data[0].lat, data[0].lon)
            }
            else{
              Alert.alert("Erro","Local não pode ser vazio!")
            }
    
    
          })
          .catch(err => { 
            Alert.alert("Erro","Local não encontrado!")
            
          })
        
    }

    const getLocationAsync = async () => {
        try{
        const { status } = await Location.requestForegroundPermissionsAsync();

        
        if (status !== 'granted') {
          setloading(false)
          console.log('Permission to access location was denied');
        }
          const location = await Location.getCurrentPositionAsync({});
          if (location){
              const latitude = location.coords.latitude
              const longitude = location.coords.longitude
              getLocal(latitude,longitude)
          }else{
            setloading(false)
            setLocal("")     
          }
      }catch(error){
          console.log(error)
          setloading(false)
          setLocal("")    
      }  


      }

    useEffect(() => {
     console.log("Obtendo coordenadas...");
     setloading(true)
     setLocal('Buscando localização...')
     getLocationAsync();
    }, []);


    const Header = () =>{
        return(
            <View style={styles.headerFilter}>
                <Text style={styles.textFilter}>Filtrar Locais</Text>
                <TouchableOpacity onPress={visible}>
                <Image source={image} style={{width:26, height:28}}/>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={30} > 
            <Header/>

            <Modal animationType='fade' transparent={true} visible={hide}>
                <View style={{backgroundColor:"#73388A", borderBottomEndRadius:20, borderBottomStartRadius:20, height: 500}}>
                <Header/>
                <Text style={styles.text}>{`Pesquisar por:`}</Text>

                <View style={styles.sectionInput}>
                <TextInput
                    style={styles.input}
                    label="Seleção/ Evento"
                    placeholder="Insira Time/ Seleção/ Evento"
                    value={selecao}
                    onChangeText={text => {setSelecao(text)}}
                />
                </View>


                <View style={styles.sectionInputPlace}>
                <View style={{ width:"100%", height:150}}>
                    <LocationComplete/>
                </View>
                </View>

                <TouchableOpacity style={styles.buttonPrimary} onPress={getNewCoords}>
                    <View>
                        <Text style={styles.textButton}>Aplicar</Text>
                    </View>
                </TouchableOpacity>
                </View>
                
            </Modal>      

            <ScrollView>

            <View>
            <Text style={styles.text}>{`Locais Disponíveis`}</Text>
            </View>
            
            {loading===true?<ActivityIndicator style={{alignSelf:"center", marginTop:"60%"}} color="white" size={30} />
            :
            locals.length === 0 ? 
            <View style={styles.container2}>
                <Image style={{marginTop:"50%", width:150, height:150}} source={notsearch}/>
            </View>
            :
            <View style={styles.container2}>
               {locals.map((item,index)=>{
                    return(
                        <View style={styles.item} key={index}>
                            <View style={styles.sectionSpaceBetween}>
                                <Text style={styles.textLocals}>{item.title}</Text>
                                <Text style={styles.textLocals}>{item.starDate.slice(11,13) + ":" + item.starDate.slice(14,16)}</Text>
                            </View>
                            <View style={styles.sectionSpaceBetween}>
                                <Text style={styles.textLocals1}>{item.place.name}</Text>
                                <Text style={styles.textLocals1}>{item.starDate.slice(8,10)+"/" + item.starDate.slice(5,7)}</Text>
                            </View>
                            <Text style={styles.textLocals2}>Distância: { item.distace + " km"/* item.distace<1?item.distace*1000 + " m": item.distace + " km" */}</Text>
                            <Text style={styles.textLocals2}>Descrição: {item.description}</Text>
                            
                            <TouchableOpacity onPress={()=> Alert.alert("Em breve...")}>
                                <Text style={styles.textLocals3}>Informações do local</Text>
                            </TouchableOpacity>

                            <View style={styles.divShare}>
                                <View style={styles.sectionSpaceBetween}>
                                <TouchableOpacity onPress={() => send(item.place.name)}>
                                <Image source={whatsapp}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={onShare}>
                                <Image source={share}/>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        )
            })}
            </View>}
            
            </ScrollView>
            
        </KeyboardAvoidingView>
       
    )
}