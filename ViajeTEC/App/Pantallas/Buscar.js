import React, { Component } from 'react';
import {View, ScrollView, Text, TextInput, Alert, TouchableOpacity, Switch, StyleSheet, Button, AsyncStorage , ActivityIndicator} from 'react-native';
import { StackNavigator } from 'react-navigation';
import PTRView from 'react-native-pull-to-refresh';//https://www.npmjs.com/package/react-native-pull-to-refresh

import HeaderComponente from '../Componentes/HeaderComponente';
import CartaPequenniaComponente from '../Componentes/CartaPequenniaComponente';
import BotonComponente from '../Componentes/BotonComponente';
import RestAPI from '../Clases/RestAPI.js';

ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;
TIPOGRAFIAS = ESTANDARES.TIPOGRAFIAS;

export default class Buscar extends Component{
    static navigationOptions = {
        header: null
      };

      constructor(props){
        super(props);
            this.state = {

            viajes:[],
            usuarios:[],

            nombre_usuario_busqueda : "",
        
            pantalla: [null, 'none', 'none', 'none' ], 
            footer:{fontColor:[COLORES.BACKGROUND, COLORES.NEGRO, COLORES.NEGRO, COLORES.NEGRO],  fontWeight: ['bold', 'normal', 'normal', 'normal'], color:[COLORES.AZUL, COLORES.BACKGROUND, COLORES.BACKGROUND, COLORES.BACKGROUND]}
            
            }
            this.state.buscando = false;
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
                await this.setState({ejecutando:false});
            } catch (error) {
               const { navigate } = this.props.navigation;
               navigate('Home');
            }
        }

        async _verUsuario(nombre_usuario){
            try{
                const { navigate } = this.props.navigation;
                navigate('Perfil', {nombre_usuario:nombre_usuario, _refresh: this._refresh});
                
            }catch(error){
                this.setState({buscando:false});
                if(error.error){
                    Alert.alert("Error", error.error);
                }else{
                    Alert.alert("Atención", "Ha ocurrido un error inesperado");
                    throw(error);
                }
            }
        }

        async _verViaje(id_viaje){
            try{
                const { navigate } = this.props.navigation;
                navigate('VerViajePasajero', {id_viaje:id_viaje});
                
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
            this.setState({buscando:true});
            var usuarios = await RestAPI.buscarUsuarios(this.state.usuario, this.state.nombre_usuario_busqueda);
            var viajes = await RestAPI.buscarViaje(this.state.usuario);
            await this.setState({usuarios:usuarios, viajes:viajes});
            this.setState({buscando:false});
        }catch(error){
            this.setState({buscando:false});
            if(error.error){
                Alert.alert("Error", error.error);
            }else{
                Alert.alert("ds", error);
                //Alert.alert("Atención", "Ha ocurrido un error inesperado");
            }
        }
    }

      async _cambiarPantalla(pantalla){
        var pantallaAux = ['none', 'none', 'none', 'none'];
        pantallaAux[pantalla] = null;
        
        var footerAux = {fontColor:[COLORES.NEGRO, COLORES.NEGRO, COLORES.NEGRO, COLORES.NEGRO],  fontWeight: ['normal', 'normal', 'normal', 'normal'], color:[COLORES.BACKGROUND, COLORES.BACKGROUND, COLORES.BACKGROUND, COLORES.BACKGROUND]};
        footerAux.fontColor[pantalla] = COLORES.BACKGROUND;
        footerAux.fontWeight[pantalla] = 'bold';
        footerAux.color[pantalla] =  COLORES.AZUL;
        await this.setState( { pantalla: pantallaAux, footer:footerAux} );
    }

    render(){
        return(
            <View  style = {{flex:1, backgroundColor: COLORES.BACKGROUND}}>
                <HeaderComponente nombre = "Buscar"></HeaderComponente>

                <View style = {{flex:12}}>

                    <View style = {{flex:1, display: this.state.pantalla[0], marginLeft:16, marginTop:10, marginRight:16}}>
                        {this.state.buscando == true?<ActivityIndicator style = {{marginTop:20, marginBottom:20}}/> :null}
                        <TextInput value = {this.state.nombre_usuario_busqueda} onChangeText = {(texto)=>{this.setState({nombre_usuario_busqueda:texto})}} placeholder = "Usuario" maxLength={50}></TextInput>
                        <Button color = {COLORES.AZUL} title = "Buscar" onPress = {()=>this._refresh()}></Button>
                    </View>

                    <View style = {{flex:1, display: this.state.pantalla[1], marginLeft:16, marginTop:10}}>
                        <Text>Mapa</Text>
                    </View>

                    <View style = {{flex:1, display: this.state.pantalla[2], marginLeft:16, marginTop:10, marginRight: 16}}>
                        <PTRView onRefresh={this._refresh.bind(this)} style = {{flex:1}}>
                            <ScrollView showsVerticalScrollIndicator={false} style = {{flex:1}}>
                                {this.state.usuarios.length>0?this.state.usuarios.map((dato, index)=>{
                                    return  <TouchableOpacity onPress = {()=>{this._verUsuario(dato.nombre_usuario)}} key = {index} style = {{flex:1}}>
                                                <CartaPequenniaComponente key = {index} Background = {COLORES.BLANCO} boton_onPress = {()=>{}} boton_activo = {true} boton_mt = {3} boton_mb = {3} boton_mr = {5} boton_filled = {require('../Imagenes/heart_filled.png')} boton_unfilled = {require('../Imagenes/heart_unfilled.png')} boton_width = {30} boton_height = {10} imagen = {require('../Imagenes/user.png')} mostrarBoton = {false} color  = {COLORES.NEGRO} titulo = {dato.nombre+" "+dato.apellido} detalle = {dato.area}></CartaPequenniaComponente>
                                            </TouchableOpacity>;
                                }):<Text style = {[estilo.texto, estilo.titulo, {alignSelf:"center"}]}>No se encontraron resultados</Text>}
                            </ScrollView>
                        </PTRView>
                    </View>

                    <View style = {{flex:1, display: this.state.pantalla[3], marginLeft:16, marginTop:10}}>
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
                </View>




                <View style = {estilo.footer}>

                    <TouchableOpacity onPress = {()=>{this._cambiarPantalla(0)}} style = {[estilo.footerBoton, {backgroundColor:this.state.footer.color[0]}]}>
                        <Text style = {[estilo.texto,{color:this.state.footer.fontColor[0], fontWeight: this.state.footer.fontWeight[0]}]}>Datos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>{this._cambiarPantalla(1)}} style = {[estilo.footerBoton, {backgroundColor:this.state.footer.color[1]}]}>
                        <Text style = {[estilo.texto,{color:this.state.footer.fontColor[1], fontWeight: this.state.footer.fontWeight[1]}]}>Mapa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>{this._cambiarPantalla(2)}} style = {[estilo.footerBoton, {backgroundColor:this.state.footer.color[2]}]}>
                        <Text style = {[estilo.texto,{color:this.state.footer.fontColor[2], fontWeight: this.state.footer.fontWeight[2]}]}>Usuarios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>{this._cambiarPantalla(3)}} style = {[estilo.footerBoton, {backgroundColor:this.state.footer.color[3]}]}>
                        <Text style = {[estilo.texto,{color:this.state.footer.fontColor[3], fontWeight: this.state.footer.fontWeight[3]}]}>Viajes</Text>
                    </TouchableOpacity>

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