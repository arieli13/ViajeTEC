const express = require ("express");
const bodyParser = require("body-parser");
const sql = require ("mssql");
const app = express();
const requestDatic = require('request');
const xml2js = require('xml2js');
const changeCase = require('change-case');

//app.use(bodyParser.urlencoded());
app.use(bodyParser.raw());
app.use(bodyParser.json());


app.use (function (req, res, next) {
    res.header ("Access-Control-Allow-Origin", "*");
    res.header ("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE");
    res.header ("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization");

    next();
});

var server = app.listen  (process.env.PORT || 8080, function () {
    var port = server.address ().port;
    console.log ("App running on port: ", port);
});

var sqlConfig = {
    user: "user",
    password: "123",
    server: "localhost\\MSSQLSERVER",
    database: "ViajeTEC",
    port: 1433
};


async function obtenerViajes(nombre_usuario){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario", sql.VarChar(15), nombre_usuario);
      request.execute("SP_ObtenerViajes")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}
async function crearViaje(datos){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario", sql.VarChar(15), datos.nombre_usuario);
      request.input("id_vehiculo", sql.Int , datos.id_vehiculo);
      request.input("latitud_destino", sql.Decimal(12,9) , datos.latitud_destino);
      request.input("longitud_destino", sql.Decimal(12,9) , datos.longitud_destino);
      request.input("nombre_destino", sql.NVarChar(30) , datos.nombre_destino);
      request.input("latitud_inicio", sql.Decimal(12,9) , datos.latitud_inicio);
      request.input("longitud_inicio", sql.Decimal(12,9) , datos.longitud_inicio);
      request.input("nombre_inicio", sql.NVarChar(30) , datos.nombre_inicio);
      request.input("fecha_hora_inicio", sql.NVarChar(20) , datos.fecha_hora_inicio);
      request.input("camposDisponibles", sql.TinyInt , datos.camposDisponibles);
      request.input("precio", sql.Int , datos.precio);
      request.input("descripcion", sql.NVarChar(100) , datos.descripcion);
      request.output("id_viaje", sql.Int);

      request.execute("SP_CrearViaje")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(request.parameters.id_viaje.value);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}
async function crearPuntoReunion(datos){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
  
      request.input("id_viaje", sql.Int , datos.id_viaje);
      request.input("latitud_punto", sql.Decimal(12,9) , datos.latitud_punto);
      request.input("longitud_punto", sql.Decimal(12,9) , datos.longitud_punto);
      request.input("nombre", sql.NVarChar(30) , datos.nombre);

      request.execute("SP_CrearPuntoReunion")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}
async function eliminarViaje(id_viaje){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
  
      request.input("id_viaje", sql.Int , id_viaje);

      request.execute("SP_EliminarViaje")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}

async function existeUsuario (nombre_usuario){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario", sql.VarChar(15), nombre_usuario);
      request.output("existe", sql.Int);
      request.execute("SP_ExisteUsuario")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(request.parameters.existe.value);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}
async function obtenerUsuario(nombre_usuario){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario", sql.VarChar(15), nombre_usuario);
      request.execute("SP_ObtenerUsuario")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}
async function registrarUsuario(nombre_usuario, nombre, apellido, telefono, correo, area, estudiante){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      var areaAux = area;
      areaAux = areaAux.replace("ESCUELA DE", "");
      areaAux = areaAux.replace("ESCUELA", "");
      request.input("nombre_usuario", sql.VarChar(15), nombre_usuario);
      request.input("nombre", sql.VarChar(10), changeCase.title(nombre));
      request.input("apellido", sql.VarChar(15), changeCase.title(apellido));
      request.input("telefono", sql.VarChar(10), telefono);
      request.input("correo", sql.VarChar(200), correo);
      request.input("area", sql.VarChar(60), changeCase.title(areaAux));
      request.input("estudiante", sql.Bit, estudiante);

      request.execute("SP_RegistrarUsuario")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}
async function actualizarUsuario(nombre_usuario, tipo_usuario){
  var datosActualizados;
  if(tipo_usuario){
    datosActualizados = await datosEstudiante(nombre_usuario);
  }else{
    datosActualizados = await datosFuncionario(nombre_usuario);
  }
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      var areaAux = datosActualizados.area;
      areaAux = areaAux.replace("ESCUELA DE", "");
      areaAux = areaAux.replace("ESCUELA", "");

      request.input("nombre_usuario", sql.VarChar(15), nombre_usuario);
      request.input("nombre", sql.VarChar(10), changeCase.title(datosActualizados.nombre));
      request.input("apellido", sql.VarChar(15), changeCase.title(datosActualizados.apellido));
      request.input("telefono", sql.VarChar(10), datosActualizados.telefono);
      request.input("correo", sql.VarChar(200), datosActualizados.correo);
      request.input("area", sql.VarChar(60), changeCase.title(areaAux));

      request.execute("SP_ActualizarUsuario")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error: "No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}
async function obtenerDatosUsuario(nombre_usuario, nombre_usuario_consulta){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario", sql.VarChar(15), nombre_usuario);
      request.input("nombre_usuario_consulta", sql.VarChar(15), nombre_usuario_consulta);

      request.execute("SP_ObtenerDatosUsuario")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}




async function obtenerVehiculos(nombre_usuario){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario", sql.VarChar(15), nombre_usuario);
      request.execute("SP_ObtenerVehiculos")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}
async function crearVehiculo(nombre_usuario, marca, placa, color){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario", sql.VarChar(15), nombre_usuario);
      request.input("marca", sql.VarChar(12), marca);
      request.input("placa", sql.VarChar(8), placa);
      request.input("color", sql.VarChar(15), color);
      request.execute("SP_CrearVehiculo") //Ejecuta el request.
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
        resolve(result);
        conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
        reject({error:error.message});
        conexion.close();
      });
  })
  .catch(function(error){ //Si la conexión falla, ejecuta esta función.
    reject({error:"No se ha podido conectar con la base de datos"});
    conexion.close();
  });
  });
}
async function modificarVehiculo(id_vehiculo, marca, placa, color){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("id_vehiculo", sql.Int, id_vehiculo);
      request.input("marca", sql.VarChar(12), marca);
      request.input("placa", sql.VarChar(8), placa);
      request.input("color", sql.VarChar(15), color);
      request.execute("SP_ModificarVehiculo") //Ejecuta el request.
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
        resolve(result);
        conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
        reject({error:error.message});
        conexion.close();
      });
  })
  .catch(function(error){ //Si la conexión falla, ejecuta esta función.
    reject({error:"No se ha podido conectar con la base de datos"});
    conexion.close();
  });
  });
}
async function eliminarVehiculo(id_vehiculo){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("id_vehiculo", sql.Int, id_vehiculo);
      request.execute("SP_EliminarVehiculo") //Ejecuta el request.
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
        resolve(result);
        conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
        reject({error:error.message});
        conexion.close();
      });
  })
  .catch(function(error){ //Si la conexión falla, ejecuta esta función.
    reject({error:"No se ha podido conectar con la base de datos"});
    conexion.close();
  });
  });
}



async function obtenerFavoritos(nombre_usuario){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario", sql.VarChar(15), nombre_usuario);
      request.execute("SP_ObtenerFavoritos")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}
async function crearFavorito(nombre_usuario_usuario, nombre_usuario_favorito){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario_usuario", sql.VarChar(15), nombre_usuario_usuario);
      request.input("nombre_usuario_favorito", sql.VarChar(15), nombre_usuario_favorito);
      request.execute("SP_CrearFavorito")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}
async function eliminarFavorito(nombre_usuario_usuario, nombre_usuario_favorito){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario_usuario", sql.VarChar(15), nombre_usuario_usuario);
      request.input("nombre_usuario_favorito", sql.VarChar(15), nombre_usuario_favorito);
      request.execute("SP_EliminarFavorito")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error: "No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}



async function obtenerBloqueados(nombre_usuario){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario", sql.VarChar(15), nombre_usuario);
      request.execute("SP_ObtenerBloqueados")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}
async function bloquearUsuario(nombre_usuario_usuario, nombre_usuario_bloqueado){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario_usuario", sql.VarChar(15), nombre_usuario_usuario);
      request.input("nombre_usuario_bloqueado", sql.VarChar(15), nombre_usuario_bloqueado);
      request.execute("SP_BloquearUsuario")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}
async function desbloquearUsuario(nombre_usuario_usuario, nombre_usuario_bloqueado){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario_usuario", sql.VarChar(15), nombre_usuario_usuario);
      request.input("nombre_usuario_bloqueado", sql.VarChar(15), nombre_usuario_bloqueado);
      request.execute("SP_DesbloquearUsuario")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}

async function buscarUsuario(nombre_usuario, datos){ //Obtiene todos los usuarios, consultados por uno en específico
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.input("nombre_usuario", sql.VarChar(15), nombre_usuario);
      request.input("datos", sql.VarChar(100), datos);
      request.execute("SP_BuscarUsuario")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}

async function obtenerPrecioCombustible(){
  return new Promise((resolve, reject)=>{
    var conexion = new sql.Connection(sqlConfig);//Se conecta a la base de datos.
    conexion.connect()
    .then(function() {  //En caso de conectarse exitosamente, ejecuta esta función.
      var request = new sql.Request(conexion); //Crea un nuevo request.
      request.execute("SP_ObtenerPrecioCombustible")
      .then(function(result) { //Si el request se ejecuta exitosamente, ejecuta esta función.
          resolve(result);
          conexion.close();
      })
      .catch(function(error){ //Si el request no termina exitosamente, ejecuta esta función.
          reject({error:error.message});
          conexion.close();
      });
    })
    .catch(function(error){ //Si la conexión falla, ejecuta esta función.
      reject({error:"No se ha podido conectar con la base de datos"});
      conexion.close();
    });
  });
}

////////////////////<WEB SERVICE DEL DATIC>

const rutas = {
  seguridad: "http://vtec-desarrollo/wsseguridad/seguridad.asmx",
  registro: "http://vtec-desarrollo/wsdar/admisionyregistro.asmx",
  funcionario: "http://vtec-desarrollo/wssivad/wssapiens.asmx"
}

async function validarUsuario(nombre_usuario, pass){
  //http://vtec-desarrollo/wsseguridad/seguridad.asmx?op=ValidarUsuario
  var xml = `<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <ValidarUsuario xmlns="http://www.itcr.ac.cr">
        <login>${nombre_usuario}</login>
        <pass>${pass}</pass>
      </ValidarUsuario>
    </soap12:Body>
  </soap12:Envelope>`;
  var opciones = {
    url:rutas.seguridad,
    method:"POST",
    headers:{
        'Content-Type': 'application/soap+xml; charset=utf-8',
    },
     body: xml
  };
  return new Promise((resolve, reject)=>{

    requestDatic.post(opciones,
      function(err, response, body){
        if(err){
          reject({error: 'No se pudo conectar con el servidor en el DATIC.'});
        }else{
          xml2js.parseString(body, function (err, result) {
            if(err){
              reject({error: 'No se pudo convertir la respuesta XML a JSON.'});
            }else{
              var valido = result['soap:Envelope']['soap:Body'][0]['ValidarUsuarioResponse'][0]['ValidarUsuarioResult'][0];
              if(valido === "true"){
                resolve(true);
              }else{
                resolve(false);
              }
            }
          });
        }
      });
  });
}
async function tipoUsuario(nombre_usuario){
  //http://vtec-desarrollo/wsseguridad/seguridad.asmx?op=TipoUsuario
  var xml = `<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <TipoUsuario xmlns="http://www.itcr.ac.cr">
        <usuario>${nombre_usuario}</usuario>
      </TipoUsuario>
    </soap12:Body>
  </soap12:Envelope>`;
  var opciones = {
    url:rutas.seguridad,
    method:"POST",
    headers:{
        'Content-Type': 'application/soap+xml; charset=utf-8',
    },
     body: xml
  };
  return new Promise((resolve, reject)=>{
    requestDatic.post(opciones,
      function(err, response, body){
        if(err){
          reject({error: 'No se pudo conectar con el servidor.'});
        }else{
          xml2js.parseString(body, function (err, result) {
            if(err){
              reject({error: 'No se pudo convertir la respuesta XML a JSON.'});
            }else{
              var valido = "true";//result['soap:Envelope']['soap:Body'][0]['ValidarUsuarioResponse'][0]['ValidarUsuarioResult'][0];
              resolve(result['soap:Envelope']['soap:Body'][0]['TipoUsuarioResponse'][0]['TipoUsuarioResult'][0]);
            }
          });
        }
      });
  });
}
async function datosEstudiante(nombre_usuario){
  //http://vtec-desarrollo/wsdar/admisionyregistro.asmx?op=IESCDATOSESTUDIANTE_Buscar_ActivoSinMatricula
  var xml = `<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <IESCDATOSESTUDIANTE_Buscar_ActivoSinMatricula xmlns="http://tempuri.org/">
        <pCarne>${nombre_usuario}</pCarne>
      </IESCDATOSESTUDIANTE_Buscar_ActivoSinMatricula>
    </soap12:Body>
  </soap12:Envelope>`;
  var opciones = {
    url: rutas.registro,
    method:"POST",
    headers:{
        'Content-Type': 'application/soap+xml; charset=utf-8',
    },
     body: xml
  };
  return new Promise((resolve, reject)=>{
    requestDatic.post(opciones,
      function(err, response, body){
        if(err){
          reject({error: 'No se pudo conectar con el servidor.'});
        }else{
          xml2js.parseString(body, function (err, result) {
            if(err){
              reject({error: 'No se pudo convertir la respuesta XML a JSON.'});
            }else{
              var datos = result['soap:Envelope']['soap:Body'][0]['IESCDATOSESTUDIANTE_Buscar_ActivoSinMatriculaResponse'][0]['IESCDATOSESTUDIANTE_Buscar_ActivoSinMatriculaResult'][0]['diffgr:diffgram'][0]['NewDataSet'][0]['IESCDATOSESTUDIANTE'][0];
              var nombre = datos['NOM_ESTUDIANTE'][0].split(" ");
              var jDatos = {
                nombre: nombre[2],
                apellido: nombre[0],
                telefono: datos['NUM_CELULAR'][0],
                correo: datos['DIR_CORREO'][0],
                area: datos['DSC_DEPTO'][0]
              }
              resolve(jDatos);
            }
          });
        }
      });
  });
}
async function datosFuncionario(nombre_usuario){
  //http://vtec-desarrollo/wssivad/wssapiens.asmx?op=BuscarFuncionario
  var xml = `<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <BuscarFuncionario xmlns="http://tempuri.org/">
        <CedulaNombreLogin>${nombre_usuario}</CedulaNombreLogin>
      </BuscarFuncionario>
    </soap12:Body>
  </soap12:Envelope>`;
  var opciones = {
    url: rutas.funcionario,
    method:"POST",
    headers:{
        'Content-Type': 'application/soap+xml; charset=utf-8',
    },
     body: xml
  };
  return new Promise((resolve, reject)=>{
    requestDatic.post(opciones,
      function(err, response, body){
        if(err){
          reject({error: 'No se pudo conectar con el servidor.'});
        }else{
          xml2js.parseString(body, function (err, result) {
            if(err){
              reject({error: 'No se pudo convertir la respuesta XML a JSON.'});
            }else{
              var datos = result['soap:Envelope']['soap:Body'][0]['BuscarFuncionarioResponse'][0]['BuscarFuncionarioResult'][0]['diffgr:diffgram'][0]['NewDataSet'][0]['MINISIF_Generica'][0];
              
              var jDatos = {
                nombre: changeCase.title(datos['DEnombre'][0]),
                apellido: changeCase.title(datos['DEapellido1'][0]),
                telefono: datos['DEtelefono2'][0],
                correo: datos['DEemail'][0],
                area: 'Funcionario'
              }
              resolve(jDatos);
            }
          });
        }
      });
  });
}

////////////////////</WEB SERVICE DEL DATIC>

async function login(nombre_usuario, pass){
    /*var valido = await validarUsuario(nombre_usuario, pass);
    if(!valido){
      throw {error:'Usuario o contraseña inválidos', descripcion: 'El usuario o contraseña ingresados no son inválidos', funcion: 'login'};
    }*/

    var existeEnBD = await existeUsuario(nombre_usuario);
    if(existeEnBD){
      var datos = await obtenerUsuario(nombre_usuario);
      return datos;
    }else{
      throw({error:"El usuario no existe"}); //ELIMINAR ESTA LÍNEA
      var tipo = await tipoUsuario(nombre_usuario);
      var datos;
      switch(tipo){
        case "1":
          datos = await datosEstudiante(nombre_usuario);
          var nuevoEstudiante = await registrarUsuario(nombre_usuario, datos.nombre, datos.apellido, datos.telefono, datos.correo, datos.area, true);
          nuevoEstudiante = nuevoEstudiante[0][0];
          return (
            [
              [{
                tipo: nuevoEstudiante.tipo,
                nombre_usuario: nuevoEstudiante.nombre_usuario,
                nombre: nuevoEstudiante.nombre,
                apellido: nuevoEstudiante.apellido,
                telefono: nuevoEstudiante.telefono,
                correo: nuevoEstudiante.correo,
                area: nuevoEstudiante.area,
                estudiante: 1
              }]
            ]
          );
        case "2":
          datos = await datosFuncionario(nombre_usuario);
          var nuevoFuncionario = await registrarUsuario(nombre_usuario, datos.nombre, datos.apellido, datos.telefono, datos.correo, datos.area, false);
          nuevoFuncionario = nuevoFuncionario[0][0];
          return (
            [
              [
              {
                tipo: nuevoFuncionario.tipo,
                nombre_usuario: nuevoFuncionario.nombre_usuario,
                nombre: nuevoFuncionario.nombre,
                apellido: nuevoFuncionario.apellido,
                telefono: nuevoFuncionario.telefono,
                correo: nuevoFuncionario.correo,
                area: nuevoFuncionario.area,
                estudiante: 0
              }
              ]
            ]
          );
        default:
          throw {error: 'El usuario y contraseñan están correctos, pero no es funcionario ni estudiante'};
      }
    }
}

app.post('/api/login', function (req, res) { //Retorna verdadero o falso, dependiendo de las credenciales.
  try{
    var datos = req.body;
    login(datos.nombre_usuario, datos.pass).then(function(result){
      res.json(result[0][0]);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  } 
});

///////REST API

//VEHICULO
app.get('/api/vehiculo/:nombre_usuario', function (req, res) { //Retorna todos los vehiculos de un usuario
  try{
    var nombre_usuario = req.params.nombre_usuario;
    obtenerVehiculos(nombre_usuario).then(function(vehiculos) {
      res.json(vehiculos[0]);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});
app.post('/api/vehiculo/', function (req, res) { //Crea un nuevo vehículo
  try{
    var datos = req.body;
    crearVehiculo(datos.nombre_usuario, datos.marca, datos.placa, datos.color).then(function(vehiculos) {
      res.json(vehiculos);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});
app.put('/api/vehiculo/', function (req, res) { //Modifica un nuevo vehículo
  try{
    var datos = req.body;
    modificarVehiculo(datos.id_vehiculo, datos.marca, datos.placa, datos.color).then(function(vehiculos) {
      res.json(vehiculos);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});
app.delete('/api/vehiculo/', function (req, res) { //Modifica un nuevo vehículo
  try{
    var datos = req.body;
    eliminarVehiculo(datos.id_vehiculo).then(function(vehiculos) {
      res.json(vehiculos[0]);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});

//FAVORITO
app.get('/api/favorito/:nombre_usuario', function (req, res) { //Retorna todos los usuarios favoritos de un usuario
  try{
    var nombre_usuario = req.params.nombre_usuario;
    obtenerFavoritos(nombre_usuario).then(function(favoritos) {
      res.json(favoritos[0]);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});
app.post('/api/favorito/', function (req, res) { //Agrega como favorito a un usuario
  try{
    var datos = req.body;
    crearFavorito(datos.nombre_usuario_usuario, datos.nombre_usuario_favorito).then(function(favoritos) {
      res.json(favoritos);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});
app.delete('/api/favorito/', function (req, res) { //Quita como favorito a un usuario
  try{
    var datos = req.body;
    eliminarFavorito(datos.nombre_usuario_usuario, datos.nombre_usuario_favorito).then(function(favoritos) {
      res.json(favoritos);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});

//BLOQUEADO
app.get('/api/bloqueado/:nombre_usuario', function (req, res) { //Retorna todos los usuarios bloqueados de un usuario
  try{
    var nombre_usuario = req.params.nombre_usuario;
    obtenerBloqueados(nombre_usuario).then(function(bloqueados) {
      res.json(bloqueados[0]);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});
app.post('/api/bloqueado/', function (req, res) { //Bloquea a un usuario
  try{
    var datos = req.body;
    bloquearUsuario(datos.nombre_usuario_usuario, datos.nombre_usuario_bloqueado).then(function(bloqueados) {
      res.json(bloqueados);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});
app.delete('/api/bloqueado/', function (req, res) { //Desbloquea a un usuario
  try{
    var datos = req.body;
    desbloquearUsuario(datos.nombre_usuario_usuario, datos.nombre_usuario_bloqueado).then(function(bloqueados) {
      res.json(bloqueados);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});

//USUARIO
app.get('/api/usuario/:nombre_usuario', function (req, res) { 
  try{
    var nombre_usuario = req.params.nombre_usuario;
    obtenerUsuario(nombre_usuario).then(function(usuario) {
      res.json(usuario);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});
app.put('/api/usuario/', function (req, res) { 
  try{
    var nombre_usuario = req.body.nombre_usuario;
    var estudiante = req.body.estudiante;
    actualizarUsuario(nombre_usuario, estudiante).then(function(usuario) {
      res.json(usuario);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});

//CONSULTAS_USUARIO
app.post('/api/buscarUsuario', function (req, res) { //Retorna los resultados de los usuario que coincidan con los datos de búsqueda
  try{
    var datos = req.body;
    buscarUsuario(datos.nombre_usuario, datos.datos).then(function(usuarios) {
      res.json(usuarios[0]);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});

app.post('/api/obtenerDatosUsuario', function (req, res) {
  try{
    var datos = req.body;
    obtenerDatosUsuario(datos.nombre_usuario, datos.nombre_usuario_consulta).then(function(usuario) {
      res.json(usuario[0][0]);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});

//COPMBUSTIBLE
app.get('/api/combustible', function (req, res) {
  try{
    obtenerPrecioCombustible().then(function(usuario) {
      res.json(usuario[0][0].precio);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});

//VIAJE
app.post('/api/viaje', function (req, res) {
  try{
    var datos = req.body;
    crearViaje(datos).then(function(respuesta) {
      res.json(respuesta);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});
app.delete('/api/viaje/', function (req, res) {
  try{
    var datos = req.body;
    eliminarViaje(datos.id_viaje).then(function(respuesta) {
      res.json(respuesta);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});
app.get('/api/viaje/:nombre_usuario', function (req, res) {
  try{
    obtenerViajes(req.params.nombre_usuario).then(function(viajes) {
      res.json(viajes[0]);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});

app.post('/api/puntoReunion', function (req, res) {
  try{
    var datos = req.body;
    crearPuntoReunion(datos).then(function(respuesta) {
      res.json(respuesta);
    }).catch(function(error){
      res.json(error);
    });
  }catch(error){
    res.json(error);
  }
});