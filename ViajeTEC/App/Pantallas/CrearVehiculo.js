import React, { Component } from 'react';
import {View, Text, Button, Alert, ActivityIndicator, AsyncStorage, TextInput, StyleSheet} from 'react-native';

import HeaderComponente from '../Componentes/HeaderComponente';

import BotonComponente from '../Componentes/BotonComponente';
import RestAPI from '../Clases/RestAPI.js';


ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;
TIPOGRAFIAS = ESTANDARES.TIPOGRAFIAS;

export default class CrearVehiculo extends Component{
    static navigationOptions = {
        header: null
      };

      constructor(props){
        super(props);
        this.state={
            ejecutando:false,
            marca : "",
            placa: "",
            color: ""
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
            await this.setState({ejecutando:false});
        } catch (error) {
           const { navigate } = this.props.navigation;
           navigate('Home');
        }
    }

    async crearVehiculo(){
        try{
            if(this.state.marca == "" || this.state.placa == "" || this.state.color == ""){
                throw({error:"Debe de completar todos los datos"});
            }
            await RestAPI.crearVehiculo(this.state.usuario, this.state.marca, this.state.placa, this.state.color);
             this.setState({ejecutando:false});
             if(this.props.navigation.state.params._refresh){
                this.props.navigation.state.params._refresh();
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

    render(){
        return(
            <View View style = {{flex:1, backgroundColor: COLORES.BACKGROUND}}>
                <HeaderComponente nombre = "Crear Vehículo"></HeaderComponente>
                <View style = {{flex:1, justifyContent: "space-around", marginLeft:16, marginRight: 16}}>

                    <View style = {{flexDirection: "row" , alignItems : "center"}}>
                    <Text style = {[{flex:1},estilo.texto, estilo.titulo]}>Marca:</Text>
                        <TextInput value = {this.state.marca} onChangeText = {(texto)=>{this.setState({marca:texto})}} style = {[{flex:4},estilo.texto]} maxLength  = {12}></TextInput>
                    </View>
                    <View style = {{flexDirection: "row" , alignItems : "center"}}>
                    <Text style = {[{flex:1},estilo.texto, estilo.titulo]}>Placa:</Text>
                        <TextInput value = {this.state.placa} onChangeText = {(texto)=>{this.setState({placa:texto})}} style = {[{flex:4},estilo.texto]} maxLength  = {8}></TextInput>
                    </View>
                    <View style = {{flexDirection: "row" , alignItems : "center"}}>
                    <Text style = {[{flex:1},estilo.texto, estilo.titulo]}>Color:</Text>
                        <TextInput value = {this.state.color} onChangeText = {(texto)=>{this.setState({color:texto})}} style = {[{flex:4},estilo.texto]} maxLength  = {15}></TextInput>
                    </View>
                    {this.state.ejecutando == true?<ActivityIndicator style = {{marginTop:20, marginBottom:20}}/>:null}
                    <Button title = "Crear" color = {COLORES.AZUL} onPress = {()=>{this.crearVehiculo()}}></Button>

                </View>
            </View>
        );    
    } 
}

const estilo = StyleSheet.create({
    footer:{
        flex:1, 
        flexDirection: "row",
        borderTopWidth:3,
        borderTopColor: COLORES.GRIS_MEDIO
    },
    footerBoton:{
        flex:1, 
        justifyContent: "center",
        alignItems: "center"
    },

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