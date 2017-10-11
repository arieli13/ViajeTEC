-----------------------------------------------------------
-- Autor: Ariel Rodríguez
-- Fecha: 19/09/2017
-- Descripcion: Crea un nuevo vehículo para un usuario. Si tiene más de 3, lanza un error indicando que no se pudo crear.
-----------------------------------------------------------
--use ViajeTEC
--DROP PROCEDURE dbo.SP_CrearVehiculo
CREATE PROCEDURE dbo.SP_CrearVehiculo
	@nombre_usuario varchar(15),
	@marca VARCHAR(12),
	@placa VARCHAR(8),
	@color VARCHAR(15)
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @InicieTransaccion BIT
	
	DECLARE @num_vehiculos tinyint
	
	DECLARE @id_usuario int 
	
	SET @InicieTransaccion = 0
	IF @@TRANCOUNT=0 BEGIN
		SET @InicieTransaccion = 1
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED
		BEGIN TRANSACTION		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario, @id_usuario = @id_usuario OUTPUT;
		INSERT INTO dbo.Vehiculo (id_usuario, marca, placa, color) VALUES (@id_usuario, @marca, @placa, @color);
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
