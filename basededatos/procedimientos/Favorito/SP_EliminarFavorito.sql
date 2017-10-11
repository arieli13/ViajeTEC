-----------------------------------------------------------
-- Autor: José Pablo Navarro
-- Fecha: 19/09/2017
-- Descripcion: Elimina a un favorito.
-----------------------------------------------------------
--use ViajeTEC
--DROP PROCEDURE dbo.SP_EliminarFavorito
CREATE PROCEDURE dbo.SP_EliminarFavorito
	@nombre_usuario_usuario varchar(15),
	@nombre_usuario_favorito varchar(15)
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @InicieTransaccion BIT
	
	DECLARE @id_usuario int
	DECLARE @id_usuarioFavorito int
	
	SET @InicieTransaccion = 0
	IF @@TRANCOUNT=0 BEGIN
		SET @InicieTransaccion = 1
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED
		BEGIN TRANSACTION		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		
		EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario_usuario, @id_usuario = @id_usuario OUTPUT;
		EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario_favorito, @id_usuario = @id_usuarioFavorito OUTPUT;
		
		DELETE FROM dbo.Favorito WHERE id_usuario = @id_usuario AND id_usuarioFavorito = @id_usuarioFavorito
		
		IF @@ROWCOUNT < 1
			BEGIN
				RAISERROR('El usuario no es favorito', 12, 1);
			END
		ELSE
			BEGIN
				IF @InicieTransaccion=1 BEGIN
					COMMIT
				END
				EXEC SP_ObtenerFavoritos @nombre_usuario = @nombre_usuario_usuario; 
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
