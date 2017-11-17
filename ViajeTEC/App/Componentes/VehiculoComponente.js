import React, { Component } from 'react';
import {View, ScrollView, Image, Text, TextInput} from 'react-native';

ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;
TIPOGRAFIAS = ESTANDARES.TIPOGRAFIAS;

export default class VehiculoComponente extends Component{
    static navigationOptions = {
        header: null
      };
    render(){
        return(
            <View View style = {{flex:1, backgroundColor: COLORES.BACKGROUND}}>
                <View style = {{flex:1}}>                            
                    <ScrollView showsVerticalScrollIndicator={false} style = {{flex:1}}>

                        <View style = {{flex:1, justifyContent: "center", overflow: "hidden", alignItems: "center", position: "relative", margin: 10}}>
                            <Image  style = {{height: 150, width:150, borderRadius: 150/2, resizeMode: "stretch"}} source={this.props.imagen} />
                        </View>
                        
                        <View style = {{flex: 8, backgroundColor: COLORES.BLANCO, borderRadius: 10, marginHorizontal:30, marginVertical:30}}>
                            <View style = {{flex:1, alignItems: "center", flexDirection: "row", alignContent: "center", justifyContent: "center",  borderBottomColor: COLORES.GRIS_CLARO, borderBottomWidth:1, paddingBottom: 10, marginTop:10}}>
                                <Text style = {{flex:1, fontSize: TIPOGRAFIAS.TAMANNIO_NORMAL, fontWeight: "bold"}}>Marca</Text>
                                <TextInput style = {{flex:3, fontSize: TIPOGRAFIAS.TAMANNIO_NORMAL}} defaultValue = {this.props.marca}></TextInput>
                            </View>

                            <View style = {{flex:1, alignItems: "center",  flexDirection: "row", borderBottomColor: COLORES.GRIS_CLARO, borderBottomWidth:1, paddingBottom: 10, marginTop:10}}>
                                <Text style = {{flex:1, fontSize: TIPOGRAFIAS.TAMANNIO_NORMAL, fontWeight: "bold"}}>Placa</Text>
                                <TextInput style = {{flex:3, fontSize: TIPOGRAFIAS.TAMANNIO_NORMAL}} defaultValue = {this.props.placa}></TextInput>
                            </View>
                            <View style = {{flex:1, alignItems: "center",  flexDirection: "row", borderBottomColor: COLORES.GRIS_CLARO, borderBottomWidth:1, paddingBottom:10, marginTop:10}}>
                                <Text style = {{flex:1, fontSize: TIPOGRAFIAS.TAMANNIO_NORMAL, fontWeight: "bold"}}>Color</Text>
                                <TextInput style = {{flex:3, fontSize: TIPOGRAFIAS.TAMANNIO_NORMAL}} defaultValue = {this.props.color}></TextInput>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                
            </View>
        );    
    }
}