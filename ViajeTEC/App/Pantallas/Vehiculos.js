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

export default class Vehiculos extends Component{
    static navigationOptions = {
        header: null
      };

      constructor(props){
        super(props);
        this.state = {
            vehiculos:[],
            ejecutando:true
        }
        this._refresh = this._refresh.bind(this);
    
    }
    
    async _eliminarVehiculo(vehiculo){
        try{
            var respuesta = await RestAPI.eliminarVehiculo(vehiculo);
             this.setState({ejecutando:false});
             this.setState({vehiculos:respuesta});
         }catch(error){
             this.setState({ejecutando:false});
             if(error.error){
                 Alert.alert("Error", error.error);
             }else{
                 Alert.alert("Atención", "Ha ocurrido un error inesperado");
             }
         }
    }

    _modificarVehiculo(vehiculo, marca, placa, color){
        const { navigate } = this.props.navigation;
        navigate('ModificarVehiculo', {
            id_vehiculo: vehiculo,
            marca: marca, 
            placa:placa,
            color:color,
            _refresh : this._refresh
        });
    }

    _crearVehiculo(){
        const { navigate } = this.props.navigation;
        navigate('CrearVehiculo', {_refresh: this._refresh});
    }

    async _refresh() {
        try{
            var respuesta = await RestAPI.obtenerVehiculos(this.state.usuario);
            this.setState({vehiculos:respuesta});
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
                <HeaderComponente nombre = "Vehiculos"></HeaderComponente>
                
                <View style = {{flex:8, marginLeft:30, marginRight:30, marginTop:30, marginBottom: 10}}>
                {this.state.ejecutando == true?<ActivityIndicator style = {{marginTop:20, marginBottom:20}}/>:null}
                    <PTRView onRefresh={this._refresh.bind(this)} style = {{flex:1}}>
                        <ScrollView showsVerticalScrollIndicator={false} style = {{flex:1}}>
                        {this.state.vehiculos.length>0?this.state.vehiculos.map((dato, index)=>{
                                return <TouchableOpacity key = {index} style = {{flex:1}} onPress = {()=>  {this._modificarVehiculo(dato.id_vehiculo, dato.marca, dato.placa, dato.color) }}>
                                            <CartaPequenniaComponente key = {index} Background = {COLORES.BLANCO} boton_onPress = {()=>{this._eliminarVehiculo(dato.id_vehiculo)}} boton_activo = {true} boton_mt = {3} boton_mb = {3} boton_mr = {5} boton_filled = {require('../Imagenes/cancel-button.png')} boton_unfilled = {require('../Imagenes/cancel-button.png')} boton_width = {40} boton_height = {10} imagen = {require('../Imagenes/vehiculo.png')}  mostrarBoton = {true} color  = {COLORES.ROJO} titulo = {dato.marca} detalle = {dato.placa + " / " +dato.color} ></CartaPequenniaComponente>
                                        </TouchableOpacity>;
                                       
                            }):<Text style = {[estilo.texto, estilo.titulo, {alignSelf:"center"}]}>No tiene vehículos</Text>}
                        </ScrollView>
                    </PTRView>
                </View>
                <View style = {{flex:1, alignItems: "flex-end", marginBottom: 10, marginRight:10}}>
                <BotonComponente onPress = {()=>{this._crearVehiculo()}} background = {COLORES.GRIS_CLARO} filled = {require('../Imagenes/crear.png')} unfilled = {require('../Imagenes/crear.png')} activo = {true} width = {50} height = {0} > </BotonComponente>
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