import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, Icon, View, StyleSheet, Image, Alert, Text, TextInput, TouchableHighlight, Picker, Modal,ScrollView, AsyncStorage, ActivityIndicator} from 'react-native';

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

export default class CrearViaje extends Component{
    static navigationOptions = {
        header: null
      };

      constructor(props){
        super(props);

        this.state = {
            reuniones :[],
            puntoDestino: null,
            puntoInicio: null,

            pantalla: [null, 'none'], //Indica cual pantalla se visualiza. Datos o mapa
            footer:{fontColor:[COLORES.BACKGROUND, COLORES.NEGRO],  fontWeight: ['bold', 'normal'], color:[COLORES.AZUL, COLORES.BACKGROUND]},
        
            fecha:"",
            camposDisponibles:0,
            precio: "0",
            descripcion: "",
            id_vehiculo : -1,
            vehiculos : [],
            ejecutando:true
        }
        this._mapaTerminado = this._mapaTerminado.bind(this);
    }

    async _mapaTerminado( puntoDestinoAux, puntoInicioAux, reunionesAux){
        await this.setState({puntoDestino: puntoDestinoAux, puntoInicio: puntoInicioAux, reuniones:reunionesAux});
        if(this.state.puntoInicio!=null && this.state.puntoDestino!=null){
            var precio = await RestAPI.obtenerPrecioCombustible();
            var distancia = await GWS.obtenerDistancia(this.state.puntoInicio.latitud, this.state.puntoInicio.longitud, this.state.puntoDestino.latitud, this.state.puntoDestino.longitud );
            this.setState({precio:String(Math.round(precio*(distancia/1000)))});
        }
    }
      
    async _cambiarPantalla(pantalla){
        var pantallaAux = ['none', 'none'];
        pantallaAux[pantalla] = null;
        
        var footerAux = {fontColor:[COLORES.NEGRO, COLORES.NEGRO],  fontWeight: ['normal', 'normal'], color:[COLORES.BACKGROUND, COLORES.BACKGROUND]};
        footerAux.fontColor[pantalla] = COLORES.BACKGROUND;
        footerAux.fontWeight[pantalla] = 'bold';
        footerAux.color[pantalla] =  COLORES.AZUL;
        await this.setState( { pantalla: pantallaAux, footer:footerAux} );
    }

    async _crearViaje(){
        if(this.state.id_vehiculo == -1){
            Alert.alert("Error", "Seleccione un vehículo válido");
            return;
        }
        if(this.state.puntoDestino == null || this.state.puntoInicio == null){
            Alert.alert("Error", "Verifique que haya marcado un punto de inicio y otro de destino.");
        }else{
            var precio = this.state.precio;
            if(precio = parseFloat(precio)){

                if(precio<0){
                    Alert.alert("Error", "El precio no puede ser menor a 0");
                }else{
                    if(this.state.fecha == ""){
                        Alert.alert("Error", "Ingrese una fecha/hora válida");
                    }else{
                        try{
                            this.setState({ejecutando:true});
                            var datos = {
                                nombre_usuario:this.state.usuario,
                                id_vehiculo:this.state.id_vehiculo,
                                latitud_destino:this.state.puntoDestino.latitud,
                                longitud_destino: this.state.puntoDestino.longitud,
                                nombre_destino:this.state.puntoDestino.descripcion,
                                latitud_inicio: this.state.puntoInicio.latitud,
                                longitud_inicio: this.state.puntoInicio.longitud,
                                nombre_inicio: this.state.puntoInicio.descripcion,
                                fecha_hora_inicio:this.state.fecha,
                                camposDisponibles:this.state.camposDisponibles,
                                precio:this.state.precio,
                                descripcion:this.state.descripcion
                            }
                            var id_viaje = await RestAPI.crearViaje(datos);
                            for(var i = 0; i<this.state.reuniones.length;i++){
                                datos = {
                                    id_viaje:id_viaje,
                                    latitud_punto: this.state.reuniones[i].latitud,
                                    longitud_punto: this.state.reuniones[i].longitud,
                                    nombre: this.state.reuniones[i].descripcion,
                                }
                                await RestAPI.crearPuntoReunion(datos);
                            }
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
                }
            }else{
                Alert.alert("Error", "Ingrese un precio válido");
            }
        }
    }

    async _obtenerVehiculos() {
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
            await this._obtenerVehiculos();
            await this.setState({ejecutando:false});
        } catch (error) {
           const { navigate } = this.props.navigation;
           navigate('Home');
        }
    }

      render() {
        return (
            <View style = {{flex:1, backgroundColor:COLORES.BACKGROUND}}>

                <HeaderComponente nombre = "Crear viaje"></HeaderComponente>

                <View style = {{flex:12}}>
                    {this.state.ejecutando == true?<ActivityIndicator style = {{marginTop:20, marginBottom:20}}/>:null}
                        <View style = {{flex:1, display: this.state.pantalla[0], marginLeft:16, marginTop:10}}>
                            <View style = {{flex:1, flexDirection: "row", borderBottomWidth:3,  borderBottomColor:COLORES.GRIS_MEDIO}}>
                                    <View style = {{flex:1, justifyContent:"center"}}>
                                        <Text style = {[estilo.texto, estilo.titulo]}>Fecha y hora:</Text>
                                    </View>
                                    <View style = {{flex:2, justifyContent:"center"}}>
                                        <DatePicker
                                            style={{width: 200}}
                                            date={this.state.fecha}
                                            is24Hour = {true}
                                            mode="datetime"
                                            placeholder="Seleccione fecha"
                                            format="YYYY-MM-DD hh:mm:ss"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateInput: {
                                                marginLeft: 36
                                            }
                                            // ... You can check the source to find the other keys. 
                                            }}
                                            onDateChange={(date) => {this.setState({fecha: date})}}
                                        />
                                    </View>
                            </View>
                            
                            <View style = {{flex:1, flexDirection: "row", borderBottomWidth:3,  borderBottomColor:COLORES.GRIS_MEDIO}}>
                                    <View style = {{flex:1, justifyContent:"center"}}>
                                        <Text style = {[estilo.texto, estilo.titulo]}>Campos disponibles:</Text>
                                    </View>
                                    <View style = {{flex:2, justifyContent:"center"}}>
                                        <Picker
                                            style = {{maxWidth:50}}
                                            itemStyle = {{maxWidth:50}}
                                            selectedValue={this.state.camposDisponibles}
                                            onValueChange={(itemValue, itemIndex) => this.setState({camposDisponibles: itemValue})}>
                                            <Picker.Item label="1" value= {1} />
                                            <Picker.Item label="2" value= {2} />
                                            <Picker.Item label="3" value= {3} />
                                            <Picker.Item label="4" value= {4} />
                                            <Picker.Item label="5" value= {5} />
                                            <Picker.Item label="6" value= {6} />
                                            <Picker.Item label="7" value= {7} />
                                            <Picker.Item label="8" value= {8} />
                                            <Picker.Item label="9" value= {9} />
                                        </Picker>
                                    </View>
                            </View>
                            <View style = {{flex:1, flexDirection: "row", borderBottomWidth:3,  borderBottomColor:COLORES.GRIS_MEDIO}}>
                                    <View style = {{flex:1, justifyContent:"center"}}>
                                        <Text style = {[estilo.texto, estilo.titulo]}>Precio:</Text>
                                    </View>
                                    <View style = {{flex:2, justifyContent:"center"}}>
                                        <TextInput value = {this.state.precio} onChangeText = {(texto)=>{this.setState({precio:texto})}} keyboardType = 'numeric' style = {[estilo.texto,{maxWidth:100}]}></TextInput>
                                    </View>
                            </View>

                            <View style = {{flex:1, flexDirection: "row", borderBottomWidth:3,  borderBottomColor:COLORES.GRIS_MEDIO}}>
                                    <View style = {{flex:1, justifyContent:"center"}}>
                                        <Text style = {[estilo.texto, estilo.titulo]}>Descripción:</Text>
                                    </View>
                                    <View style = {{flex:2, justifyContent:"center"}}>
                                        <TextInput maxLength = {100} multiline={true} numberOfLines={4} value = {this.state.descripcion} onChangeText = {(texto)=>{this.setState({descripcion:texto})}} style = {[estilo.texto]}></TextInput>
                                    </View>
                            </View>
                            <View style = {{flex:1, flexDirection: "row"}}>
                                    <View style = {{flex:1, justifyContent:"center"}}>
                                        <Text style = {[estilo.texto, estilo.titulo]}>Vehículo:</Text>
                                    </View>
                                    <View style = {{flex:2, justifyContent:"center"}}>
                                        <Picker
                                            selectedValue={this.state.id_vehiculo}
                                            onValueChange={(itemValue, itemIndex) => this.setState({id_vehiculo: itemValue})}>
                                            <Picker.Item label={"Seleccione vehículo"} value= {-1} />
                                            {this.state.vehiculos.length>0?this.state.vehiculos.map((dato, index)=>{
                                                return <Picker.Item key = {index} label={dato.marca+" / "+dato.placa} value= {dato.id_vehiculo} />
                                                       
                                            }):<Picker.Item key = {-1} label={"No tiene vehículos"} value= {-1}/>}
                                        </Picker>
                                    </View>
                            </View>
                        </View>

                        <View style = {{flex:1, display: this.state.pantalla[1]}}>
                            <MapaComponente onFinish = {this._mapaTerminado} color_destino = {COLORES.AZUL} color_inicio = {COLORES.VERDE} color_reunion = {COLORES.ROJO} informativo = {false} reuniones = {this.state.reuniones} puntoDestino = { this.state.puntoDestino } puntoInicio = { this.state.puntoInicio } />
                        </View>
                
                </View>


                <View style = {estilo.footer}>

                    <TouchableOpacity onPress = {()=>{this._cambiarPantalla(0)}} style = {[estilo.footerBoton, {backgroundColor:this.state.footer.color[0]}]}>
                        <Text style = {[estilo.texto,{color:this.state.footer.fontColor[0], fontWeight: this.state.footer.fontWeight[0]}]}>Datos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>{this._cambiarPantalla(1)}} style = {[estilo.footerBoton, {backgroundColor:this.state.footer.color[1]}]}>
                        <Text style = {[estilo.texto,{color:this.state.footer.fontColor[1], fontWeight: this.state.footer.fontWeight[1]}]}>Mapa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=>{this._crearViaje();}} style = {estilo.footerBoton}>
                        <Text style = {[estilo.texto,{color:COLORES.NEGRO}]}>Crear</Text>
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