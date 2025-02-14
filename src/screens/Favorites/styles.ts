import { StyleSheet } from "react-native";

export const style = StyleSheet.create({

    container:{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 30,
        width:'100%',
        height: '100%',
        backgroundColor: '#fffafa'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red'
    },
    loadingWrapper:{
        marginTop: '20%',
        alignItems: 'center',
        gap: 90
    },
    animation:{
        width: 200,
        height: 200,
    },
    loadingText:{
        fontSize: 20,
        fontWeight: 'bold'
    }
})