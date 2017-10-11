-----------------------------------------------------------
-- Autor: Jose Pablo Navarro
-- Fecha: 21/09/2017
-- Descripcion: Verifica si el usuario existe, si existe entonces en existe almacena 1, sino 0
-----------------------------------------------------------

--DROP PROCEDURE dbo.SP_ObtenerUsuarioId
CREATE PROCEDURE dbo.SP_ObtenerUsuarioId
	@nombre_usuario varchar(15),
	@id_usuario INT output
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	
	BEGIN TRY
		SET @CustomError = 2001
		
		SELECT @id_usuario = id_usuario FROM dbo.Usuario where nombre_usuario = @nombre_usuario;
		
		IF @id_usuario IS NULL 
			BEGIN
				RAISERROR('El usuario no fue encontrado', 12, 1);
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