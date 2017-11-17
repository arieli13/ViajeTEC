import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;
TIPOGRAFIAS = ESTANDARES.TIPOGRAFIAS;
import BotonComponente from './BotonComponente';

export default class CartaPequenniaComponente extends Component{

    _onPress(){
        this.props.onPress();
    }
    //<Button onPress = { () => {this._onPress()}} color = {this.props.color} title = "X" style = {{flex: 1}}></Button>
    render(){
        let button = null;
        if(this.props.mostrarBoton){
            button = <View style = {{flex:1, flexDirection: "row"}}>
                        <View style = {{flex: 5, alignItems: "center", justifyContent: "center"}}>
                            <Text>{this.props.detalle}</Text>
                        </View>
                        <View style = {{flex:1, alignItems: "center", justifyContent: "center", marginTop: this.props.boton_mt, marginBottom:this.props.boton_mb, marginLeft:this.props.boton_ml, marginRight:this.props.boton_mr}}>
                            <BotonComponente onPress = {this.props.boton_onPress} filled = {this.props.boton_filled} unfilled = {this.props.boton_unfilled} activo = {this.props.boton_activo} width = {this.props.boton_width} height = {this.props.boton_height}></BotonComponente>
                        </View>
                    </View>;
        }else{
            button = <View style = {{flex:1, flexDirection: "row"}}>
                        <View style = {{flex: 1, alignItems: "center", justifyContent: "center"}}>
                            <Text>{this.props.detalle}</Text>
                        </View>
                    </View>;
        }
        return(
            <View style = {{flex:1, backgroundColor: this.props.Background, marginBottom: 10, borderRadius: 10}}>
                <View style = {{flex:1, flexDirection: "row"}}>
                    <View style = {{flex:1, height: 70, borderRadius: 70/2, overflow: "hidden", alignItems: "center", position: "relative", backgroundColor: "white", margin: 10}}>
                        <Image style = {{height: 70, borderRadius: 70/2, flex:1, resizeMode: "contain"}} source={this.props.imagen}></Image>
                    </View>
                    <View style = {{flex:3, justifyContent: "space-around", justifyContent: "center", alignContent: "center"}}>
                        <View style = {{flex:1, alignItems: "center",  justifyContent: "center", borderBottomColor: 'black', borderBottomWidth: 1}}>
                            <Text style = {{color: COLORES.AZUL, fontSize: TIPOGRAFIAS.TAMANNIO_NORMAL, fontWeight: "bold"}}>{this.props.titulo}</Text>
                        </View>
                        {button}
                    </View>
                </View>
            </View>
        );
    }
}