-----------------------------------------------------------
-- Autor: Jose Pablo Navarro
-- Fecha: 22/09/2017
-- Descripcion: Crea un punto destino de un viaje
-----------------------------------------------------------
--USE ViajeTEC
--DROP PROCEDURE dbo.SP_CrearPuntoReunion
CREATE PROCEDURE dbo.SP_CrearPuntoReunion
	@id_viaje int,
	@latitud_punto decimal(12, 9),
	@longitud_punto decimal (12, 9),
	@nombre nvarchar (30)
	
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
		
		insert into PuntoReunion (id_viaje, latitud_punto, longitud_punto, nombre) 
		values (@id_viaje, @latitud_punto, @longitud_punto, @nombre);
		
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
