import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text} from 'react-native';

import MapaComponente from '../Componentes/MapaComponente';
import HeaderComponente from '../Componentes/HeaderComponente';

import DatePicker from 'react-native-datepicker'
import RestAPI from '../Clases/RestAPI.js';
import GWS from '../Clases/GoogleWebService'
import PTRView from 'react-native-pull-to-refresh';//https://www.npmjs.com/package/react-native-pull-to-refresh


ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;
TIPOGRAFIAS = ESTANDARES.TIPOGRAFIAS;
/////////

export default class TerminosCondiciones extends Component{
    static navigationOptions = {
        header: null
      };
    render(){
        return(
            <View style = {{flex:1, backgroundColor:COLORES.BACKGROUND}}>
                <HeaderComponente nombre = "Condiciones"></HeaderComponente>
            </View>
        );
    }
}