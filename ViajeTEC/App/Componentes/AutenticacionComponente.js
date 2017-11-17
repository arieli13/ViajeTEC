import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, Alert, ActivityIndicator, AsyncStorage} from 'react-native';
import { TextField } from 'react-native-material-textfield'; //https://www.npmjs.com/package/react-native-material-textfield
import { NavigationActions } from 'react-navigation';
ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;
TIPOGRAFIAS = ESTANDARES.TIPOGRAFIAS;

import RestAPI from '../Clases/RestAPI.js';

export default class AutenticacionComponente extends Component{
    constructor(props){
        super(props);
        this.state = {
            usuario: "",
            contrasennia: "",
            error:"",
            conectando:false
        }
    }

    async _guardarUsuario(datos){
        try{
            await AsyncStorage.setItem('@nombre_usuario:key', datos.nombre_usuario);
        }catch(error){
            throw({error:"No se pudo guardar usuario en el dispositivo"});
        }
    }


    async _eliminarUsuario(){
        try {
            await AsyncStorage.removeItem('@nombre_usuario:key');
        } catch (error) {
        }
    }

    async componentWillMount(){
        try {
            var usuario = await AsyncStorage.getItem('@nombre_usuario:key');
            if (usuario != null){
                const { navigate } = this.props.navigation;
                navigate('EscogerUsuario');
            }
        } catch (error) {
        }
    }


    async _Ingresar(){
        try{
            var usuario = this.state.usuario;
            var contrasennia = this.state.contrasennia;
            this.setState({conectando:true});
            
            var respuesta = await RestAPI.autenticacion(usuario, contrasennia);

            this.setState({conectando:false});
            
            this._guardarUsuario({nombre_usuario:respuesta.nombre_usuario});

            const actionToDispatch = NavigationActions.reset({
                index: 0,
                key: null,  
                actions: [NavigationActions.navigate({ routeName: 'EscogerUsuario' })]
              })
              this.props.navigation.dispatch(actionToDispatch)
           
        }catch(e){
            if(e.error){
                this.setState({error: e.error});
            }else{
                Alert.alert("Ha ocurrido un error inesperado", JSON.stringify(e, null, 2));
                throw(e);
            }
            //this.setState({error: e, conectando:false});
            this.setState({conectando:false});
        }
    }

    render(){
        /*if(Usuario.inicioSesion){
            this.props.navigation.navigate('EscogerUsuario');
        }*/
        if(this.state.conectando){
            return(
                <View style = {estilos.login}>
                <TextField fontSize = {TIPOGRAFIAS.TAMANNIO_NORMAL} tintColor = {COLORES.AZUL} baseColor = {COLORES.GRIS_MEDIO}
                    label='Usuario'
                    onChangeText={ (text) => this.setState({usuario:text})}
                />
                <TextField fontSize = {TIPOGRAFIAS.TAMANNIO_NORMAL} tintColor = {COLORES.AZUL} baseColor = {COLORES.GRIS_MEDIO}
                    label='Contraseña'
                    onChangeText={ (text) => this.setState({contrasennia:text})}
                    secureTextEntry = {true}
                />
                <View>
                    <ActivityIndicator style = {{marginTop:20, marginBottom:20}}/>
                </View>
                <Button color = {COLORES.AZUL} onPress = {this._Ingresar.bind(this)} title = "Ingresar"></Button>
        </View>
            );
        }
        return(
            <View style = {estilos.login}>
                    <TextField fontSize = {TIPOGRAFIAS.TAMANNIO_NORMAL} tintColor = {COLORES.AZUL} baseColor = {COLORES.GRIS_MEDIO}
                        label='Usuario'
                        onChangeText={ (text) => this.setState({usuario:text})}
                    />
                    <TextField fontSize = {TIPOGRAFIAS.TAMANNIO_NORMAL} tintColor = {COLORES.AZUL} baseColor = {COLORES.GRIS_MEDIO}
                        label='Contraseña'
                        onChangeText={ (text) => this.setState({contrasennia:text})}
                        secureTextEntry = {true}
                    />
                    <View>
                        <Text style = {estilos.error}>
                            {this.state.error}
                        </Text>
                    </View>
                    <Button color = {COLORES.AZUL} onPress = {this._Ingresar.bind(this)} title = "Ingresar"></Button>
            </View>
        );
    }
}

const estilos = StyleSheet.create({
    login:{
        flex:1,
        flexDirection:'column',
        justifyContent: "center",
        marginLeft: 40,
        marginRight: 40
    },
    error:{
        marginTop:20,
        marginBottom: 20,
        color: COLORES.ROJO,
        fontFamily: TIPOGRAFIAS.TEXTO_NORMAL,
        fontSize: TIPOGRAFIAS.TAMANNIO_NORMAL
    }
});

