import React, { Component } from 'react';
import {View, ScrollView, Text, TextInput, TouchableOpacity, Alert, AsyncStorage, StyleSheet , ActivityIndicator} from 'react-native';
import { StackNavigator } from 'react-navigation';
import PTRView from 'react-native-pull-to-refresh';//https://www.npmjs.com/package/react-native-pull-to-refresh

import HeaderComponente from '../Componentes/HeaderComponente';
import CartaPequenniaComponente from '../Componentes/CartaPequenniaComponente';
import RestAPI from '../Clases/RestAPI.js';

ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;

export default class Favoritos extends Component{
    static navigationOptions = {
        header: null
      };
    
    constructor(props){
        super(props);
            this.state = { favoritos: [], ejecutando:true}
        this._refresh = this._refresh.bind(this);
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

    _eliminarFavorito(usuario){
        Alert.alert("Eliminar", "Eliminar favorito "+String(usuario));
    }

    async _verUsuario(nombre_usuario){
        try{
            const { navigate } = this.props.navigation;
            navigate('Perfil', {nombre_usuario:nombre_usuario, _refresh: this._refresh});
            
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
            var respuesta = await RestAPI.obtenerFavoritos(this.state.usuario);
            this.setState({favoritos:respuesta});
        }catch(error){
            if(error.error){
               Alert.alert("Error", error.error);
            }else{
                Alert.alert("Atención", "Ha ocurrido un error inesperado");
            }
        }
    }

    render(){
        return(
            <View  style = {{flex:1, backgroundColor: COLORES.BACKGROUND}}>
                <HeaderComponente nombre = "Favoritos"></HeaderComponente>
                <View style = {{flex:1, marginLeft:30, marginRight:30, marginTop:30, marginBottom:30}}>
                    {this.state.ejecutando == true?<ActivityIndicator style = {{marginTop:20, marginBottom:20}}/>:null}
                    <PTRView onRefresh={this._refresh.bind(this)} style = {{flex:1}}>
                        <ScrollView showsVerticalScrollIndicator={false} style = {{flex:1}}>
                        {this.state.favoritos.length>0?this.state.favoritos.map((dato, index)=>{
                                return  <TouchableOpacity onPress = {()=>{this._verUsuario(dato.nombre_usuario)}} key = {index} style = {{flex:1}}>
                                         <CartaPequenniaComponente key = {index} Background = {COLORES.BLANCO} boton_onPress = {()=>{this._eliminarFavorito(dato.nombre_usuario)}} boton_activo = {true} boton_mt = {3} boton_mb = {3} boton_mr = {5} boton_filled = {require('../Imagenes/heart_filled.png')} boton_unfilled = {require('../Imagenes/heart_unfilled.png')} boton_width = {30} boton_height = {10} imagen = {require('../Imagenes/user.png')} mostrarBoton = {false} color  = {COLORES.NEGRO} titulo = {dato.nombre+" "+dato.apellido} detalle = {dato.area}></CartaPequenniaComponente>
                                        </TouchableOpacity>;
                            }):<Text style = {[estilo.texto, estilo.titulo, {alignSelf:"center"}]}>No tiene usuarios favoritos</Text>}
                        </ScrollView>
                    </PTRView>
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