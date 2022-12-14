import React, {useEffect, useState} from "react";
import { styles } from "./Styles";
import { View, Text, Image, TouchableOpacity, Alert, ActivityIndicator,BackHandler} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import buttonPlus from "../../../assets/icons/plus.png"
import buttonTrash from "../../../assets/icons/trash-can-outline.png"
import notsearch from "../../../assets/icons/notsearchevents.png"

export default function GameList({navigation, route}){

    const backAction = () => {
        navigation.goBack()
        return true;
    };

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
    
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const [loading, setloading] = useState(false)

    const [locals, setLocals] = useState([])
    const [refresh, setRefresh] = useState(0)

    const getEntertainment = () =>{
        setloading(true)
        var requestOptions = {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + route.params.token
          },
          redirect: 'follow'
        };
        
        fetch(`https://localiza-p2w-api.vercel.app/entertainment/list/${route.params.placeId}`, requestOptions)
          .then((res) => res.json())
          .then((data) => {
                setloading(false)
                setLocals(data)
           
          }).catch((err) => Alert.alert("Erro", "Erro no servidor!"))
      }

      const deleteEntertainment = (id) =>{
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
        
        fetch(`https://localiza-p2w-api.vercel.app/entertainment/${id}`, requestOptions)
          .then((res) => res.json())
          .then((data) => {
                if(data.message==="Delete with success"){
                  getEntertainment()
                }else{
                  Alert.alert("Erro ao deletar", "Houve um problema ao deletar! Tente novamente!")
                }
                
           
          }).catch((err) => Alert.alert("Erro", "Erro no servidor!"))
      }
    
      useEffect(()=>{
        navigation.addListener('focus', () => {
          getEntertainment()
        });
        
      },[navigation])


    return(
        <View style={styles.container}>
        <ScrollView>
        
        {loading===true?<ActivityIndicator style={{alignSelf:"center", marginTop:"80%"}} color="white" size={30} />
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
                            <Text style={styles.textEvent}>{item.title}</Text>
                            <TouchableOpacity onPress={()=>deleteEntertainment(item._id)} ><Image source={buttonTrash} style={{marginTop:20}}/></TouchableOpacity>
                        </View>
                        <View style={styles.sectionSpaceBetween}>
                            <Text style={styles.textDateHour}>
                                {item.starDate.slice(8,10)+"/" + item.starDate.slice(5,7) +
                                 "-" + item.starDate.slice(11,13) + ":" + item.starDate.slice(14,16)
                                }
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#04D361',
                                borderBottomWidth: 1,
                         }}
                        />
                       
                    </View>
                    )
        })}
        </View>}
        
        </ScrollView>
        <View style={{padding:20, justifyContent:"flex-end", display:"flex", flexDirection:"row"}}>
            <TouchableOpacity onPress={()=> navigation.navigate('entertainment', {placeId: route.params.placeId, token:route.params.token})}>
                <Image source={buttonPlus}/>
            </TouchableOpacity>
        </View>
        </View>
    )
}
