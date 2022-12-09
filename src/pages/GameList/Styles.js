import { StyleSheet} from "react-native";
import {responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#612F74',
    }, 

    container2:{
      flex:1,
      marginTop:"3%", 
      alignItems:"center",
    },

    item:{
      width:responsiveWidth(90),
      padding:10,
      backgroundColor:"#612F74", 
      marginBottom:"5%", 
    },


    textEvent:{
      fontSize: responsiveFontSize(2),
      fontWeight:"bold",
      lineHeight:20,
      marginTop:"5%",
      color:"white"
    },

    textDateHour:{
      fontSize: responsiveFontSize(1.8),
      fontWeight:"bold",
      lineHeight:20,
      marginTop:"-5%",
      marginBottom:"5%",
      color:"white"
    },

divShare:{
  alignSelf:"center",
  bottom:"-11%",
  width:responsiveWidth(90),
  padding:30,
  backgroundColor:"#FAFAFC",  
  borderBottomEndRadius:30,
  borderBottomStartRadius:30
},
    sectionInput:{
        marginTop:"5%",
        backgroundColor:"#E7E7E7",
        width:responsiveWidth(90),
        borderRadius:15,
        alignItems:"center",
        alignSelf:"center",
        overflow:"hidden"

    },

    sectionInputPlace:{
      marginTop:"5%",
      marginBottom:"5%",
      width:responsiveWidth(90),
      alignItems:"center",
      alignSelf:"center",
      overflow:"hidden",
      borderRadius:15

  },

   sectionSpaceBetween:{
    display:"flex", 
    flexDirection:"row", 
    justifyContent:"space-between"
   },

    input:{
        width:responsiveWidth(87),
        marginTop:-2,
        marginBottom:-2,
    },

    buttonPrimary:{
      marginTop:-3,
      width:responsiveWidth(50),
      borderRadius:5,
      backgroundColor:"#9F5DF5",
      padding:10,
      margin:10,
      alignSelf:"center"
    },

    textButton:{
      color:"white",
      fontSize:responsiveFontSize(2.2),
      textAlign:"center",  
    }

  });