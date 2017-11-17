import React, { Component } from 'react';
import {View, Text, Button} from 'react-native';

import HeaderComponente from '../Componentes/HeaderComponente';
import EscogerUsuarioComponente from '../Componentes/EscogerUsuarioComponente';

ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;

export default class EscogerUsuario extends Component{
    static navigationOptions = {
        header: null
      };
    render(){
        return(
            <View View style = {{flex:1, backgroundColor: COLORES.BACKGROUND}}>
                <HeaderComponente nombre = "Tipo de Usuario"></HeaderComponente>
                <EscogerUsuarioComponente navigation= {this.props.navigation}></EscogerUsuarioComponente>
            </View>
        );    
    }
}