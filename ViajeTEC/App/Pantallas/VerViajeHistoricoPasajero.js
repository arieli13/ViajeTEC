import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, Icon, View, StyleSheet, Button, Alert, Text, TextInput, Modal,ScrollView, AsyncStorage, ActivityIndicator} from 'react-native';

import MapaComponente from '../Componentes/MapaComponente';
import HeaderComponente from '../Componentes/HeaderComponente';
import CartaPequenniaComponente from '../Componentes/CartaPequenniaComponente';

import DatePicker from 'react-native-datepicker'
import RestAPI from '../Clases/RestAPI.js';
import GWS from '../Clases/GoogleWebService'
import PTRView from 'react-native-pull-to-refresh';//https://www.npmjs.com/package/react-native-pull-to-refresh


ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;
TIPOGRAFIAS = ESTANDARES.TIPOGRAFIAS;
/////////

export default class VerViajePasajero extends Component{
    static navigationOptions = {
        header: null
      };

      constructor(props){
        super(props);

        this.state = {
            reuniones :[],
            puntoDestino: null,
            puntoInicio: null,

            pantalla: [null, 'none', 'none', 'none'], //Indica cual pantalla se visualiza. Datos, mapa o pasajeros
            footer:{fontColor:[COLORES.BACKGROUND, COLORES.NEGRO, COLORES.NEGRO],  fontWeight: ['bold', 'normal', 'normal'], color:[COLORES.AZUL, COLORES.BACKGROUND, COLORES.BACKGROUND]},
        
            fecha:"",
            precio: "0",
            descripcion: "",
            vehiculo : "",
            inicio:false, //Indica si el viaje ya inció o no
            conductor:{},

            pasajeros:[],
            ejecutando:true
        }
    }
      
    async _cambiarPantalla(pantalla){
        var pantallaAux = ['none', 'none', 'none'];
        pantallaAux[pantalla] = null;
        
        var footerAux = {fontColor:[COLORES.NEGRO, COLORES.NEGRO, COLORES.NEGRO],  fontWeight: ['normal', 'normal', 'normal'], color:[COLORES.BACKGROUND, COLORES.BACKGROUND, COLORES.BACKGROUND]};
        footerAux.fontColor[pantalla] = COLORES.BACKGROUND;
        footerAux.fontWeight[pantalla] = 'bold';
        footerAux.color[pantalla] =  COLORES.AZUL;
        await this.setState( { pantalla: pantallaAux, footer:footerAux} );
    }

    async _verViajeHistorico() {
        try{
            var respuesta = await RestAPI.verViajeHistorico(this.state.usuario, this.props.navigation.state.params.id_viajeHistorico);

            var puntosReunion = [];
            for(var i = 0; i<respuesta[2].length;i++){
                puntosReunion.push({id:respuesta[2][i]['id_puntoReunion'], latitud: respuesta[2][i]['latitud_punto'], longitud: respuesta[2][i]['longitud_punto'], descripcion: respuesta[2][i]['nombre']});
            }
            await this.setState({fecha: respuesta[0][0]['fecha_hora_inicio'],
                            precio: respuesta[0][0]['precio'],
                            descripcion: respuesta[0][0]['descripcion'],
                            vehiculo: respuesta[4][0]['marca'] + " / " + respuesta[4][0]['placa'] + " / "+respuesta[4][0]['color'],
                            inicio: respuesta[0][0]['inicio'],
                            puntoInicio: {latitud: respuesta[0][0]['latitud_inicio'], longitud: respuesta[0][0]['longitud_inicio'], descripcion: respuesta[0][0]['nombre_inicio']},
                            puntoDestino: {latitud: respuesta[0][0]['latitud_destino'], longitud: respuesta[0][0]['longitud_destino'], descripcion: respuesta[0][0]['nombre_destino']},
                            reuniones: puntosReunion,
                            pasajeros: respuesta[1],
                            conductor: respuesta[3][0]});
        }catch(error){
            if(error.error){
               Alert.alert("Error", error.error);
            }else{
                Alert.alert("Atención", "Ha ocurrido un error inesperado");
                const {goBack} = this.props.navigation;
                goBack();
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
            await this._verViajeHistorico();
            await this.setState({ejecutando:false});
        } catch (error) {
           const { navigate } = this.props.navigation;
           navigate('Home');
        }
    }

    async _refresh(){
        await this.setState({ejecutando:true});
        await this._verViajeHistorico();
        await this.setState({ejecutando:false});
    }

    async _verUsuario(nombre_usuario){
        try{
            const { navigate } = this.props.navigation;
            navigate('Perfil', {nombre_usuario:nombre_usuario});
            
        }catch(error){
            if(error.error){
                Alert.alert("Error", error.error);
            }else{
                Alert.alert("Atención", "Ha ocurrido un error inesperado");
            }
        }
    }

    async _accion(nombre_usuario, confirmado){
        this._verUsuario(nombre_usuario);
        return;
    }

      render() {
        return (
            <View style = {{flex:1, backgroundColor:COLORES.BACKGROUND}}>

                <HeaderComponente nombre = "Ver viaje histórico"></HeaderComponente>

                <View style = {{flex:12}}>
                    {this.state.ejecutando == true?<ActivityIndicator style = {{marginTop:20, marginBottom:20}}/>:null}
                        <View style = {{flex:1, display: this.state.pantalla[0], marginLeft:16, marginTop:10}}>
                            <View style = {{flex:1, flexDirection: "row", borderBottomWidth:3,  borderBottomColor:COLORES.GRIS_MEDIO}}>
                                    <View style = {{flex:1, justifyContent:"center"}}>
                                        <Text style = {[estilo.texto, estilo.titulo]}>Fecha y hora:</Text>
                                    </View>
                                    <View style = {{flex:2, justifyContent:"center"}}>
                                        <Text>{this.state.fecha}</Text>
                                    </View>
                            </View>
                            
                            <View style = {{flex:1, flexDirection: "row", borderBottomWidth:3,  borderBottomColor:COLORES.GRIS_MEDIO}}>
                                    <View style = {{flex:1, justifyContent:"center"}}>
                                        <Text style = {[estilo.texto, estilo.titulo]}>Precio:</Text>
                                    </View>
                                    <View style = {{flex:2, justifyContent:"center"}}>
                                        <Text>{this.state.precio}</Text>
                                    </View>
                            </View>
                            <View style = {{flex:1, flexDirection: "row", borderBottomWidth:3,  borderBottomColor:COLORES.GRIS_MEDIO}}>
                                <View style = {{flex:1, justifyContent:"center"}}>
                                    <Text style = {[estilo.texto, estilo.titulo]}>Descripción:</Text>
                                </View>
                                <View style = {{flex:2, justifyContent:"center"}}>
                                    <Text>{this.state.descripcion}</Text>
                                </View>
                            </View>

                            <View style = {{flex:1, flexDirection: "row", borderBottomWidth:3,  borderBottomColor:COLORES.GRIS_MEDIO}}>
                                    <View style = {{flex:1, justifyContent:"center"}}>
                                        <Text style = {[estilo.texto, estilo.titulo]}>Vehículo:</Text>
                                    </View>
                                    <View style = {{flex:2, justifyContent:"center"}}>
                                        <Text>{this.state.vehiculo}</Text>
                                    </View>
                            </View>
                            <View style = {{flex:1, flexDirection: "row", alignItems : "center", justifyContent: "center"}}>
                                
                                
                            </View>
                        </View>

                        <View style = {{flex:1, display: this.state.pantalla[1]}}>
                            {this.state.ejecutando?
                            null:
                            <MapaComponente onFinish = {()=>{}} color_destino = {COLORES.AZUL} color_inicio = {COLORES.VERDE} color_reunion = {COLORES.ROJO} informativo = {true} reuniones = {this.state.reuniones} puntoDestino = { this.state.puntoDestino } puntoInicio = { this.state.puntoInicio } />
                            }
                        </View>

                        <View style = {{flex:1, display: this.state.pantalla[2], marginLeft:16, marginTop:10, marginRight:16}}>
                                <PTRView onRefresh={this._refresh.bind(this)} style = {{flex:1}}>
                                    <ScrollView showsVerticalScrollIndicator={false} style = {{flex:1}}>
                                    <TouchableOpacity onPress = {()=>{this._accion(this.state.conductor.nombre_usuario, 1)}} key = {-1} style = {{flex:1}}>
                                        <CartaPequenniaComponente key = {-1} Background = {COLORES.BLANCO} boton_onPress = {()=>{/*this._eliminarFavorito(dato.nombre_usuario)*/}} boton_activo = {true} boton_mt = {3} boton_mb = {3} boton_mr = {5} boton_filled = {require('../Imagenes/heart_filled.png')} boton_unfilled = {require('../Imagenes/heart_unfilled.png')} boton_width = {30} boton_height = {10} imagen = {require('../Imagenes/user.png')} mostrarBoton = {false} color  = {COLORES.NEGRO} titulo = {this.state.conductor.nombre+" "+this.state.conductor.apellido} detalle = "Conductor"></CartaPequenniaComponente>
                                    </TouchableOpacity>
                                    {this.state.pasajeros.length>0?this.state.pasajeros.map((dato, index)=>{
                                            
                                            return <TouchableOpacity onPress = {()=>{this._accion(dato.nombre_usuario, dato.confirmado)}} key = {index} style = {{flex:1}}>
                                                        <CartaPequenniaComponente key = {index} Background = {COLORES.VERDE} boton_onPress = {()=>{/*this._eliminarFavorito(dato.nombre_usuario)*/}} boton_activo = {true} boton_mt = {3} boton_mb = {3} boton_mr = {5} boton_filled = {require('../Imagenes/heart_filled.png')} boton_unfilled = {require('../Imagenes/heart_unfilled.png')} boton_width = {30} boton_height = {10} imagen = {require('../Imagenes/user.png')} mostrarBoton = {false} color  = {COLORES.NEGRO} titulo = {dato.nombre+" "+dato.apellido} detalle = {"Pasajero"}></CartaPequenniaComponente>
                                                    </TouchableOpacity>
                                        }):<Text style = {[estilo.texto, estilo.titulo, {alignSelf:"center"}]}>No tiene acompañantes</Text>}
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
                    <Text style = {[estilo.texto,{color:this.state.footer.fontColor[2], fontWeight: this.state.footer.fontWeight[2]}]}>Pasajeros</Text>
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