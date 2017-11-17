import React, { Component } from 'react';
import {View, TouchableOpacity, Image} from 'react-native';


ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;

export default class BotonComponente extends Component{
    
    constructor(props){
        super(props);

       if(this.props.activo){
        this.state = {
            imagen: this.props.filled,
            activo: true
        }
       }else{
        this.state = {
            imagen: this.props.unfilled,
            activo: false
        }
       }
    }

    _onPress(){
        
        if(this.state.activo){
            this.setState({imagen: this.props.unfilled, activo:false});
        }else{
            this.setState({imagen:this.props.filled, activo:true});
        }
        this.props.onPress();
        
    }

    render(){

        return(
            <View View style = {{flex:1, backgroundColor: this.props.background}} >
                <TouchableOpacity onPress = {this._onPress.bind(this)} style = {{flex:1, justifyContent: "center", overflow: "hidden", alignItems: "center", position: "relative"}}>
                    <Image  style = {{flex:1, height: this.props.height, width: this.props.width, resizeMode: "stretch"}} source={this.state.imagen} />    
                </TouchableOpacity>          
            </View>
        );    
    } 
}