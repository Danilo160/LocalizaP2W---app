import React, {useEffect,useState} from "react";
import { styles } from "./Styles";
import { View, Text, Image, TouchableOpacity,BackHandler, Alert, ActivityIndicator, ScrollView, Modal} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageprofile  from "../../../assets/icons/profile.png"
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime'


const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

const options = {
    title: 'Select Image',
    type: 'library',
    options: {
        maxheight:200,
        maxwidth:200,
        selectionLimit: 1, 
        mediaType: 'photo',
        includeBase64: false,

    }
}

export default function Profile({navigation, route}){

    const [loading, setloading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(route.params.photo);
    const [hide, setHide] = useState(false)

    const backAction = () => {
        ()=> null
        return true;
    };

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
    
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    
    const openModal = () =>{
      setHide(true)
    }

    const closeModal = () =>{
      setHide(false)
    }

    const removeImage = () =>{
        setloading(true)
        setHide(false)

        var data = JSON.stringify({
            placeId: route.params.placeId
        })
          
        var requestOptions = {
        method: 'PUT',
        body: data,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + route.params.token
        },
        redirect: 'follow'
        };
        
        fetch("https://localiza-p2w-api.vercel.app/place/removeImage", requestOptions)
        .then((res)=> res.json())
        .then((data) => {
            if(data.message === "Succes in remove image"){
                setSelectedImage("")
            }else{
                Alert.alert("Sem imagem!", "Não há imagem para remover!")
            }

            setloading(false)
        }).catch((err) => Alert.alert("Erro", "Erro no servidor!"))
      

    }

    const pickImageAsync = async () => {

        let result = await ImagePicker.launchImageLibraryAsync(options);
    
        if (!result.cancelled) {
          setloading(true)
          const newImageUri =  "file:///" + result.uri.split("file:/").join("");
          const formdata = new FormData();
          formdata.append('placeId', route.params.placeId)
          formdata.append('imagemPerfil', {
            uri : newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
          })
          setHide(false)
          
              var requestOptions = {
              method: 'PUT',
              body: formdata,
              headers: {
                  "Content-Type": "multipart/form-data",
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Authorization": "Bearer " + route.params.token
              },
              redirect: 'follow'
              };
              
              fetch("https://localiza-p2w-api.vercel.app/place/modifyImage", requestOptions)
              .then((res)=> res.json())
              .then((data) => {
                  setSelectedImage(data.resource.secure_url);
                  setloading(false)
              }).catch((err) => Alert.alert("Erro", "Erro no servidor!"))
            
        } else {
          console.log('You did not select any image.');
        }
      };

    const Settings = () =>{
      return(
        <Modal animationType="fade" transparent={true} visible={hide}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleModal}>Escolha uma opção</Text>
            <TouchableOpacity onPress={closeModal}>
            <View >
                <Text style={styles.titleModal}>Fechar</Text>
            </View>
           </TouchableOpacity>
          </View>

          <View style={styles.pickerContainer}>
          <TouchableOpacity onPress={pickImageAsync}>
            <View style={styles.buttonModal}>
                <Text style={styles.textButton}>Mudar foto</Text>
            </View>
           </TouchableOpacity>

           <TouchableOpacity onPress={removeImage}>
            <View style={styles.buttonModal}>
                <Text style={styles.textButton}>Remover foto</Text>
            </View>
           </TouchableOpacity>
          </View>

        </View>
      </Modal>  
      )     
    }

    const Upload = () => {

          return (
            <View style={styles.buttonPhotoContainer}>
            <TouchableOpacity style={styles.buttonPhoto} onPress={openModal}>
            <View >
                {loading===true?<ActivityIndicator style={{alignSelf:"center"}} color="white" />: null}
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
                {selectedImage===''?<Image style={styles.imageSelect} source={imageprofile} resizeMode="contain"></Image>:
                <Image style={styles.imageSelect} source={{uri:selectedImage}} resizeMode="cover"></Image>}
            </View>
        )
    }

    const ContainerButtons = () =>{
        return(
            <View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonPrimary} onPress={()=> navigation.navigate('entertainment', {placeId: route.params.placeId, token: route.params.token})}>
                        <View>
                            <Text style={styles.textButton}>Cadastrar Entretenimento</Text>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonPrimary} onPress={()=> navigation.navigate('gallery', {placeId: route.params.placeId, token: route.params.token})}>
                        <View>
                            <Text style={styles.textButton}>Cadastrar imagens</Text>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonPrimary} onPress={()=> navigation.navigate('gamelist', {placeId: route.params.placeId, token:route.params.token})}>
                        <View>
                            <Text style={styles.textButton}>Lista de jogos</Text>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSecondary} onPress={()=> navigation.navigate('login')}>
                        <View>
                            <Text style={styles.textButton}>Sair</Text>
                        </View>
                </TouchableOpacity>
            </View>

            </View>
        )    
    }

    return(
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <TitleRemake/>
            <HeaderImage/>
            <Upload/>
            <ContainerButtons/>
            <Settings/>
        </ScrollView>
        </SafeAreaView>
    )
}