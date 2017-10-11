-----------------------------------------------------------
-- Autor: Ariel Rodríguez
-- Fecha: 19/09/2017
-- Descripcion: Muestra todos los vehículos de un usuario
-----------------------------------------------------------
CREATE PROCEDURE dbo.SP_ObtenerVehiculos
	@nombre_usuario varchar(15)
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	
	DECLARE @id_usuario int
	
	EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario, @id_usuario = @id_usuario OUTPUT;

	IF @@TRANCOUNT=0 BEGIN
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		
		SELECT id_vehiculo, marca, placa, color FROM Vehiculo WHERE id_usuario = @id_usuario AND eliminado = 0;
		
	END TRY
	BEGIN CATCH
		SET @ErrorNumber = ERROR_NUMBER()
		SET @ErrorSeverity = ERROR_SEVERITY()
		SET @ErrorState = ERROR_STATE()
		SET @Message = ERROR_MESSAGE()
		RAISERROR('%s', 
			@ErrorSeverity, @ErrorState, @Message, @CustomError)
	END CATCH	
END
RETURN 0
GO

