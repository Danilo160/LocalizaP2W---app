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
        padding:10

       
    },

    imageSelect:{
        width: 180,
        height:180,
        marginTop:3,
        marginBottom:5,
        borderRadius:100
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
        textAlign:"center",
        padding:15

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

    buttonPhotoContainer:{
        marginTop:"-3%",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        padding:1,
        
    },

    buttonPhoto:{
        width:responsiveWidth(50),
        borderColor:"#9F5DF5",
        borderWidth:1,
        borderRadius: 20,
        padding:5,
        margin:10,
        marginBottom:-10
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
        borderColor:"#9F5DF5",
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

    modalContent: {
        height: '25%',
        width: '80%',
        backgroundColor: '#9146AD',
        borderRadius:18,
        alignSelf:"center",
        marginTop:"60%",

      },

      titleContainer: {
        height: '16%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },

      titleModal: {
        color: '#fff',
        fontSize: 16,
      },

      pickerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:40
      },

      buttonModal:{
        width:responsiveWidth(50),
        borderColor:"#9F5DF5",
        borderWidth:1,
        borderRadius: 20,
        padding:3,
        margin:5,
        alignSelf:"center"
    },



  });