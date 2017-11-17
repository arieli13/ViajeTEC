import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, Icon, View, StyleSheet, Image, Alert, Text} from 'react-native';

import { StackNavigator } from 'react-navigation';

import Autenticacion from './App/Pantallas/Autenticacion';
import EscogerUsuario from './App/Pantallas/EscogerUsuario';
import MenuPrincipalPasajero from './App/Pantallas/MenuPrincipalPasajero';
import Favoritos from './App/Pantallas/Favoritos';
import Bloqueados from './App/Pantallas/Bloqueados';
import ViajesPendientes from './App/Pantallas/ViajesPendientes';
import ViajesHistoricosPasajero from './App/Pantallas/ViajesHistoricosPasajero';
import ViajesHistoricosConductor from './App/Pantallas/ViajesHistoricosConductor';
import Perfil from './App/Pantallas/Perfil';
import MenuPrincipalConductor from './App/Pantallas/MenuPrincipalConductor';
import Vehiculos from './App/Pantallas/Vehiculos';
import ModificarVehiculo from './App/Pantallas/ModificarVehiculo';
import Buscar from './App/Pantallas/Buscar';
import CrearVehiculo from './App/Pantallas/CrearVehiculo';
import TerminosCondiciones from './App/Pantallas/TerminosCondiciones';
import Viajes from './App/Pantallas/Viajes';
import Buscar_Navigator from './App/Pantallas/Buscar_Navigator';
import VerViajeConductor from './App/Pantallas/VerViajeConductor';
import VerViajePasajero from './App/Pantallas/VerViajePasajero';
import VerViajeHistoricoPasajero from './App/Pantallas/VerViajeHistoricoPasajero';
import VerViajeHistoricoConductor from './App/Pantallas/VerViajeHistoricoConductor';
import MiPerfil from './App/Pantallas/MiPerfil';

import Blanca from './App/Pantallas/Blanca';
/////////
import CrearViaje from './App/Pantallas/CrearViaje';
export default app = StackNavigator({
    'Home': { screen: Blanca },
    'EscogerUsuario': {screen: EscogerUsuario},
    'Autenticacion': {screen:Autenticacion},

    'MenuPrincipalPasajero': {screen: MenuPrincipalPasajero},
    'Favoritos': {screen: Favoritos},
    'Bloqueados': {screen: Bloqueados},
    'ViajesPendientes':{screen:ViajesPendientes},
    'ViajesHistoricosPasajero':{screen: ViajesHistoricosPasajero},
    'ViajesHistoricosConductor':{screen: ViajesHistoricosConductor},
    'Perfil': {screen:Perfil},
    'MenuPrincipalConductor':{screen:MenuPrincipalConductor},
    'Vehiculos':{screen:Vehiculos},
    'ModificarVehiculo':{screen:ModificarVehiculo},
    'Buscar':{screen:Buscar},
    'CrearViaje':{screen: CrearViaje},
    'CrearVehiculo':{screen: CrearVehiculo},
    'VerViajeConductor':{screen:VerViajeConductor},
    'VerViajePasajero':{screen:VerViajePasajero},
    'TerminosCondiciones':{screen:TerminosCondiciones},
    'Viajes':{screen:Viajes},
    'Buscar_Navigator':{screen:Buscar_Navigator},
    'VerViajeHistoricoConductor':{screen: VerViajeHistoricoConductor},
    'VerViajeHistoricoPasajero':{screen: VerViajeHistoricoPasajero},
    'MiPerfil':{screen: MiPerfil},
    'Blanca':{screen: Blanca}
  });


AppRegistry.registerComponent('ViajeTEC', () => app);