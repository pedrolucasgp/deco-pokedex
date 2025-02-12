import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        gap: 30,
        padding: 20,
        paddingTop: 50,
        width:'100%',
        height: '100%',
        backgroundColor: '#fffafa'
    },
    titleWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'left',
        width: '100%'
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold'
    },
    searchBar:{
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        gap: 5,
        marginBottom: 20
    },
    card:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '50%',
        padding: 10
    },
    cardContent:{
        backgroundColor: '#d6ddde',
        borderRadius: 10,
        borderWidth: 0.5,
        flex: 1,
        alignItems: 'center',
        padding: 15
    },
    pokemonNumber:{
        fontSize: 15,
        marginRight: '70%'
    },
    pokemonName:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    image:{
        width: 150,
        height: 150
    }
})