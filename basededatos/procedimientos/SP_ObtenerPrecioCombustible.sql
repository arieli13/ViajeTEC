-----------------------------------------------------------
-- Autor: Ariel Rodríguez
-- Fecha: 21/09/2017
-- Descripcion: Obtiene el precio de la gasolina
-----------------------------------------------------------
--use ViajeTEC
--DROP PROCEDURE dbo.SP_ObtenerPrecioCombustible
CREATE PROCEDURE dbo.SP_ObtenerPrecioCombustible
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @baneado bit
	
	BEGIN TRY
		SET @CustomError = 2001
		
		SELECT top 1 precio FROM combustible WHERE fecha = (SELECT MAX(fecha) FROM Combustible)
		
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