import React, { Component } from 'react';
import {View, Text, StyleSheet, Alert, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';

import HeaderComponente from '../Componentes/HeaderComponente';
import AutenticacionComponente from '../Componentes/AutenticacionComponente';

ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;
TIPOGRAFIAS = ESTANDARES.TIPOGRAFIAS;

export default class Autenticacion extends Component{
    static navigationOptions = {
        header: null
      };

    _terminosCondiciones(){
        const { navigate } = this.props.navigation;
        navigate('TerminosCondiciones');
    }

    render(){
        return(
            <View style = {{flex:1, backgroundColor: COLORES.BACKGROUND}}>
                <HeaderComponente nombre = "Iniciar Sesión"></HeaderComponente>
                <AutenticacionComponente navigation= {this.props.navigation}></AutenticacionComponente>
                <View style = {{marginBottom:16}}>
                    <Text style = {[{alignSelf:"center"}, estilo.texto]}>Al iniciar sesión está aceptando los </Text>
                    <Text onPress = {()=>{this._terminosCondiciones()}} style = {[{alignSelf:"center"}, estilo.esto, estilo.titulo]}>Terminos y Condiciones</Text>
                </View>
            </View>
        );    
    }
}
const estilo = StyleSheet.create({
    texto:{
        fontSize: TIPOGRAFIAS.TAMANNIO_NORMAL,
        color: COLORES.TEXTO,
        fontFamily: TIPOGRAFIAS.TEXTO_NORMAL
    },
    titulo:{
        fontWeight: "bold",
        color:COLORES.TITULO
    }
});
