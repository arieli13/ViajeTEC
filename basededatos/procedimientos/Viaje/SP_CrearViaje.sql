-----------------------------------------------------------
-- Autor: Ariel Rodríguez
-- Fecha: 22/09/2017
-- Descripcion: Crea un nuevo viaje
-----------------------------------------------------------
--USE ViajeTEC
--DROP PROCEDURE dbo.SP_CrearViaje
CREATE PROCEDURE dbo.SP_CrearViaje
	@nombre_usuario varchar(15),
	@id_vehiculo int,
	@latitud_destino decimal(12,9),
	@longitud_destino decimal(12,9),
	@nombre_destino nvarchar(30),
	@latitud_inicio decimal(12,9),
	@longitud_inicio decimal(12,9),
	@nombre_inicio nvarchar(30),
	@fecha_hora_inicio nvarchar(20),
	@camposDisponibles tinyint,
	@precio int,
	@descripcion nvarchar(100),
	@id_viaje int output
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @InicieTransaccion BIT
	
	DECLARE @id_usuario INT
	
	SET @InicieTransaccion = 0
	IF @@TRANCOUNT=0 BEGIN
		SET @InicieTransaccion = 1
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED
		BEGIN TRANSACTION		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario = @nombre_usuario, @id_usuario = @id_usuario OUTPUT;
		
		insert into Viaje (id_conductor,
						    id_vehiculo,
						    latitud_destino ,
							longitud_destino ,
							nombre_destino ,
							latitud_inicio ,
							longitud_inicio ,
							nombre_inicio ,
							fecha_hora_inicio ,
							camposDisponibles ,
							precio,
							descripcion) values 
							(
								@id_usuario,
						    @id_vehiculo,
						    @latitud_destino ,
							@longitud_destino ,
							@nombre_destino ,
							@latitud_inicio ,
							@longitud_inicio ,
							@nombre_inicio ,
							CONVERT(datetime, @fecha_hora_inicio, 20),
							@camposDisponibles ,
							@precio,
							@descripcion
							)
		IF @InicieTransaccion = 1
			BEGIN
				COMMIT;
			END
			
		SELECT @id_viaje = SCOPE_IDENTITY()
		
	END TRY
	BEGIN CATCH
		SET @ErrorNumber = ERROR_NUMBER()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState = ERROR_STATE()
		SET @Message = ERROR_MESSAGE()
		
		IF @InicieTransaccion=1 BEGIN
			ROLLBACK
		END
		RAISERROR('%s', 
			@ErrorSeverity, @ErrorState, @Message, @CustomError)
	END CATCH	
END
RETURN 0
GO
