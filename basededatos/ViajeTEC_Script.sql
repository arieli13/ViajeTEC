create database ViajeTEC;

use ViajeTEC;

create table TipoUsuario(
	id_tipoUsuario tinyint IDENTITY(1,1),
	nombre nvarchar(13),
	PRIMARY KEY(id_tipoUsuario)
);

create table Usuario(
	id_usuario int IDENTITY(1, 1),
	nombre_usuario nvarchar(15) NOT NULL UNIQUE,
	nombre nvarchar(10) NOT NULL,
	apellido nvarchar(15) NOT NULL,
	telefono nvarchar(10) NOT NULL,
	correo nvarchar(200) NOT NULL,
	area nvarchar(60) NOT NULL,
	estudiante bit NOT NULL,
	id_tipoUsuario tinyint NOT NULL,
	baneado bit NOT NULL DEFAULT 0, 
	PRIMARY KEY(id_usuario),
	FOREIGN KEY (id_tipoUsuario) REFERENCES TipoUsuario(id_tipoUsuario),
);

create table Favorito(
	id_favorito int NOT NULL IDENTITY(1, 1), 
	id_usuario int NOT NULL,
	id_usuarioFavorito int NOT NULL,
	PRIMARY KEY(id_favorito),
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
	FOREIGN KEY (id_usuarioFavorito) REFERENCES Usuario(id_usuario)
);

create table Bloqueado(
	id_bloqueado int NOT NULL IDENTITY(1, 1), 
	id_usuario int NOT NULL,
	id_usuarioBloqueado int NOT NULL,
	PRIMARY KEY(id_bloqueado),
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
	FOREIGN KEY (id_usuarioBloqueado) REFERENCES Usuario(id_usuario)
);

create table Vehiculo(
	id_vehiculo int NOT NULL IDENTITY(1, 1), 
	id_usuario int NOT NULL,
	marca varchar(12) NOT NULL,
	placa varchar(8) NOT NULL,
	color varchar(15) NOT NULL,
	eliminado bit DEFAULT 0,
	PRIMARY KEY(id_vehiculo),
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

create table Viaje(
	id_viaje int NOT NULL IDENTITY(1, 1), 
	id_conductor int NOT NULL,
	id_vehiculo int NOT NULL,
	latitud_destino decimal(12,9) NOT NULL,
	longitud_destino decimal (12, 9) NOT NULL,
	latitud_inicio decimal(12,9) NOT NULL,
	longitud_inicio decimal (12, 9) NOT NULL,
	fecha_hora_inicio datetime NOT NULL,
	descripcion nvarchar(100),
	camposDisponibles tinyint NOT NULL,
	precio int NOT NULL,
	nombre_destino nvarchar(30) NOT NULL,
	nombre_inicio nvarchar(30) NOT NULL,
	hora_destino Time NOT NULL,
	PRIMARY KEY(id_viaje),
	FOREIGN KEY (id_conductor) REFERENCES Usuario(id_usuario),
	FOREIGN KEY (id_vehiculo) REFERENCES Vehiculo(id_vehiculo)
);

create table PuntoReunion(
	id_puntoReunion int NOT NULL IDENTITY(1, 1), 
	id_viaje int NOT NULL,
	latitud_punto decimal(12, 9) NOT NULL,
	longitud_punto decimal(12, 9) NOT NULL,
	nombre nvarchar(30) NOT NULL,
	hora_estimada Time NOT NULL,
	PRIMARY KEY(id_puntoReunion),
	FOREIGN KEY (id_viaje) REFERENCES Viaje(id_viaje)
);

create table PasajeroViaje(
	id_pasajeroViaje int NOT NULL IDENTITY(1, 1), 
	id_viaje int NOT NULL,
	id_pasajero int NOT NULL,
	confirmado bit NOT NULL DEFAULT 0,
	id_puntoReunion int NOT NULL,
	PRIMARY KEY(id_pasajeroViaje),
	FOREIGN KEY (id_viaje) REFERENCES Viaje(id_viaje),
	FOREIGN KEY (id_pasajero) REFERENCES Usuario(id_usuario),
	FOREIGN KEY (id_puntoReunion) REFERENCES PuntoReunion(id_puntoReunion)
);

create table ViajeHistorico(
	id_viajeHistorico bigint NOT NULL IDENTITY(1, 1), 
	id_conductor int NOT NULL,
	id_vehiculo int NOT NULL,
	latitud_destino decimal(12,9) NOT NULL,
	longitud_destino decimal (12, 9) NOT NULL,
	latitud_inicio decimal(12,9) NOT NULL,
	longitud_inicio decimal (12, 9) NOT NULL,
	fecha_hora_inicio datetime NOT NULL,
	descripcion nvarchar(100),
	precio int NOT NULL,
	nombre_destino nvarchar(30) NOT NULL,
	nombre_inicio nvarchar(30) NOT NULL,
	hora_destino Time NOT NULL,
	PRIMARY KEY(id_viajeHistorico),
	FOREIGN KEY (id_conductor) REFERENCES Usuario(id_usuario),
	FOREIGN KEY (id_vehiculo) REFERENCES Vehiculo(id_vehiculo)
);

create table PuntoReunionHistorico(
	id_puntoReunionHistorico bigint NOT NULL IDENTITY(1, 1), 
	id_viajeHistorico bigint NOT NULL,
	latitud_punto decimal(12, 9) NOT NULL,
	longitud_punto decimal(12, 9) NOT NULL,
	nombre nvarchar(30) NOT NULL,
	hora_estimada Time NOT NULL,
	PRIMARY KEY(id_puntoReunionHistorico),
	FOREIGN KEY (id_viajeHistorico) REFERENCES ViajeHistorico(id_viajeHistorico)
);

create table PasajeroViajeHistorico(
	id_pasajeroViajeHistorico bigint NOT NULL IDENTITY(1, 1), 
	id_viajeHistorico bigint NOT NULL,
	id_pasajero int NOT NULL,
	confirmado bit NOT NULL DEFAULT 0,
	id_puntoReunionHistorico bigint NOT NULL,
	PRIMARY KEY(id_pasajeroViajeHistorico),
	FOREIGN KEY (id_viajeHistorico) REFERENCES ViajeHistorico(id_viajeHistorico),
	FOREIGN KEY (id_pasajero) REFERENCES Usuario(id_usuario),
	FOREIGN KEY (id_puntoReunionHistorico) REFERENCES PuntoReunionHistorico(id_puntoReunionHistorico)
);

create table ViajePredeterminado(
	id_viajePredeterminado int NOT NULL IDENTITY(1, 1), 
	id_conductor int NOT NULL,
	latitud_destino decimal(12,9) NOT NULL,
	longitud_destino decimal (12, 9) NOT NULL,
	latitud_inicio decimal(12,9) NOT NULL,
	longitud_inicio decimal (12,9) NOT NULL,
	nombre_inicio nvarchar(30) NOT NULL,
	nombre_destino nvarchar(30) NOT NULL,
	PRIMARY KEY(id_viajePredeterminado),
	FOREIGN KEY (id_conductor) REFERENCES Usuario(id_usuario)
);

create table PuntoReunionPredeterminado(
	id_puntoReunionPredeterminado int NOT NULL IDENTITY(1, 1), 
	id_viajePredeterminado int NOT NULL,
	latitud_punto decimal(12, 9) NOT NULL,
	longitud_punto decimal(12, 9) NOT NULL,
	nombre nvarchar(30) NOT NULL,
	hora_estimada Time NOT NULL,
	PRIMARY KEY(id_puntoReunionPredeterminado),
	FOREIGN KEY (id_viajePredeterminado) REFERENCES ViajePredeterminado(id_viajePredeterminado)
);

create table Calificacion(
	id_calificacion bigint IDENTITY(1,1),
	id_calificador int NOT NULL,
	id_calificado int NOT NULL,
	id_viajeHistorico bigint NOT NULL,
	PRIMARY KEY(id_calificacion),
	FOREIGN KEY (id_calificador) REFERENCES Usuario(id_usuario),
	FOREIGN KEY (id_calificado) REFERENCES Usuario(id_usuario),
	FOREIGN KEY (id_viajeHistorico) REFERENCES ViajeHistorico(id_viajeHistorico),
);

create table Combustible(
	id_combustible tinyint IDENTITY(1, 1),
	nombre nvarchar(8) NOT NULL,
	precio int NOT NULL,
	fecha Date NOT NULL,
	PRIMARY KEY(id_combustible)
);

create table Reporte(
	id_reporte int IDENTITY(1, 1),
	id_reportero int NOT NULL,
	id_reportado int NOT NULL,
	id_viajeHistorico bigint NOT NULL,
	descripcion nvarchar(100)
	PRIMARY KEY(id_reporte),
	FOREIGN KEY (id_reportero) REFERENCES Usuario(id_usuario),
	FOREIGN KEY (id_reportado) REFERENCES Usuario(id_usuario),
	FOREIGN KEY (id_viajeHistorico) REFERENCES ViajeHistorico(id_viajeHistorico)

);

create table Logro(
	id_logro int IDENTITY(1,1),
	nombre nvarchar(30) NOT NULL,
	descripcion nvarchar(100) NOT NULL,
	PRIMARY KEY (id_logro)
);

create table LogroXusuario(
	id_logroXusuario bigint IDENTITY(1,1),
	id_logro int NOT NULL,
	id_usuario int NOT NULL,
	PRIMARY KEY(id_logroXusuario),
	FOREIGN KEY (id_logro) REFERENCES Logro(id_logro),
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
);

create table Tabla(
	id_tabla tinyint IDENTITY(1, 1),
	nombre nvarchar(35) NOT NULL,
	PRIMARY KEY(id_tabla)
);

create table Actividad(
	id_actividad tinyint IDENTITY(1, 1),
	nombre nvarchar(12),
	PRIMARY KEY(id_actividad)
);

create table Bitacora(
	id_bitacora bigint IDENTITY(1, 1),
	id_usuario int NOT NULL,
	id_tabla tinyint NOT NULL,
	id_actividad tinyint NOT NULL,
	fecha datetime NOT NULL,
	descripcion nvarchar(100),
	PRIMARY KEY(id_bitacora),
	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
	FOREIGN KEY (id_tabla) REFERENCES Tabla(id_tabla),
	FOREIGN KEY (id_actividad) REFERENCES Actividad(id_actividad)
);