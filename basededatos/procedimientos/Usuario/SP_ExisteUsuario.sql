-----------------------------------------------------------
-- Autor: Jose Pablo Navarro
-- Fecha: 21/09/2017
-- Descripcion: Verifica si el usuario existe, si existe entonces en existe almacena 1, sino 0
-----------------------------------------------------------
CREATE PROCEDURE dbo.SP_ExisteUsuario
	@nombre_usuario varchar(15),
	@existe INT output
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	
	BEGIN TRY
		SET @CustomError = 2001
		
		SET @existe = (SELECT CASE WHEN COUNT(1) > 0 THEN 1 ELSE 0 END FROM dbo.Usuario WHERE nombre_usuario = @nombre_usuario)
		
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