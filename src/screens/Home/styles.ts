import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
     container:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        padding: 20,
        width:'100%',
        height: '100%',
        backgroundColor: '#fffafa'
    },
    titleWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold'
    },
    text:{
        textAlign: 'center',
        fontSize: 20
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 50,
        backgroundColor: '#ff474c',
        borderRadius: 10,
        marginTop: 200
    },
    buttonText:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    animation:{
        width: 300,
        height: 300,
    }
})