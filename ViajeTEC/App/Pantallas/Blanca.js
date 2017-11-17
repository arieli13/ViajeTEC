import React, { Component } from 'react';
import {View, Text, StyleSheet, Alert, AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';

ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;
TIPOGRAFIAS = ESTANDARES.TIPOGRAFIAS;

export default class Blanca extends Component{
    static navigationOptions = {
        header: null
      };

      async componentWillMount(){
        try {
            var usuario = await AsyncStorage.getItem('@nombre_usuario:key');
            const { navigate } = this.props.navigation;
            if (usuario == null){
                
                navigate('Autenticacion');
            }else{
                navigate('EscogerUsuario');
            }
            
        } catch (error) {
           const { navigate } = this.props.navigation;
           navigate('Autenticacion');
        }
    }

    render(){
        return(
            <View style = {{flex:1, backgroundColor: COLORES.BACKGROUND}}>
            </View>
        );    
    }
}