export default class Usuario{

    static inicioSesion = false;

    static usuario = {
        id: -1,
        tipo: false,
        nombre_usuario: "",
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        area: ""

    }

    constructor(){
    }

    static iniciarSesion(id, tipo, nombre_usuario, nombre, apellido, telefono, correo, area){
        this.inicioSesion = true;
        this.usuario.id = id;
        this.usuario.tipo = tipo;
        this.usuario.nombre_usuario = nombre_usuario;
        this.usuario.nombre = nombre;
        this.usuario.apellido = apellido;
        this.usuario.telefono = telefono;
        this.usuario.correo = correo;
        this.usuario.area = area;
    }
    static cerrarSesion(){
        this.iniciarSesion = false;
        this.usuario = {
            id: -1,
            tipo: false,
            nombre_usuario: "",
            nombre: "",
            apellido: "",
            telefono: "",
            correo: "",
            area: ""
        }
    }

}