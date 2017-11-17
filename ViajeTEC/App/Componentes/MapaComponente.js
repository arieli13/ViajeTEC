import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, Icon, View, StyleSheet, Image, Alert, Text, Button, TextInput} from 'react-native';
import MapView from 'react-native-maps';
import BotonComponente from './BotonComponente';
import PopupDialog from 'react-native-popup-dialog';

import GWS from '../Clases/GoogleWebService'

ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;
TIPOGRAFIAS = ESTANDARES.TIPOGRAFIAS;
//https://github.com/airbnb/react-native-maps/blob/HEAD/docs/mapview.md


/////////

export default class MapaComponente extends Component{
    static navigationOptions = {
        header: null
      };

      constructor(props){
        super(props);
         
        this.state = {

            reuniones:this.props.reuniones,
            puntoDestino: this.props.puntoDestino,
            puntoInicio: this.props.puntoInicio,

            nuevoNombre:"", //Esto es para cuando se quiere cambiar el nombre de algún punto
            markerNuevoNombre : 0, //Indice si el nombre se le cambia a un inicio(0), destino (1) o reunion(2)
            indiceNuevoNombre: 0 //En caso de que markerNuevoNombre sea 2, este indica cual es el indice del elemento en el array de reuniones
        }

    }

    async _actualizar(){
        this.props.onFinish(this.state.puntoDestino, this.state.puntoInicio, this.state.reuniones);
    }

    async _annadirDestino(puntoDestinoAux){
        puntoDestinoAux.descripcion = await GWS.obtenerNombre( puntoDestinoAux.latitud, puntoDestinoAux.longitud );
        this.setState({puntoDestino: puntoDestinoAux });
        this._actualizar();
    }

    async _annadirInicio(puntoInicioAux){
        puntoInicioAux.descripcion = await GWS.obtenerNombre( puntoInicioAux.latitud, puntoInicioAux.longitud );
        this.setState({puntoInicio: puntoInicioAux });
        this._actualizar();
    }

    async _annadirPunto(evento){
            var coordenada = {
                latitud:evento.nativeEvent.coordinate.latitude,
                longitud: evento.nativeEvent.coordinate.longitude
            }

            var punto = { latitud: coordenada.latitud, longitud:coordenada.longitud};

            Alert.alert(
                'Añadir punto',
                '¿Qué punto desea crear/modificar?',
                [
                  {text: 'Destino', onPress: () => {this._annadirDestino(punto)}},
                  {text: 'Inicial', onPress: () => {this._annadirInicio(punto)}}
                ]
              );
    }
    async _annadirReunion(evento){
        var coordenada = {
            latitud:evento.nativeEvent.coordinate.latitude,
            longitud: evento.nativeEvent.coordinate.longitude
        }
        var descripcion = await GWS.obtenerNombre( coordenada.latitud, coordenada.longitud );
        var aux = { latitud: coordenada.latitud, longitud:coordenada.longitud, descripcion: descripcion};
        var reuniones = this.state.reuniones;
        reuniones.push(aux);
        this.setState({ reuniones: reuniones });
        this._actualizar();
    }

    async _modificarNombre(){
        var nuevoNombre = this.state.nuevoNombre;
        if(nuevoNombre == ""){
            return;
        }
        this.setState({nuevoNombre:""});
        var puntoAux;
        switch(this.state.markerNuevoNombre){
            case 0:
                puntoAux = this.state.puntoInicio;
                puntoAux.descripcion = nuevoNombre;
                this.setState({puntoInicio:puntoAux});
                this._actualizar();
                break;
            case 1:
                puntoAux = this.state.puntoDestino;
                puntoAux.descripcion = nuevoNombre;
                this.setState({puntoDestino:puntoAux});
                this._actualizar();
                break;
            case 2:
                var puntos = this.state.reuniones;
                puntoAux = puntos[this.state.indiceNuevoNombre];
                puntoAux.descripcion = nuevoNombre;
                puntos[this.state.indiceNuevoNombre] = puntoAux;
                this.setState({reuniones:puntos});
                this._actualizar();
                break;
            default:
                
        }
    }

    async _modificarDestinoCoordenada(evento){
        var coordenada = {
            latitud:evento.nativeEvent.coordinate.latitude,
            longitud: evento.nativeEvent.coordinate.longitude
        }
        var aux = {latitud: coordenada.latitud, longitud: coordenada.longitud};
        this._annadirDestino(aux);
    }

    async _modificarInicioCoordenada(evento){
        var coordenada = {
            latitud:evento.nativeEvent.coordinate.latitude,
            longitud: evento.nativeEvent.coordinate.longitude
        }
        var aux = {latitud: coordenada.latitud, longitud: coordenada.longitud};
        this._annadirInicio(aux);
    }

    async _modificarReunionCoordenada(evento, indice){
        var coordenada = {
            latitud:evento.nativeEvent.coordinate.latitude,
            longitud: evento.nativeEvent.coordinate.longitude
        }
        var reuniones = this.state.reuniones;
        reuniones[indice].latitud = coordenada.latitud;
        reuniones[indice].longitud = coordenada.longitud;
        reuniones[indice].descripcion = await GWS.obtenerNombre(coordenada.latitud, coordenada.longitud);
                
        this.setState({reuniones:reuniones});
        this._actualizar();
    }

    async _reunionPresionado(indice){
        await this.setState({markerNuevoNombre: 2, indiceNuevoNombre:indice});
        Alert.alert(
            '¿Qué desea hacer?',
            '¿Desea eliminar o modificar el nombre del punto?',
            [
              {text: 'Eliminar', onPress: () => {this._eliminarReunion(indice)}},
              {text: 'Modificar', onPress: () => {this.popupDialog.show(); }}
            ]
        );
    }
    async _inicioPresionado(){
        await this.setState({markerNuevoNombre: 0});
        this.popupDialog.show();
    }
    async _destinoPresionado(){
        await this.setState({markerNuevoNombre: 1});
        this.popupDialog.show();
    }
    _eliminarReunion(indice){
        var reunionesAux = [];
        for(var i = 0; i<this.state.reuniones.length;i++){
            if(i != indice ){
                reunionesAux.push( this.state.reuniones[i] );
            }
       }
       this.setState({ reuniones: reunionesAux });
       this._actualizar();
    }

      render() {
        var mapa;
        if(this.props.informativo){
            mapa = <MapView style = {{flex:1}} 
                        showsUserLocation={true}
                        followUserLocation={true}
                    >

                    {this.state.puntoInicio!=null?<MapView.Marker 
                                            key = {-1}
                                            coordinate={ 
                                                {
                                                    latitude: this.state.puntoInicio.latitud,
                                                    longitude: this.state.puntoInicio.longitud
                                                }
                                            }
                                            pinColor = {this.props.color_inicio}
                                            description = {this.state.puntoInicio.descripcion}
                                            title = "Punto inicio"
                                        >
                                        </MapView.Marker>:null}
                    {this.state.puntoDestino!=null?<MapView.Marker 
                                            key = {-2}
                                            coordinate={ 
                                                {
                                                    latitude: this.state.puntoDestino.latitud,
                                                    longitude: this.state.puntoDestino.longitud
                                                }
                                            }
                                            pinColor = {this.props.color_destino}
                                            description = {this.state.puntoDestino.descripcion}
                                            title = "Punto destino"
                                        >
                                        </MapView.Marker>:null}


                    {this.state.reuniones.length>0?this.state.reuniones.map((dato, index)=>{
                                    return  <MapView.Marker 
                                        key = {index}
                                        coordinate={ 
                                            {
                                                latitude: dato.latitud,
                                                longitude: dato.longitud
                                            }
                                        }
                                        pinColor = {this.props.color_reunion}
                                        description = {dato.descripcion}
                                        title = "Punto reunión"
                                    >
                                    </MapView.Marker>;


                                    }):null}

                    </MapView>
        }else{
            mapa = 
            <View style = {{flex:1}}>
                <MapView style = {{flex:1}} onPress = {(evento)=>{this._annadirReunion(evento)}} onLongPress = {(evento)=>{this._annadirPunto(evento)}}
    
                            showsUserLocation={true}
                            followUserLocation={true}
                        >

                        {this.state.puntoInicio!=null?<MapView.Marker 
                                                            key = {-1}
                                                            coordinate={ 
                                                                {
                                                                    latitude: this.state.puntoInicio.latitud,
                                                                    longitude: this.state.puntoInicio.longitud
                                                                }
                                                            }
                                                            pinColor = {this.props.color_inicio}
                                                            draggable
                                                            onDragEnd = {(evento)=>{this._modificarInicioCoordenada(evento)}}
                                                            description = {this.state.puntoInicio.descripcion}
                                                            title = "Punto inicio"
                                                        >
                                                        <MapView.Callout  onPress = {()=>{this._inicioPresionado()}}/>
                                                        </MapView.Marker>:null}
                        {this.state.puntoDestino!=null?<MapView.Marker 
                                                            key = {-2}
                                                            coordinate={ 
                                                                {
                                                                    latitude: this.state.puntoDestino.latitud,
                                                                    longitude: this.state.puntoDestino.longitud
                                                                }
                                                            }
                                                            pinColor = {this.props.color_destino}
                                                            draggable
                                                            onDragEnd = {(evento)=>{this._modificarDestinoCoordenada(evento)}}
                                                            description = {this.state.puntoDestino.descripcion}
                                                            title = "Punto destino"
                                                        >
                                                            <MapView.Callout  onPress = {()=>{this._destinoPresionado()}}/>
                                                        </MapView.Marker>:null}
                        
                        
                        {this.state.reuniones.length>0?this.state.reuniones.map((dato, index)=>{
                            return  <MapView.Marker 
                                        key = {index}
                                        coordinate={ 
                                            {
                                                latitude: dato.latitud,
                                                longitude: dato.longitud
                                            }
                                        }
                                        pinColor = {this.props.color_reunion}
                                        draggable
                                        onDragEnd = {(evento)=>{this._modificarReunionCoordenada(evento, index)}}
                                        description = {dato.descripcion}
                                        title = "Punto reunión"
                                    >
                                        <MapView.Callout  onPress = {()=>{this._reunionPresionado(index)}}/>
                                    </MapView.Marker>;
                            
                            
                            }):null}


                        </MapView>
                
                </View>
        }
        
        return (
            <View style = {{flex:1}}>
                        <PopupDialog
                            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                            dialogStyle = {{flex:1, backgroundColor: 'rgba(52, 52, 52, 0.8)', alignSelf:"center" }}
                        >
                            <View style = {{marginHorizontal:30}}>
                                <TextInput maxLength = {30} value = {this.state.nuevoNombre} onChangeText ={(texto)=>{this.setState({nuevoNombre:texto});}}  ></TextInput>
                                <Button style = {{flex:1}} color = {COLORES.AZUL} title = "Cambiar" onPress = {()=>{this._modificarNombre();this.popupDialog.dismiss();}}></Button>
                                <Button style = {{flex:1}} color = {COLORES.ROJO} title = "Cancelar" onPress = {()=>{this.popupDialog.dismiss();}}></Button>
                            </View>
                        </PopupDialog>

                {mapa}
            </View>
        );
      } 
}