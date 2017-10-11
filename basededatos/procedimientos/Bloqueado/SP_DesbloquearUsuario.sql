-----------------------------------------------------------
-- Autor: José Pablo Navarro
-- Fecha: 19/09/2017
-- Descripcion: Desbloquea a un usuario.
-----------------------------------------------------------
CREATE PROCEDURE dbo.SP_DesbloquearUsuario
	@nombre_usuario_usuario varchar(15),
	@nombre_usuario_bloqueado varchar(15)
AS 
BEGIN
	
	SET NOCOUNT OFF
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @InicieTransaccion BIT
	
	DECLARE @id_usuario int
	DECLARE @id_bloqueado int
	
	EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario_usuario, @id_usuario = @id_usuario OUTPUT;
	EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario_bloqueado, @id_usuario = @id_bloqueado OUTPUT;
	
	SET @InicieTransaccion = 0
	IF @@TRANCOUNT=0 BEGIN
		SET @InicieTransaccion = 1
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED
		BEGIN TRANSACTION		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		
		DELETE FROM dbo.Bloqueado WHERE id_usuario = @id_usuario AND id_bloqueado = @id_bloqueado
		IF @@ROWCOUNT<0
			BEGIN
				RAISERROR('El usuario no está bloqueado', 12, 1);
			END
		IF @InicieTransaccion=1 BEGIN
			COMMIT
		END
		
		EXEC dbo.SP_ObtenerBloqueados @nombre_usuario = @nombre_usuario_usuario
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
