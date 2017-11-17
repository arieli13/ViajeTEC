import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;
TIPOGRAFIAS = ESTANDARES.TIPOGRAFIAS;
//style = {{flex:1}}
export default class CartaComponente extends Component{
    render(){
        return( 
            <View style = {{ flex:1, backgroundColor: 'white', alignContent: "space-around", marginVertical:5, marginHorizontal:5, borderRadius: 10}}>
                <View style = {{flex:1,  flexDirection: "row", alignItems: "center", marginTop: 10, marginRight: 10}}>
                    <View style = {{flex:0.6, width: 50,height: 50, borderRadius: 50/2, overflow: "hidden", alignItems: "center", position: "relative", backgroundColor: "white", margin: 10}}>
                        <Image style = {{flex: 1, width: 50, height: 50, borderRadius: 50/2, flex:1, resizeMode: "stretch"}} source={require("../Imagenes/landscape_1.png")}></Image>
                    </View>
                    <View style = {{flex:1,alignItems: "center", justifyContent: "center", alignContent:"center", borderBottomColor: 'black', borderBottomWidth: 1}}>
                        <View style = {{flex:1, justifyContent: "center"}}>
                        <Text style={{fontSize:TIPOGRAFIAS.TAMANNIO_NORMAL, fontWeight: "bold"}}>{this.props.titulo}</Text>
                        </View>
                    </View>
                </View>
                
                <View style = {{flex:2, alignItems: "center", justifyContent: "space-around"}}>
                    <Text style={{flex: 1, fontSize:16,  marginBottom: 10, marginLeft:10, marginRight: 10, marginTop: 10}}>{this.props.descripcion}</Text>
                </View>
            </View>
        );
    }
}

const estilos = StyleSheet.create({
    imagen: {
        flex:1,
        resizeMode: "stretch"
        
    },
    contenedorPrincipal:{
        flex:1, 
        flexDirection: "row",
        overflow: "hidden",
        alignContent: "center",
        backgroundColor: COLORES.GRIS_CLARO
    },


    text:{
        color:COLORES.NARANJA,
        fontFamily: TIPOGRAFIAS.TEXTO_NORMAL,
        fontSize: TIPOGRAFIAS.TAMANNIO_NORMAL
    }

});

/*

*/