import React, { Component } from 'react';
import {View, ScrollView, Image, Text, Button, Alert, ActivityIndicator, AsyncStorage} from 'react-native';

import HeaderComponente from '../Componentes/HeaderComponente';

import BotonComponente from '../Componentes/BotonComponente';
import RestAPI from '../Clases/RestAPI.js';


ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;

export default class Buscar_Principal extends Component{
    static navigationOptions = {
        header: null
      };
    
    
      
    _funcion(){
        this.props._funcion();
    }

    render(){
        return(
            <View>
                <Button title = 'presioneme' onPress = {()=>{this._funcion()}}>Principal</Button>
            </View>
        );
    } 
}