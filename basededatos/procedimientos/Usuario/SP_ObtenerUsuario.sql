-----------------------------------------------------------
-- Autor: Ariel Rodríguez
-- Fecha: 21/09/2017
-- Descripcion: Obtiene los datos de un usuario
-----------------------------------------------------------
--DROP PROCEDURE dbo.SP_ObtenerUsuario
CREATE PROCEDURE dbo.SP_ObtenerUsuario
	@nombre_usuario varchar(15)
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @baneado bit
	
	BEGIN TRY
		SET @CustomError = 2001
		
		
		
		SELECT @baneado = baneado FROM dbo.Usuario WHERE nombre_usuario = @nombre_usuario;
		
		SELECT id_usuario, estudiante, nombre_usuario, nombre, apellido, telefono, correo, area, baneado FROM dbo.Usuario WHERE nombre_usuario = @nombre_usuario
		
		IF @@ROWCOUNT < 1
			BEGIN
				RAISERROR('El usuario no fue encontrado', 12, 1);
			END
		ELSE
			BEGIN
				IF @baneado = 1
					BEGIN
						RAISERROR('El usuario está baneado', 12, 1);
					END
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