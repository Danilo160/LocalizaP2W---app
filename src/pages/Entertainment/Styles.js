import { StyleSheet} from "react-native";
import {responsiveHeight,responsiveWidth,responsiveFontSize} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#612F74',
        justifyContent: "center",
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

    title:{
        marginTop: "3%",
        width: responsiveWidth(90),
        alignSelf:"center"
    },

    text: {
        color:"white",
        fontSize: responsiveFontSize(2.5),
        fontWeight:"bold",
        lineHeight:responsiveHeight(5),   
        textAlign:"center",

    },

    text2: {
        marginTop:"2%",
        marginBottom:"2%",
        color:"white",
        fontSize: responsiveFontSize(1.8),
        lineHeight:responsiveHeight(3),
        textAlign:"center"

    },

    textContainerLogin:{
        color:"white", 
        fontSize: responsiveFontSize(1.8)     
    },

    containerLogin:{
        display:"flex", 
        flexDirection:"row", 
        justifyContent:"center",
        marginBottom:"10%"
    },

    sectionInput:{
        marginTop:"3%",
        backgroundColor:"#E7E7E7",
        width:responsiveWidth(90),
        borderRadius:10,
        alignItems:"center",
        alignSelf:"center",
        borderColor:"purple",
        borderWidth:2, 
        overflow:"hidden"
    },

    sectionInput2:{
        backgroundColor:"#E7E7E7",
        width:responsiveWidth(60),
        right:"8%",
        borderRadius:10,
        alignItems:"center",
        alignSelf:"center",
        borderColor:"purple",
        borderWidth:2, 
        overflow:"hidden"
    },

    sectionInput3:{
        backgroundColor:"#E7E7E7",
        width: responsiveWidth(28),
        left:"8%",
        borderRadius:10,
        alignItems:"center",
        alignSelf:"center",
        borderColor:"purple",
        borderWidth:2, 
        overflow:"hidden"
    },

    sectionRow:{
        marginTop:"3%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center",
        alignContent:"center",
    },


    input:{
        width: responsiveWidth(80),
        marginBottom:-2
    },

    input2:{
        width: responsiveWidth(50),
        marginBottom:-2,
    },

    input3:{
        width: responsiveWidth(35),
        marginBottom:-2,
        left:"25%"
    },

    button:{
        marginTop:"5%",
        width:responsiveWidth(90),
        borderRadius:10,
        backgroundColor:"#9F5DF5",
        padding:15,
        margin:10,
        alignSelf:"center",
        marginBottom:"5%"
    },


  });