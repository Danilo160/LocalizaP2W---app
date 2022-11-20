import { StyleSheet} from "react-native";
import {responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#612F74',
      justifyContent: "center",
    }
    ,

    header:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center",
        alignContent:"center",
        textAlign:"center",
       
    },

    image:{
        width: responsiveWidth(75),
        height: responsiveHeight(27)
    },

    title:{
        marginTop: "10%",
        width: responsiveWidth(90),
        alignSelf:"center"
    },

    text: {
        color:"white",
        fontSize: responsiveFontSize(4),
        lineHeight:responsiveHeight(5),   

    },

    text2: {
        marginTop:"5%",
        color:"white",
        fontSize: responsiveFontSize(2),
        lineHeight:responsiveHeight(3)

    },

    buttonContainer:{
        marginTop:"8%",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        padding:15,
        
    },

    buttonContainer2:{
        display: "flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        padding:5,
        
    },

    buttonPrimary:{
        width:responsiveWidth(90),
        borderRadius:5,
        backgroundColor:"#9F5DF5",
        padding:15,
        margin:10

    },

    buttonSecondary:{
        width:responsiveWidth(90),
        borderRadius:5,
        borderColor:"#fff",
        borderWidth:1,
        padding:15,
        margin:10
    },

    textButton:{
        color:"white",
        fontSize:responsiveFontSize(2.2),
        textAlign:"center",  
    },

    imageButton:{
        width: responsiveWidth(6),
        height: responsiveHeight(3),
        right: responsiveWidth(5)
    },


    /*
    title:{
        marginTop: "5%",
        width: responsiveWidth(80),
        left: "10%"
    },

    text: {
        color:"white",
        fontSize: responsiveFontSize(2),
        lineHeight:responsiveHeight(3)

    },

    buttonContainer:{
        marginTop:"5%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
    },

    buttonLocal:{
        display:"flex",
        width: responsiveWidth(40),
        height:responsiveHeight(25),
        backgroundColor:"#9871F5",
        borderRadius:10,
        margin:5,

    },

    buttonEmpresa:{
        width: responsiveWidth(40),
        height:responsiveHeight(25),
        backgroundColor:"#04D361",
        borderRadius:10,
        margin:5

    },

    imageButton:{
        width: responsiveWidth(10),
        height: responsiveHeight(5),
        margin:10
    },

    textButton:{
        color:"white",
        fontSize:responsiveFontSize(2.2),
        textAlign:"center",
        top:responsiveHeight(10)  
    },

    textLocals:{
        color:"#D4C2FF",
        fontSize: responsiveFontSize(1.5),
        lineHeight:20,
        marginTop:"5%",
        left:"10%"

    }*/
  });