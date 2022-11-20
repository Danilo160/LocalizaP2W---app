import React, {useState} from "react";
import { View, Text,TouchableOpacity, Image, Keyboard, FlatList, KeyboardAvoidingView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';
import imageFilter from './../../../assets/Filtro.png'
import {styles} from "./Styles"
import { ScrollView } from "react-native-gesture-handler"

export default function Home({route}){
 
    const [hide, setHide] = useState(false)
    const [text, setText] = useState("")
    const [text2, setText2] = useState("")
    const [text3, setText3] = useState("")

    const hideShow = () =>{
        if(hide===false){
            setHide(true)
        }else{
            setHide(false)
        }
    }

    return(
        <ScrollView style={styles.container}>

            <Text style={styles.text}>{`Pesquisar por:`}</Text>
            
            <View style={styles.sectionInput}>
            <TextInput
                style={styles.input}
                label="Seleção"
                placeholder="Insira o Time/Seleção"
                value={text2}
                onChangeText={text => setText2(text)}
            />
            </View>

            <View style={styles.sectionInput}>
            <TextInput
                style={styles.input}
                label="Competição"
                placeholder="Insira a competição"
                value={text3}
                onChangeText={text => setText3(text)}
            />
            </View>

            <View style={styles.sectionInput}>
            <TextInput
                style={styles.input}
                label="Local"
                placeholder="Insira o local"
                value={text}
                onChangeText={text => setText(text)}
            /> 
            </View>

            {/*</ImageBackground>*/}
            <Text style={styles.text}>{`Locais Disponíveis`}</Text>
            <View style={styles.container2}>
                {route.params.paramKey.map((item,index)=>{
                    return(
                        <View style={styles.item} key={index}>
                            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <Text style={styles.textLocals}>{item.value}</Text>
                                <Text style={styles.textLocals}>{item.hour}</Text>
                            </View>
                            <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <Text style={styles.textLocals}>{item.local}</Text>
                                <Text style={styles.textLocals}>{item.date}</Text>
                            </View>
                            <Text style={styles.textLocals2}>Distância: {item.km}</Text>
                            <Text style={styles.textLocals2}>Descrição: {item.desc}</Text>
                        </View>
                        )
                })}

            </View>
            
        </ScrollView>
       
    )
}