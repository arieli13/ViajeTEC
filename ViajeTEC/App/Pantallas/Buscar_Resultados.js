import React, { Component } from 'react';
import {View, ScrollView, Image, Text, Button, Alert, ActivityIndicator, AsyncStorage} from 'react-native';

import HeaderComponente from '../Componentes/HeaderComponente';

import BotonComponente from '../Componentes/BotonComponente';
import RestAPI from '../Clases/RestAPI.js';


ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;

export default class Buscar_Resultados extends Component{
    static navigationOptions = {
        header: null
      };

      constructor(props){
        super(props);
        this._funcion = this._funcion.bind(this);
        }

    _funcion(){
        Alert.alert("Hola", "Hola");
    }


    render(){
        return(
            <View>
                <Text>Resultados</Text>
            </View>
        );
    } 
}