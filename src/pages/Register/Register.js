import React, {useState,useEffect} from "react";
import { styles } from "./Styles";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, BackHandler } from "react-native";
import { TextInput } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios"

export default function Register({navigation}){

    const [loading, setloading] = useState(false)
    const [enable, setEnable] = useState(true)


    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [cep, setCep] = useState("")
    const [cidade, setCidade] = useState("")
    const [uf, setUf] = useState("")
    const [endereco, setEndereco] = useState("")
    const [bairro, setBairro] = useState("")
    const [numero, setNumero] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")


    const backAction = () => {
      navigation.goBack()
      return true;
    };

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
    
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);

    const maskCEP = value => {
        return value.replace(/\D/g, "").replace(/^(\d{5})(\d)/,"$1-$2");
      };

    const maskPhone = value => {
        return value
          .replace(/\D/g, "")
          .replace(/^(\d\d)(\d)/g,"($1)$2") 
          .replace(/(\d{5})(\d)/,"$1-$2"); 
          
        
      };

    const setVazio =()=>{
        setEndereco('')
        setBairro('')
        setCidade('')
        setUf('')
        setEnable(true)
        /* setCep('') */    
      }

    const verify = () =>{
        setloading(true)
        if((nome && email && senha && cep && endereco && bairro && numero && cidade && uf && whatsapp)===""){
          Alert.alert("Falha ao registrar!", "Preencha os campos em branco!")
          setloading(false)
          
        }else{
          register()
        }
    }

    const register = () =>{
      var data = JSON.stringify({
        name:nome,
        email,
        password:senha,
        whatsapp,
        location: {
          city: cidade,
          uf,
          cep,
          address: endereco,
          district: bairro,
          number: parseInt(numero),
          coordinates:[parseFloat(longitude), parseFloat(latitude)]
        }

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
      
      fetch("https://localiza-p2w-api.vercel.app/place/register", requestOptions)
        .then((res) => res.json())
        .then((data) => {
          if(data.message=== "Place already exists"){
            Alert.alert("Falha ao registrar", "Email já cadastrado!")
            setloading(false)
          }else{
            if(data.message=== "Fail in server"){
              Alert.alert("Falha ao registrar", "Alguma falha não identificada!")
              setloading(false)
            } else{
              var fotoPerfil = ''
              Alert.alert("SUCESSO", "Cadastro realizado com sucesso! Iremos redirecionar para o perfil!",
              [
                {text: 'Ok', onPress: ()=> navigation.navigate("profile", {placeId: data.place._id, token: data.token, placeName: data.place.name, photo: fotoPerfil})},
              ])
              setloading(false)
            }           
          }
         
        }).catch((err) => Alert.alert("Erro", "Erro no servidor!"))
    }


    const handleSubmit = (e) =>{
       
        e.preventDefault();
        verify()
    
      }

    const buscarcep = () =>{
        setEnable(true)
        var requestOptions = {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            'Authorization': 'Token token=61648e55e3041e2ea1b3016a69ab0e54'
          },
          redirect: 'follow'
        };
        
        fetch(`https://www.cepaberto.com/api/v3/cep?cep=${cep.replace("-","")}`, requestOptions)
          .then((res) => res.json())
          .then((data) => {
              
              if(Object.keys(data).length>1){
                setEndereco(data.logradouro)
                setBairro(data.bairro)
                setCidade(data.cidade.nome)
                setUf(data.estado.sigla)
                setLatitude(data.latitude)
                setLongitude(data.longitude)
              }else{
                if(Object.keys(data).length===0){
                  Alert.alert("Erro","Cep inválido ou não econtrado!")
                  setVazio()
                }else{
                  if(Object.keys(data).length===1){
                    Alert.alert("Erro","Cep não pode ser vazio!")
                    setVazio()
                    console.log("entrou")
                  }
                }

              }
           
          }).catch((err) => Alert.alert("Erro", "Falha no servidor do CEP!"), setVazio(), setEnable(false))
      }
  
/*     const buscarcep = () =>{

        setEnable(true)
        axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`).then(({ data }) => {
          
          if(data.cep){
            if(data.street===undefined){
              setEndereco("")
            }else{
              setEndereco(data.street)
            }
            if(data.neighborhood===undefined){
              setBairro("")
            }else{
              setBairro(data.neighborhood)
            }
            setCidade(data.city)
            setUf(data.state)
            const lat = data.location.coordinates.latitude
            const long = data.location.coordinates.longitude
            setLatitude(lat)
            setLongitude(long)
            setEnable(false)
          }
          else{
            console.log(data.message)
            Alert.alert("Erro","Cep não encontrado!")
            setVazio()
          }
  
  
        })
        .catch(err => { 
          console.log(err.service)
          Alert.alert("Erro","Cep vazio ou inválido!")
          setVazio()
        })
      } */

    const Title = () => {
        return(
            <View  style={styles.title}>
                <Text style={styles.text}>{'Localiza P2W'}</Text>
                <Text style={styles.text2}>{'Disponibilize o seu local para todos'}</Text>
            </View>
        )
    }

    const Acess = () =>{
        return(
            <View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                    <View style={{display:"flex", flexDirection:"row", alignSelf:"center"}}>
                    <Text style={styles.textButton}>Criar conta</Text>
                    {loading===true?<ActivityIndicator style={{marginLeft:10}} color="white" />: null}
                    </View>
                </TouchableOpacity>

                <View style={styles.containerLogin}>
                    <Text style={styles.textContainerLogin}>{'Já possui acesso?'}</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('login')}>
                        <Text style={styles.textLink}>Logar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    return(

        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container} >  
               <ScrollView> 
               <Title/>
               <View style={styles.sectionInput}>
                    <TextInput
                        style={styles.input}
                        label="Nome da Empresa"
                        placeholder="Nome da Empresa"
                        value={nome}
                        textContentType="text"
                        onChangeText={setNome}
                    />
                </View>

                <View style={styles.sectionInput}>
                    <TextInput
                        style={styles.input}
                        label="Email"
                        placeholder="Email"
                        value={email}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.sectionInput}>
                    <TextInput
                        style={styles.input}
                        label="Senha"
                        placeholder="Senha"
                        textContentType="password"
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={setSenha}
                    />
                </View>


                <View style={styles.sectionInput}>
                    <TextInput
                        style={styles.input}
                        label="CEP"
                        placeholder="CEP"
                        value={maskCEP(cep)}
                        maxLength={9}
                        onSubmitEditing = {buscarcep}
                        textContentType="postalCode"
                        keyboardType="numeric"
                        onChangeText={text=>setCep(text)}
                    />
                </View>

                
                <View style={styles.sectionRow}>
                    <View style={styles.sectionInput2}>
                    <TextInput
                        style={styles.input2}
                        label="Cidade"
                        placeholder="Cidade"
                        value={cidade}
                        disabled={enable}
                        textContentType="addressCity"
                        onChangeText={setCidade}
                    />
                    </View>
                    <View style={styles.sectionInput3}>
                    <TextInput
                        style={styles.input3}
                        label="UF"
                        placeholder="UF"
                        value={uf}
                        disabled={enable}
                        textContentType="addressState"
                        onChangeText={setUf}
                    />
                    </View>
                </View>

                
                <View style={styles.sectionInput}>
                    <TextInput
                        style={styles.input}
                        label="Endereço"
                        placeholder="Endereço"
                        value={endereco}
                        disabled={enable}
                        textContentType="streetAddressLine1"
                        onChangeText={setEndereco}
                    />
                </View>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionInput2}>
                    <TextInput
                        style={styles.input2}
                        label="Bairro"
                        placeholder="Bairro"
                        value={bairro}
                        disabled={enable}
                        textContentType="sublocality"
                        onChangeText={setBairro}
                    />
                    </View>
                    <View style={styles.sectionInput3}>
                    <TextInput
                        style={styles.input3}
                        label="Nº"
                        placeholder="Número"
                        value={numero}
                        keyboardType="numeric"
                        textContentType="number"
                        onChangeText={setNumero}
                    />
                    </View>
                </View>

                <View style={styles.sectionInput}>
                    <TextInput
                        style={styles.input}
                        label="WhatsApp"
                        placeholder="(DD)XXXXX-XXXX"
                        maxLength={14}
                        value={maskPhone(whatsapp)}
                        keyboardType="numeric"
                        textContentType="number"
                        onChangeText={setWhatsapp}
                    />
                </View>
                

            <Acess/>
            
            {/*<Text style={styles.text2}>{'Ainda não tem acesso?'}</Text>

            <TouchableOpacity style={styles.button} >
                <Text style={styles.textButton}>Criar Conta</Text>
             </TouchableOpacity>*/}
             </ScrollView>

        </KeyboardAvoidingView>
    )
}
