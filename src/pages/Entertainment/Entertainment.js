import React, {useState, useEffect} from "react";
import { styles } from "./Styles";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, BackHandler} from "react-native";
import { TextInput } from 'react-native-paper';
import { FlatList, ScrollView } from "react-native-gesture-handler";
import DatePicker from 'react-native-modern-datepicker';

export default function Entertainment({navigation, route}){


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

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [selectedDate, setSelectedDate] = useState('Selecione a data e hora');

    const verify = () =>{
        setloading(true)
        if(title ==="" || desc==="" || selectedDate==="Selecione a data e hora"){
          Alert.alert("Falha ao registrar!", "Preencha os campos em branco!")
          setloading(false)
          
        }else{
          register()
        }
    }

    const register = () =>{
        var data = JSON.stringify({
            title,
            description: desc,
            starDate: selectedDate,
            place: route.params.placeId
  
        })
    
        var requestOptions = {
          method: 'POST',
          body: data,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + route.params.token
          },
          redirect: 'follow'
        };
        
        fetch("https://localiza-p2w-api.vercel.app/entertainment/register", requestOptions)
          .then((res) => res.json())
          .then((data) => {

                Alert.alert("Cadastrado com sucesso!", "Deseja cadastrar outro?",[
                    {
                      text: "Não",
                      onPress: ()=>  navigation.navigate('gamelist', {placeId: route.params.placeId, token:route.params.token}),
                      style: "cancel"
                    },
                    { 
                      text: "Sim", 
                      onPress: () => null
                    }
                    
                  ]);
                  
                setloading(false)
           
          }).catch((err) => Alert.alert("Erro", "Erro no servidor!"))
      }
    

    const Acess = () =>{
        return(
            <View>
                <TouchableOpacity style={styles.button} onPress={verify} >
                    <View style={{display:"flex", flexDirection:"row", alignSelf:"center"}}>
                    <Text style={styles.textButton}>Cadastrar</Text>
                    {loading===true?<ActivityIndicator style={{marginLeft:10}} color="white" />: null}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    return(

        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container} >  
               <ScrollView> 
               <View style={styles.sectionInput}>
                    <TextInput
                        style={styles.input}
                        label="Título do Evento"
                        placeholder="Título do Evento"
                        value={title}
                        textContentType="text"
                        onChangeText={setTitle}
                    />
                </View>

                <View style={styles.sectionInput}>
                    <TextInput
                        style={styles.input}
                        label="Descrição"
                        placeholder="Descrição"
                        value={desc}
                        textContentType="text"
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={setDesc}
                    />
                </View>

                <View style={styles.sectionInput}>
                    <TextInput
                        style={styles.input}
                        label="Data e hora"
                        placeholder="Selecione a data e hora"
                        value={selectedDate}
                        textContentType="text"
                        disabled={true}
                    />
                </View>
                <View style={styles.sectionInput}>
                    <DatePicker
                        onSelectedChange={date => setSelectedDate(date)}
                    />
                </View>

                 <Acess/>

             </ScrollView>


        </KeyboardAvoidingView>
    )
}
