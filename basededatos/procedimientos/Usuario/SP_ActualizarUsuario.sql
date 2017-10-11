-----------------------------------------------------------
-- Autor: Eros Hernandez
-- Fecha: 22/09/2017
-- Descripcion: Actualiza los datos de un usuario.
-----------------------------------------------------------
--USE ViajeTEC
--DROP PROCEDURE dbo.SP_ActualizarUsuario
CREATE PROCEDURE dbo.SP_ActualizarUsuario
	@nombre_usuario varchar(15),
	@nombre VARCHAR(10),
	@apellido VARCHAR(15),
	@telefono VARCHAR(10),
	@correo VARCHAR(200),
	@area VARCHAR(60),
	@estudiante BIT
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @InicieTransaccion BIT
	
	DECLARE @id_usuario INT
	
	SET @InicieTransaccion = 0
	IF @@TRANCOUNT=0 BEGIN
		SET @InicieTransaccion = 1
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED
		BEGIN TRANSACTION		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario = @nombre_usuario, @id_usuario = @id_usuario OUTPUT;
		UPDATE dbo.Usuario SET nombre = @nombre, apellido = @apellido, telefono = @telefono, correo = @correo, area = @area, estudiante = @estudiante WHERE id_usuario = @id_usuario;
			
		IF @InicieTransaccion=1 BEGIN
			COMMIT
		END
		EXEC dbo.SP_ObtenerUsuario @nombre_usuario = @nombre_usuario;
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
