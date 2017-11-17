import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;
TIPOGRAFIAS = ESTANDARES.TIPOGRAFIAS;

export default class HeaderComponente extends Component{
    render(){
        return(
            <View style = {estilosHeader.header}>
                <Text style = {estilosHeader.primary}>ViajeTEC </Text>
                <Text style= {estilosHeader.divider} >|</Text>
                <Text style = {estilosHeader.secondary}>{this.props.nombre}</Text>
            </View>
        );
    }
}

const estilosHeader = StyleSheet.create({
    header:{
        borderBottomWidth: 3,
        borderBottomColor: COLORES.GRIS_MEDIO,
        backgroundColor: COLORES.BACKGROUND,
        marginBottom: 16,
        minHeight: 71,
        marginTop: -16,
        zIndex: 16,
        right: 16,
        left: 16,
        top:16,
        flex:0.01,
        flexDirection:'row'
    },

    primary:{
        marginLeft: 8,
        marginTop: 10,
        fontSize: 30,
        marginTop: 13,
        marginBottom: 13,
        marginLeft: 0,
        marginRight: 0,
        fontFamily: TIPOGRAFIAS.TITULO
    },
  
    divider:{
        fontSize: 30,
        marginTop: 13,
        marginBottom: 13,
        marginLeft: 0,
        marginRight: 6,
        fontFamily: TIPOGRAFIAS.TITULO
    },
  
    secondary:{
      fontSize: 24,
      marginTop: 18,
      marginBottom: 13,
      marginLeft: 0,
      marginRight: 0,
      color: COLORES.AZUL,
      fontFamily: TIPOGRAFIAS.TITULO
    }
});

