import React, {useEffect, useState} from "react";
import { View, Text, Alert,TouchableOpacity, Image, ActivityIndicator, Platform,KeyboardAvoidingView, Linking, Share, Modal, BackHandler } from "react-native";
import { TextInput } from 'react-native-paper';
import * as Location from "expo-location";
import {styles} from "./Styles"
import { ScrollView} from "react-native-gesture-handler"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import axios from "axios"
import imageprofile  from "../../../assets/icons/profile.png"
import notsearch from "../../../assets/icons/notsearch.png"
import filterOff from "../../../assets/icons/filter_off.png"
import filterOn from "../../../assets/icons/filter_on.png"
import windowclose from "../../../assets/icons/window-close.png"
import mapmarker from "../../../assets/icons/marker-map.png"
import logowhats from "../../../assets/icons/logo-whats.png"
import whatsapp from "../../../assets/icons/whatsapp.png"
import share from "../../../assets/icons/share.png"
import noimage from "../../../assets/icons/no-image.png"

export default function Home({navigation, route}){

    const [locals, setLocals] = useState([])
    const [hide, setHide] = useState(false)
    const [hideView, setHideView] = useState(false)
    const [loading, setloading] = useState(false)
    const [selecao, setSelecao] = useState("")
    const [loc, setLocal] = useState("")
    const [imageView, setImageView] = useState("")
    const [image, setImage] = useState(filterOff)
    const [info, setInfo] = useState({isopen: false, place:null})
    const [images, setImages] = useState({pullimages:false, imgs: []})


    const backAction = () => {
        navigation.goBack()
        return true;
    };

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
    
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);


    const send = async (telefone, local) =>{
        await Linking.openURL(`https://api.whatsapp.com/send?phone=${telefone}&text=Olá!%20Encontrei%20o%20${local}%20pelo%20LocalizaP2W.%20Gostaria%20de%20mais%20informações!`)
    
    }

    const onShare = async (evento, local) => {
        await Share.share({
            message:
              `Vamos assistir ${evento} na/no ${local}! ⚽⚽ \n\n linkficticio.com`,
          })
        
    }

    const moreInformations = (place)=>{
        getImages(place._id)
        setInfo({isopen:true, place:place})
    }

    const lessInformations = ()=>{
      setInfo({isopen:false, place:null})
    }

    const openViewImage = (imagem)=>{
      setImageView(imagem)
      setHideView(true)
  }

    const closeViewImage = ()=>{
      setHideView(false)
    }

    const getImages = (id) =>{
    
        var requestOptions = {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*"

            },
            redirect: 'follow'
          };
            
            fetch(`https://localiza-p2w-api.vercel.app/place/galery/${id}`, requestOptions)
            .then((res)=> res.json())
            .then((data) => {
                  const list = []
                  data.map(e=> list.push(e.resource.secure_url))
                
                  setImages({pullimages:true, imgs:list})
            }).catch((err) => Alert.alert("Erro", "Erro no servidor!"))
  }


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
                <View style={styles.modalContentForeground}>
                <View style={styles.modalContentFilter}>
                <Header/>
                <Text style={styles.textFilterSearch}>{`Pesquisar por:`}</Text>

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
                </View>
                
            </Modal>  


            <Modal transparent={true} visible={info.isopen}>
                <View style={styles.modalContentForeground}>
                <View style={styles.modalContentLocal}>
                    <View style={styles.windowClose}>
                    <TouchableOpacity onPress={lessInformations}>
                        <Image source={windowclose}/>
                    </TouchableOpacity>
                    </View>

                    <View style={styles.textModalTitle}>
                    
                    {info.place?.resource?
                    <Image source={{uri:info.place.resource.secure_url}} style={{width:50, height:50, borderRadius:15}}/>
                    : <Image source={imageprofile} style={{width:50, height:50, borderRadius:15}}/>}
                    <Text style={styles.titleLocal}>{info.place?.name}</Text>
                    </View>

                    <View style={styles.textModal}>
                    <Image source={mapmarker} style={{width:35, height:35}}/>
                    <Text style={styles.textLocalModal}>{
                         info.place?.location.address + ", Nº " + info.place?.location.number + " - " + info.place?.location.district + ", " +
                         info.place?.location.city + " - " + info.place?.location.uf + " - " + info.place?.location.cep
                    }</Text>
                    </View>

                    <View style={styles.textModal}>
                    <Image source={logowhats} style={{width:35, height:35}}/>
                    <Text style={styles.textLocalModal}>{info.place?.whatsapp}</Text>
                    </View>

                    <Text style={styles.lableImages}>Imagens do Local</Text>

                    <View style={styles.containerImages}>
                        {images.pullimages?
                              images.imgs.map((item,index)=>{
                                return(
                                    <View style={styles.item2} key={index}>
                                        <TouchableOpacity onPress={()=> openViewImage(item)}>
                                        <Image source={{uri:item}} style={styles.imageSelect}/> 
                                        </TouchableOpacity>             
                                    </View>
                                    )        
                        })
                        : <ActivityIndicator style={{alignSelf:"center", marginTop:"50%"}} size ={30} color="white" />
                        }
                    </View>
                </View>
                </View>
            </Modal>    

            <Modal transparent={true} visible={hideView}>
                <View style={styles.modalContentForeground}>
                <View style={styles.modalContentLocal}>
                    <View style={styles.windowClose}>
                    <TouchableOpacity onPress={closeViewImage}>
                        <Image source={windowclose}/>
                    </TouchableOpacity>
                    </View>
                    <Image source={{uri:imageView}} style={{width:"90%", height:"80%", alignSelf:"center", borderRadius:10}}/>
                </View>
                </View>
            </Modal>    

            <ScrollView>

            
            {loading===true?<ActivityIndicator style={{alignSelf:"center", marginTop:"80%"}} color="white" size={30} />
            :
            !locals.length ? 

            <View style={styles.container2}>
                <Text style={styles.text}>{`Nenhum local encontrado!`}</Text>
                <Image style={{marginTop:"50%", width:150, height:150}} source={notsearch}/>
            </View>
            :
            <View style={styles.container2}>
               <Text style={styles.text}>{`Locais Disponíveis`}</Text>
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
                            <Text style={styles.textLocals2}>Distância: { item.distace + " km"}</Text>
                            <Text style={styles.textLocals2}>Descrição: {item.description}</Text>
                            
                            <TouchableOpacity onPress={()=>moreInformations(item.place)}>
                                <Text style={styles.textLocals3}>Informações do local</Text>
                            </TouchableOpacity>

                            <View style={styles.divShare}>
                                <View style={styles.sectionSpaceBetween}>
                                <TouchableOpacity onPress={() => send(item.place.whatsapp,item.place.name)}>
                                <Image source={whatsapp}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => onShare(item.title, item.place.name)}>
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