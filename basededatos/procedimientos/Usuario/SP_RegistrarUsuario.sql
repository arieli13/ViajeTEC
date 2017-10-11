-----------------------------------------------------------
-- Autor: Ariel Rodríguez
-- Fecha: 22/09/2017
-- Descripcion: Registra un nuevo usuario a la base de datos.
-----------------------------------------------------------
--DROP PROCEDURE dbo.SP_RegistrarUsuario
CREATE PROCEDURE dbo.SP_RegistrarUsuario
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
	
	
	SET @InicieTransaccion = 0
	IF @@TRANCOUNT=0 BEGIN
		SET @InicieTransaccion = 1
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED
		BEGIN TRANSACTION		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		
			INSERT INTO dbo.Usuario(nombre_usuario, nombre, apellido, telefono, correo, area, estudiante, id_tipoUsuario) VALUES (@nombre_usuario, @nombre, @apellido, @telefono, @correo, @area, @estudiante, 1);
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
