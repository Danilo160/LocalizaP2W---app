import { StyleSheet} from "react-native";
import {responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#612F74',
        justifyContent: "center"
    },

    header:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center",
        alignContent:"center",
        
    },
  
    image:{
        width: responsiveWidth(90),
        height: responsiveHeight(42)
    },
  
    textButton: {
        color:"white",
        fontSize:responsiveFontSize(1.8),
        fontWeight:"bold",
        lineHeight:30,
        textAlign:"center",

    },

    textLink:{
        color:"#fff", 
        left:5, 
        fontWeight:"800",
        fontSize: responsiveFontSize(1.8)
    },

    textContainerRegister:{
        color:"white", 
        fontSize: responsiveFontSize(1.8)     
    },

    containerRegister:{
        display:"flex", 
        flexDirection:"row", 
        justifyContent:"center"
    },


    sectionInput:{
        marginTop:"3%",
        backgroundColor:"#E7E7E7",
        width:responsiveWidth(90),
        borderRadius:5,
        alignItems:"center",
        alignSelf:"center",
        borderColor:"purple",
        borderWidth:2, 
        overflow:"hidden"
    },


    input:{
        width: responsiveWidth(80),
        marginBottom:-2
    },

    button:{
        marginTop:"5%",
        width:responsiveWidth(90),
        borderRadius:5,
        backgroundColor:"#9F5DF5",
        padding:15,
        margin:10,
        alignSelf:"center",
        marginBottom:"5%"
    },


    /*title:{
        marginTop: "5%",
        width: responsiveWidth(80),
        alignSelf:"center",
        //alignItems:"center",
    },
  
    text: {
        color:"white",
        fontSize: responsiveFontSize(1.8),
        fontWeight: "bold",
        lineHeight:20,
        bottom:10

    },

    text2: {
        marginTop:"10%",
        marginBottom:'2%',
        color:"white",
        fontSize:13,
        fontWeight:"bold",
        lineHeight:30,
        textAlign:"center"

    },*/


  });