import { StyleSheet} from "react-native";
import {responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#612F74',
      justifyContent: "center",
    },

    container2:{
        flex:1,
        marginTop:"10%", 
        flexDirection:"row",
        flexWrap:"wrap",
        alignItems:"center",
    },

    modalContentForeground:{
      backgroundColor:'rgba(0,0,0,0.5)', 
      alignSelf:"center",
      width:"100%",
      height: "100%"
    },

    item:{
      width:responsiveWidth(33.33),
      padding:15,
      flexDirection:"column",
      marginBottom:"10%",
    },

    header:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center",
        alignContent:"center",
        textAlign:"center",
        padding:10

       
    },

    imageSelect:{
        width: 100,
        height:100,
        marginTop:3,
        marginBottom:5,
        alignSelf:"center",
        borderRadius:10
    },


    text: {
        color:"white",
        fontSize: responsiveFontSize(2),
        lineHeight:responsiveHeight(4),   
        textAlign:"center",

    },


    buttonPhoto:{
        marginTop:"50%", 
        width:100, 
        height:100
    },

    buttonPhotoDelete:{
      width:responsiveWidth(50),
      borderColor:"#9F5DF5",
      borderWidth:1,
      borderRadius: 20,
      padding:5,
      margin:10,
      marginBottom:10,
      alignSelf:"center"
    },

    textButton:{
      color:"white",
      fontSize:responsiveFontSize(2.2),
      textAlign:"center",  
    },



  });