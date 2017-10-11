-----------------------------------------------------------
-- Autor: Eros Hernández
-- Fecha: 19/09/2017
-- Descripcion: Modifica los datos de un vehículo en particular.
-----------------------------------------------------------
CREATE PROCEDURE dbo.SP_ModificarVehiculo
	@id_vehiculo INT,
	@marca VARCHAR(12),
	@color VARCHAR(15)
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @InicieTransaccion BIT
	
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
		
		UPDATE dbo.Vehiculo 
		SET marca = @marca, color = @color 
		WHERE id_vehiculo = @id_vehiculo;
		EXEC SP_ObtenerVehiculos @nombre_usuario = @nombre_usuario;
		
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
