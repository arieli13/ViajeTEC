export default class RestAPI{
    static restapi = null;
    
    static ip  = "172.19.32.111";
    static puerto = "8081";
    
    constructor(){
    }

    static autenticacion(usuario, contrasennia){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: usuario,
                    pass: contrasennia,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static buscarUsuarios(usuario, datos){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/buscarUsuario',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: usuario,
                    datos: datos
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }
    static buscarViaje(usuario){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/buscarViaje',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: usuario
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static obtenerDatosUsuario(usuario, usuarioConsulta){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/obtenerDatosUsuario',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: usuario,
                    nombre_usuario_consulta: usuarioConsulta
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static crearFavorito(usuario, usuarioFavorito){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/favorito',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario_usuario: usuario,
                    nombre_usuario_favorito: usuarioFavorito
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static eliminarFavorito(usuario, usuarioFavorito){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/favorito',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario_usuario: usuario,
                    nombre_usuario_favorito: usuarioFavorito
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static obtenerFavoritos(usuario){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/favorito/'+usuario,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static bloquearUsuario(usuario, usuarioBloqueado){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/bloqueado',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario_usuario: usuario,
                    nombre_usuario_bloqueado: usuarioBloqueado
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static desbloquearUsuario(usuario, usuarioBloqueado){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/bloqueado',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario_usuario: usuario,
                    nombre_usuario_bloqueado: usuarioBloqueado
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static obtenerBloqueados(usuario){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/bloqueado/'+usuario,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static crearVehiculo(usuario, marca, placa, color){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/vehiculo',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario: usuario,
                    marca: marca,
                    placa:placa, 
                    color:color
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static obtenerVehiculos(usuario){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/vehiculo/'+usuario,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static eliminarVehiculo(id_vehiculo){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/vehiculo',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_vehiculo:id_vehiculo
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static eliminarViaje(id_viaje){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/viaje',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_viaje:id_viaje
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static modificarVehiculo(id_vehiculo, marca, placa, color){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/vehiculo',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_vehiculo:id_vehiculo,
                    marca:marca,
                    placa:placa,
                    color:color
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static obtenerPrecioCombustible(){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/combustible',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    resolve( 100 );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                resolve(100);
            });
        });
    }

    static crearViaje(datos){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/viaje',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_usuario:datos.nombre_usuario,
                    id_vehiculo:datos.id_vehiculo,
                    latitud_destino:datos.latitud_destino,
                    longitud_destino: datos.longitud_destino,
                    nombre_destino:datos.nombre_destino,
                    latitud_inicio:datos.latitud_inicio,
                    longitud_inicio:datos.longitud_inicio,
                    nombre_inicio: datos.nombre_inicio,
                    fecha_hora_inicio:datos.fecha_hora_inicio,
                    camposDisponibles:datos.camposDisponibles,
                    precio:datos.precio,
                    descripcion:datos.descripcion
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static obtenerViajes(usuario){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/viaje/'+usuario,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static obtenerViajesHistoricosPasajero(usuario){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/viajesHistoricosPasajero/'+usuario,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static obtenerViajesHistoricosConductor(usuario){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/viajesHistoricosConductor/'+usuario,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static obtenerViajesPendientes(usuario){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/viajePendiente/'+usuario,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static crearPuntoReunion(datos){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/puntoReunion',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_viaje:datos.id_viaje,
                    latitud_punto:datos.latitud_punto,
                    longitud_punto: datos.longitud_punto,
                    nombre:datos.nombre
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static verViaje(nombre_usuario, id_viaje){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/verViaje/'+nombre_usuario+'&'+id_viaje,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static verViajeHistorico(nombre_usuario, id_viajeHistorico){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/verViajeHistorico/'+nombre_usuario+'&'+id_viajeHistorico,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static aceptarRechazarPasajero(id_viaje, nombre_usuario_pasajero, confirmado){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/pasajero',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_viaje:id_viaje,
                    nombre_usuario_pasajero:nombre_usuario_pasajero,
                    confirmado: confirmado
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static reservarViaje(nombre_usuario_pasajero, id_puntoReunion, id_viaje){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/reservarViaje',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_viaje:id_viaje,
                    nombre_usuario_pasajero:nombre_usuario_pasajero,
                    id_punto_reunion: id_puntoReunion
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }

    static terminarViaje(id_viaje){
        return new Promise((resolve, reject)=>{
            fetch('http://'+this.ip+':'+this.puerto+'/api/viajeHistorico',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_viaje: id_viaje
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson['error']){
                    reject( {error:responseJson['error']} );
                }else{
                    resolve(responseJson);
                }
            })
            .catch((response) => response.json())
            .catch((error) => {
                reject( {error:"No se pudo conectar con el servidor"});
            });
        });
    }
}