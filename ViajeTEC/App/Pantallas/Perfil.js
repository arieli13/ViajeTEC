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

    async favorito(){
        try{
            await this.setState({ejecutando:true});
            if(this.state.datos.favorito==true){
                await RestAPI.eliminarFavorito(this.state.usuario, this.state.datos.nombre_usuario);
                var datos = this.state.datos;
                datos.favorito = false;
                await this.setState({datos:datos});
            }else{
                await RestAPI.crearFavorito(this.state.usuario, this.props.navigation.state.params.nombre_usuario);
                var datos = this.state.datos;
                datos.favorito = true;
                await this.setState({datos:datos});
            }
            if(this.props.navigation.state.params._refresh){
                await this.props.navigation.state.params._refresh();
            }
            await this.setState({ejecutando:false});
        }catch(error){
            await this.setState({ejecutando:false});
            if(error.error){
                Alert.alert("Error", error.error);
            }else{
                Alert.alert("Atención", "Ha ocurrido un error inesperado");
            }
        }
    }

    async bloquear(){
        try{
           await RestAPI.bloquearUsuario(this.state.usuario, this.props.navigation.state.params.nombre_usuario);
            this.setState({ejecutando:false});
            if(this.props.navigation.state.params._refresh){
                await this.props.navigation.state.params._refresh();
            }
            const {goBack} = this.props.navigation;
            goBack();
        }catch(error){
            this.setState({ejecutando:false});
            if(error.error){
                Alert.alert("Error", error.error);
            }else{
                Alert.alert("Atención", "Ha ocurrido un error inesperado");
            }
        }
    }

    async refresh(){
        try{
            var respuesta = await RestAPI.obtenerDatosUsuario(this.state.usuario, this.props.navigation.state.params.nombre_usuario);
            await this.setState({datos:respuesta});
        
            await this.setState({favorito:respuesta.favorito});
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
        var botonFavorito = null;
        var perfil = null;
        //while(this.state.favorito == null){}
        if(this.state.datos.favorito!=null){
            botonFavorito = <BotonComponente onPress = {()=>{this.favorito()}} filled = {require('../Imagenes/heart_filled.png')} unfilled = {require('../Imagenes/heart_unfilled.png')} activo = {this.state.datos.favorito} width = {40} height = {0} > </BotonComponente>
            perfil = <PerfilComponente style = {{flex:10}}  rating = {this.state.datos.rating} nombre = {(this.state.datos.nombre+" "+this.state.datos.apellido)} area = {this.state.datos.area} telefono = {this.state.datos.telefono} correo = {this.state.datos.correo}></PerfilComponente>
        }
        return(
            <View View style = {{flex:1, backgroundColor: COLORES.BACKGROUND}}>
                <HeaderComponente nombre = "Perfil"></HeaderComponente>
                {this.state.datos.rating?
                <View style = {{flex:1}}>
                    <View style = {{flex:8}}>
                    {perfil}
                    </View>
                    <View style = {{flex:1, flexDirection: "row"}}>
                        <View style = {{flex:1, alignItems: "flex-start", marginBottom:10, marginLeft:10}}>
                            {botonFavorito}
                        </View>
                        {this.state.ejecutando == true?<ActivityIndicator style = {{marginTop:20, marginBottom:20}}/>:null}
                        <View style = {{flex:1, alignItems: "flex-end", marginBottom:10}}>
                            {this.state.datos.favorito==null?null:
                            <BotonComponente onPress = {()=>{this.bloquear()}} filled = {require('../Imagenes/lock.png')} unfilled = {require('../Imagenes/lock.png')} activo = {false} width = {40} height = {0} > </BotonComponente>
                            }
                        </View>
                    </View>
                </View>
                :null}
            </View>
        );    
    } 
}