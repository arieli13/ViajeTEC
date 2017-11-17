import React, { Component } from 'react';
import {View, ScrollView, Text, TextInput, TouchableOpacity, Alert, AsyncStorage, StyleSheet, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PTRView from 'react-native-pull-to-refresh';//https://www.npmjs.com/package/react-native-pull-to-refresh


import HeaderComponente from '../Componentes/HeaderComponente';
import CartaPequenniaComponente from '../Componentes/CartaPequenniaComponente';
import RestAPI from '../Clases/RestAPI.js';

import BotonComponente from '../Componentes/BotonComponente';

ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;
TIPOGRAFIAS = ESTANDARES.TIPOGRAFIAS;

export default class Viajes extends Component{
    static navigationOptions = {
        header: null
      };

      constructor(props){
        super(props);
        this.state = {
            viajes:[],
            ejecutando:true
        }
        this._refresh = this._refresh.bind(this);
    
    }
    
    async _eliminarViaje(viaje){
        Alert.alert("Eliminar", "Eliminar viaje");
    }

    _modificarVehiculo(vehiculo, marca, placa, color){
        const { navigate } = this.props.navigation;
        navigate('ModificarVehiculo', {
            id_vehiculo: vehiculo,
            marca: marca, 
            placa:placa,
            color:color
        });
    }

    _crearViaje(){
        const { navigate } = this.props.navigation;
        navigate('CrearViaje', {_refresh: this._refresh});
    }

    async _verViaje(id_viaje){
        try{
            const { navigate } = this.props.navigation;
            navigate('VerViajeConductor', {id_viaje:id_viaje, _refresh: this._refresh});
            
        }catch(error){
            this.setState({ejecutando:false});
            if(error.error){
                Alert.alert("Error", error.error);
            }else{
                Alert.alert("Atención", "Ha ocurrido un error inesperado");
            }
        }
    }

    async _refresh() {
        try{
            var respuesta = await RestAPI.obtenerViajes(this.state.usuario);
            this.setState({viajes:respuesta});
        }catch(error){
            if(error.error){
                Alert.alert("Error", error.error);
            }else{
                Alert.alert("Atención", "Ha ocurrido un error inesperado");
            }
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
            await this._refresh();
            await this.setState({ejecutando:false});
        } catch (error) {
           const { navigate } = this.props.navigation;
           navigate('Home');
        }
    }

    render(){
        return(
            <View  style = {{flex:1, backgroundColor: COLORES.BACKGROUND}}>
                <HeaderComponente nombre = "Viajes"></HeaderComponente>
                
                <View style = {{flex:8, marginLeft:30, marginRight:30, marginTop:30, marginBottom: 10}}>
                {this.state.ejecutando == true?<ActivityIndicator style = {{marginTop:20, marginBottom:20}}/>:null}
                    <PTRView onRefresh={this._refresh.bind(this)} style = {{flex:1}}>
                        <ScrollView showsVerticalScrollIndicator={false} style = {{flex:1}}>
                        {this.state.viajes.length>0?this.state.viajes.map((dato, index)=>{
                                return <TouchableOpacity key = {index} onPress = {()=>{this._verViaje(dato.id_viaje)}} style = {{flex:1}}>
                                            <CartaPequenniaComponente key = {index} Background = {COLORES.BLANCO} imagen = {require('../Imagenes/map.png')} mostrarBoton = {false} color  = {COLORES.ROJO} titulo = {dato.nombre_inicio + " - "+dato.nombre_destino} detalle = {dato.fecha_hora_inicio} ></CartaPequenniaComponente>
                                        </TouchableOpacity>;
                                       
                            }):<Text style = {[estilo.texto, estilo.titulo, {alignSelf:"center"}]}>No tiene viajes</Text>}
                        </ScrollView>
                    </PTRView>
                </View>
                <View style = {{flex:1, alignItems: "flex-end", marginBottom: 10, marginRight:10}}>
                <BotonComponente onPress = {()=>{this._crearViaje()}} background = {COLORES.GRIS_CLARO} filled = {require('../Imagenes/crear.png')} unfilled = {require('../Imagenes/crear.png')} activo = {true} width = {50} height = {0} > </BotonComponente>
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