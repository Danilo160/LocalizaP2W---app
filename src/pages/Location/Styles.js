import { StyleSheet} from "react-native";
import {responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#612F74',
    }, 

    container2:{
      flex:1,
      marginTop:"10%", 
      alignItems:"center",
    },

    item:{
      width:responsiveWidth(90),
      padding:30,
      backgroundColor:"#D8D8DE", 
      marginBottom:"10%", 
      borderRadius:30
    },

    text: {
        marginTop:"5%",
        color:"white",
        fontSize:20,
        lineHeight:30,
        fontWeight:"bold",
        textAlign:"center"

    },

    textLocals:{
      fontSize: responsiveFontSize(2),
      lineHeight:20,
      marginTop:"5%",

  },

    textLocals2:{
      fontSize: responsiveFontSize(1.6),
      marginTop:"5%",

  },

    sectionInput:{
        marginTop:"5%",
        backgroundColor:"#E7E7E7",
        width:responsiveWidth(90),
        borderRadius:15,
        alignItems:"center",
        alignSelf:"center",
        borderColor:"purple",
        borderWidth:2, 
        overflow:"hidden"

    },

    input:{
        width:responsiveWidth(80),
        marginBottom:-2,
    }

  });