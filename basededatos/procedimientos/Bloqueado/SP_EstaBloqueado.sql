-----------------------------------------------------------
-- Autor: Eros Hernández
-- Fecha: 19/09/2017
-- Descripcion: Bloquea a un usuario.
-----------------------------------------------------------
--DROP PROCEDURE dbo.SP_EstaBloqueado
CREATE PROCEDURE dbo.SP_EstaBloqueado
	@nombre_usuario_usuario varchar(15),
	@nombre_usuario_bloqueado varchar(15),
	@esta_bloqueado bit OUTPUT
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @InicieTransaccion BIT
	
	DECLARE @id_usuario int
	DECLARE @id_usuarioBloqueado int
	
	SET @InicieTransaccion = 0
	IF @@TRANCOUNT=0 BEGIN
		SET @InicieTransaccion = 1
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED
		BEGIN TRANSACTION		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		
		EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario_usuario, @id_usuario = @id_usuario OUTPUT;
		EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario_bloqueado, @id_usuario = @id_usuarioBloqueado OUTPUT;
		
		SELECT @esta_bloqueado = CASE WHEN count(1)>0 THEN 1 ELSE 0 END FROM dbo.Bloqueado WHERE id_usuario = @id_usuario AND id_usuarioBloqueado = @id_usuarioBloqueado
		
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
