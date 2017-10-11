-----------------------------------------------------------
-- Autor: Ariel Rodríguez
-- Fecha: 19/09/2017
-- Descripcion: Muestra todos los datos de un vehículo
-----------------------------------------------------------
--use ViajeTEC
--DROP PROCEDURE dbo.SP_ObtenerVehiculo
CREATE PROCEDURE dbo.SP_ObtenerVehiculo
	@id_vehiculo INT
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)

	IF @@TRANCOUNT=0 BEGIN
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		
		SELECT id_vehiculo,marca, placa, color FROM Vehiculo WHERE id_vehiculo = @id_vehiculo;
		IF @@ROWCOUNT < 1
			BEGIN
				RAISERROR('El vehículo no fue encontrado', 12, 1);
			END
		
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
