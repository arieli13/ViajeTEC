-----------------------------------------------------------
-- Autor: Ariel Rodríguez
-- Fecha: 19/09/2017
-- Descripcion: Muestra todos los viajes de un conductor
-----------------------------------------------------------
--use ViajeTEC
--DROP PROCEDURE dbo.SP_ObtenerViajes
CREATE PROCEDURE dbo.SP_ObtenerViajes
	@nombre_usuario varchar(15)
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	
	DECLARE @id_usuario int

	IF @@TRANCOUNT=0 BEGIN
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario, @id_usuario = @id_usuario OUTPUT;
		
		SELECT id_viaje, nombre_inicio, nombre_destino, CONVERT(VARCHAR, fecha_hora_inicio, 20) as fecha_hora_inicio FROM Viaje WHERE id_conductor = @id_usuario order by nombre_inicio ASC;
		
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

