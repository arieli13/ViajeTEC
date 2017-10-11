-----------------------------------------------------------
-- Autor: Eros Hernández
-- Fecha: 19/09/2017
-- Descripcion: Revisa si un usuario es favorito
-----------------------------------------------------------
--use ViajeTEC
--DROP PROCEDURE dbo.SP_EsFavorito
CREATE PROCEDURE dbo.SP_EsFavorito
	@nombre_usuario_usuario varchar(15),
	@nombre_usuario_favorito varchar(15),
	@es_favorito bit OUTPUT
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
		
		SELECT @es_favorito = CASE WHEN count(1)>0 THEN 1 ELSE 0 END FROM dbo.Favorito WHERE id_usuario = @id_usuario AND id_usuarioFavorito = @id_usuarioFavorito
		
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
