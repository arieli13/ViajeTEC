import React from 'react';
import {Text, View} from 'react-native'

import {TabNavigator} from 'react-navigation'

import Buscar_Principal from './Buscar_Principal'; 
import Buscar_Resultados from './Buscar_Resultados'; 
import Buscar_Mapa from './Buscar_Mapa'; 

ESTANDARES = require('../estandares');
COLORES=ESTANDARES.COLORES;


var Buscar_Navigator = TabNavigator({
    Datos: {screen: props => <Buscar_Principal x = "s" _funcion = {Buscar_Resultados._funcion} />},
    Mapa: {screen: Buscar_Mapa},
    Resultados: {screen: Buscar_Resultados}
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled : true,
    tabBarOptions:{
        activeTintColor: COLORES.GRIS_CLARO,
        inactiveTintColor: COLORES.GRIS_CLARO,
        style: {
            backgroundColor: COLORES.AZUL,
          }

    }
});

Buscar_Navigator.navigationOptions = {
    header:null
};

export default Buscar_Navigator;