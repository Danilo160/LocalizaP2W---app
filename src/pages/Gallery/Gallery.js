import React, {useEffect,useState} from "react";
import { styles } from "./Styles";
import { View, Text, Image, TouchableOpacity,BackHandler, Alert, ActivityIndicator, ScrollView, Modal, Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageplus from "../../../assets/icons/image-plus.png"
import noimage from "../../../assets/icons/no-image.png"
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';



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

export default function Gallery({navigation, route}){



    const [loading, setloading] = useState(false)
    const [hide, setHide] = useState(false)
    const [position, setPosition] = useState(0)
    
    const [images, setImages] = useState([
        {"id":1, "image": noimage},
        {"id":2, "image": noimage},
        {"id":3, "image": noimage},
        {"id":4, "image": noimage},
        {"id":5, "image": noimage},
        {"id":6, "image": noimage},
    ])

        

    const backAction = () => {
        navigation.goBack()
        return true;
    };

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
    
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);



    const getImages = () =>{
        
        var requestOptions = {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*"

            },
            redirect: 'follow'
          };
            
            fetch(`https://localiza-p2w-api.vercel.app/place/galery/${route.params.placeId}`, requestOptions)
            .then((res)=> res.json())
            .then((data) => {
                  setHide(false)
                  setloading(false)
                  if(data[0]){
                    images[0].image = {uri: data[0].resource.secure_url}
                    setPosition(1)
                    setImages(images)
                  }

                  if(data[1]){
                    images[1].image = {uri: data[1].resource.secure_url}
                    setPosition(2)
                    setImages(images)
                  }

                  if(data[2]){
                    images[2].image = {uri: data[2].resource.secure_url}
                    setPosition(3)
                    setImages(images)
                  }

                  if(data[3]){
                    images[3].image = {uri: data[3].resource.secure_url}
                    setPosition(4)
                    setImages(images)
                  }

                  if(data[4]){
                    images[4].image = {uri: data[4].resource.secure_url}
                    setPosition(5)
                    setImages(images)
                  }

                  if(data[5]){
                    images[5].image = {uri: data[5].resource.secure_url}
                    setPosition(6)
                    setImages(images)
                  }
                
            }).catch((err) => Alert.alert("Erro", "Erro no servidor!"))
  }

    const uploadImage = (result) =>{
          const newImageUri =  "file:///" + result.uri.split("file:/").join("");
          const formdata = new FormData();
          formdata.append('placeId', route.params.placeId)
          formdata.append('imagem', {
            uri : newImageUri,
            type: mime.getType(newImageUri),
            name: newImageUri.split("/").pop()
          })
          setHide(false)
          
              var requestOptions = {
              method: 'POST',
              body: formdata,
              headers: {
                  "Content-Type": "multipart/form-data",
                  Accept: "application/json",
                  "Access-Control-Allow-Origin": "*",
                  "Authorization": "Bearer " + route.params.token
              },
              redirect: 'follow'
              };
              
              fetch(`https://localiza-p2w-api.vercel.app/place/addImageGalery`, requestOptions)
              .then((res)=> res.json())
              .then((data) => {
                    return null
              }).catch((err) => Alert.alert("Erro", "Erro no servidor!"))
    }

    const removeImage = () =>{
       
        setloading(true)
        setHide(true)
        var requestOptions = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + route.params.token
        },
        redirect: 'follow'
        };
        
        fetch(`https://localiza-p2w-api.vercel.app/place/clearGalery/${route.params.placeId}`, requestOptions)
        .then((res)=> res.json())
        .then((data) => {
            console.log(data)
            if(data.message === "Galeria zerada com sucesso."){
                setPosition(0)
                images[0].image = noimage
                images[1].image = noimage
                images[2].image = noimage
                images[3].image = noimage
                images[4].image = noimage
                images[5].image = noimage
                setImages(images)
                setloading(false)
                setHide(false)
            }else{
                Alert.alert("Sem imagem!", "Não há imagem para remover!")
                setloading(false)
                setHide(false)
            }

        }).catch((err) => Alert.alert("Erro", "Erro no servidor!"))
      

    }

    useEffect(()=>{
        setHide(true)
        setloading(true)
        getImages()
    },[images])


    const pickImageAsync = async () => {
        setHide(true)
        setloading(true)
        let result = await ImagePicker.launchImageLibraryAsync(options);
        
        
        if (!result.cancelled) { 
          setHide(false)
          setloading(false) 
          uploadImage(result)

          if(position<=5){
            images[position].image = {uri: result.uri}
            var newpos = position + 1
            setPosition(newpos)
            setImages(images)
          }else{
            Alert.alert("Erro ao adicionar imagem","Não é possível adicionar mais que 6 imagens!")
          }


            
        } else {
          console.log('You did not select any image.');
          setHide(false)
          setloading(false)
        }
      };


    

    const HeaderImage = () => {
        return(
            <View style={styles.header}>
                <TouchableOpacity onPress={pickImageAsync}>
                <Image source={imageplus} style={styles.buttonPhoto}></Image>
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
        <ScrollView>
            <HeaderImage/>
            <TouchableOpacity style={styles.buttonPhotoDelete} onPress={removeImage}>
            <View >
                <Text style={styles.textButton}>Remover fotos</Text>
            </View>
            </TouchableOpacity>
            <Modal transparent={true} visible={hide}>
            <View style={styles.modalContentForeground}>
                {loading===true?<ActivityIndicator style={{alignSelf:"center", top: "50%"}} size ={30} color="white" />: null}
            </View>
            </Modal>
            
            <View style={styles.container2}>
               {images.map((item,index)=>{
                    return(
                        <View style={styles.item} key={index}>
                            <Image source={item.image} style={styles.imageSelect}/>              
                        </View>
                        
                        )
            })}
            </View>


        </ScrollView>
        </SafeAreaView>
    )
}
