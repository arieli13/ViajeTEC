import React, { Component } from 'react';
import {View, ScrollView, Image, Text, Button, Alert, ActivityIndicator, AsyncStorage} from 'react-native';

import HeaderComponente from '../Componentes/HeaderComponente';
import PerfilComponente from '../Componentes/PerfilComponente';

import BotonComponente from '../Componentes/BotonComponente';
import RestAPI from '../Clases/RestAPI.js';


ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;

export default class Perfil extends Component{
    static navigationOptions = {
        header: null
      };

      constructor(props){
        super(props);
        this.state={
            ejecutando:true,
            datos : {}
        }
    }

    async componentWillMount(){
        try {
            var usuario = await AsyncStorage.getItem('@nombre_usuario:key');
            if (usuario == null){
                const { navigate } = this.props.navigation;
                navigate('Home');
            }
            await this.setState({usuario:usuario});
            await this.refresh();
            await this.setState({ejecutando:false});

        } catch (error) {
           const { navigate } = this.props.navigation;
           navigate('Home');
        }
    }
    async refresh(){
        try{
            
            var respuesta = await RestAPI.obtenerDatosUsuario(this.state.usuario, this.state.usuario);
            await this.setState({datos:respuesta});
        }catch(error){
            this.setState({ejecutando:false});
            if(error.error){
                Alert.alert("Error", error.error);
            }else{
                Alert.alert("Atención", "Ha ocurrido un error inesperado");
            }
        }
    }

    render(){
        return(
            <View View style = {{flex:1, backgroundColor: COLORES.BACKGROUND}}>
                <HeaderComponente nombre = "Mi Perfil"></HeaderComponente>
                <View style = {{flex:8}}>
                    {this.state.datos.rating?
                    <PerfilComponente style = {{flex:10}}  rating = {this.state.datos.rating} nombre = {(this.state.datos.nombre+" "+this.state.datos.apellido)} area = {this.state.datos.area} telefono = {this.state.datos.telefono} correo = {this.state.datos.correo}></PerfilComponente>
                    :null}
                </View>
            </View>
        );    
    } 
}