-----------------------------------------------------------
-- Autor: Ariel Rodríguez
-- Fecha: 22/09/2017
-- Descripcion: Elimina un viaje
-----------------------------------------------------------
--USE ViajeTEC
--DROP PROCEDURE dbo.SP_EliminarViaje
CREATE PROCEDURE dbo.SP_EliminarViaje
	@id_viaje int
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @InicieTransaccion BIT
	
	SET @InicieTransaccion = 0
	IF @@TRANCOUNT=0 BEGIN
		SET @InicieTransaccion = 1
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED
		BEGIN TRANSACTION		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		
		DELETE FROM PasajeroViaje WHERE id_viaje = @id_viaje;
		DELETE FROM PuntoReunion WHERE id_viaje = @id_viaje;
		DELETE FROM Viaje WHERE id_viaje = @id_viaje;
		
		IF @InicieTransaccion = 1
			BEGIN
				COMMIT;
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
