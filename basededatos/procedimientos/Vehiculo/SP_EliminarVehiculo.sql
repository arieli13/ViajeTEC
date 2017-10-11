-----------------------------------------------------------
-- Autor: Jose Pablo Navarro
-- Fecha: 19/09/2017
-- Descripcion: Elimina un vehículo en particular. Cuando está asociado a un viaje que aún no se ha realizado, lanza error y no elimina.
-----------------------------------------------------------
CREATE PROCEDURE dbo.SP_EliminarVehiculo
	@id_vehiculo INT
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @InicieTransaccion BIT
	
	DECLARE @num_viajes INT
	
	DECLARE @id_usuario INT
	DECLARE @nombre_usuario VARCHAR(15)
	SET @id_usuario = (SELECT id_usuario FROM dbo.Vehiculo WHERE id_vehiculo = @id_vehiculo)
	SET @nombre_usuario = (SELECT nombre_usuario FROM dbo.Usuario WHERE id_usuario = @id_usuario)
	
	SET @InicieTransaccion = 0
	IF @@TRANCOUNT=0 BEGIN
		SET @InicieTransaccion = 1
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED
		BEGIN TRANSACTION		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		
		SET @num_viajes = 
		(
			SELECT COUNT(1) FROM dbo.Viaje WHERE id_vehiculo = @id_vehiculo
		)
		
		IF @num_viajes>0
			BEGIN
				RAISERROR('El vehículo está asociado a un viaje que aún no se ha realizado. No se puede eliminar.', 12, 1, 13013)
			END
		ELSE
			BEGIN
				UPDATE dbo.Vehiculo SET eliminado = 1 WHERE id_vehiculo = @id_vehiculo;
				EXEC SP_ObtenerVehiculos @nombre_usuario = @nombre_usuario;
			END
		IF @InicieTransaccion=1 BEGIN
			COMMIT
		END
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
