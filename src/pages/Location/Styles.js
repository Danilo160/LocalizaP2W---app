import { StyleSheet} from "react-native";
import {responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";

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
      backgroundColor:"#FFFFFF"/* "#D8D8DE" */, 
      marginBottom:"10%", 
      borderRadius:15
    },

    modalContentFilter:{
      backgroundColor:"#73388A", 
      borderBottomEndRadius:20, 
      borderBottomStartRadius:20, 
      height: 500,
    },

    modalContentLocal:{
      backgroundColor:"#612F74", 
      borderRadius:20,
      width:"95%",
      alignSelf:"center",
      textAlign:"center",
      marginTop:"25%",
      marginBottom: "25%",
      height:"70%"
    },

    modalContentForeground:{
      backgroundColor:'rgba(0,0,0,0.5)', 
      alignSelf:"center",
      width:"100%",
      height: "100%"
    },

    textModalTitle:{
      padding:15,
      marginTop:"-3%",
      marginBottom:"5%", 
      marginLeft:25, 
      marginRight:50, 
      display:"flex", 
      flexDirection:"row",
      alignSelf:"center"
    },
    
    titleLocal: {
      left:10,
      marginTop:"3%",
      color:"white",
      fontSize:20,
      lineHeight:30,
      fontWeight:"bold",
      textAlign:"center"

    },

    text: {
        marginTop:"-3%",
        marginBottom:"5%",
        color:"white",
        fontSize:20,
        lineHeight:30,
        fontWeight:"bold",
        textAlign:"center"

    },

    textModal:{
      padding:15, 
      marginLeft:25, 
      marginRight:50, 
      justifyContent:"flex-start", 
      display:"flex", 
      flexDirection:"row"
    },


    textLocalModal: {
      padding:10,
      marginTop:"-2%",
      marginBottom:"-5%",
      color:"white",
      fontSize:16,
      lineHeight:25,
      fontWeight:"bold",

    },

    textFilterSearch: {
      marginTop:"3%",
      marginBottom:"5%",
      color:"white",
      fontSize:20,
      lineHeight:30,
      fontWeight:"bold",
      textAlign:"center"

    },

      
    textFilter: {
      color:"white",
      fontSize:20,
      lineHeight:30,
      fontWeight:"bold",
      textAlign:"center"

    },

    headerFilter:{
      display:"flex", 
      flexDirection:"row", 
      justifyContent:"space-between",
      paddingLeft:50, 
      paddingRight:50, 
      paddingTop:10, 
      paddingBottom:10,
      backgroundColor:"#73388A",
    },

    textLocals:{
      fontSize: responsiveFontSize(2),
      fontWeight:"bold",
      lineHeight:20,
      marginTop:"5%",

    },

    textLocals1:{
      fontSize: responsiveFontSize(1.5),
      lineHeight:20,
      marginBottom:"5%"

    },

    textLocals2:{
      fontSize: responsiveFontSize(1.6),
      marginTop:"3%",

    },

    textLocals3:{
      fontSize: responsiveFontSize(1.6),
      marginTop:"5%",
      color:"#0000FF"

  },

    divShare:{
      alignSelf:"center",
      bottom:"-11%",
      width:responsiveWidth(90),
      padding:30,
      backgroundColor:"#FAFAFC",  
      borderBottomEndRadius:15,
      borderBottomStartRadius:15
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
      borderRadius:15,
      padding: 2.5
    },

    buttonPrimary:{
      marginTop:"-3%",
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
    },

    containerImages:{
      display:"flex",
      justifyContent:"center",
      marginTop:"2%", 
      flexDirection:"row",
      flexWrap:"wrap",
      alignItems:"center",
      alignSelf:"center",
   },

    item2:{
      width:responsiveWidth(30),
      flexDirection:"column",
      marginBottom:"3%",
      alignSelf:"center",
      alignItems:"center",
      alignContent:"center"
    },

    imageSelect:{
      width: 100,
      height:100,
      alignSelf:"center",
      borderRadius:10,
      textAlign:"center"
  },

  lableImages: {
    color:"white",
    marginTop:"2%",
    fontSize:16,
    lineHeight:30,
    fontWeight:"bold",
    textAlign:"center",
    backgroundColor: "#73388A"

  },
  windowClose:{
    padding:20, 
    justifyContent:"flex-end", 
    display:"flex", 
    flexDirection:"row"
  }
  

  });