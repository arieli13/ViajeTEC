-----------------------------------------------------------
-- Autor: Eros Hern�ndez
-- Fecha: 20/09/2017
-- Descripcion: Muestra todos los usuarios bloqueados de un usuario
-----------------------------------------------------------
--use ViajeTEC
--DROP PROCEDURE dbo.SP_ObtenerBloqueados
CREATE PROCEDURE dbo.SP_ObtenerBloqueados
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
		
		SELECT nombre_usuario, nombre, apellido, area FROM Usuario WHERE id_usuario in (SELECT id_usuarioBloqueado FROM Bloqueado WHERE id_usuario = @id_usuario);
		
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

