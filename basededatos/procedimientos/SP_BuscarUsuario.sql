-----------------------------------------------------------
-- Autor: Ariel Rodríguez Jiménez
-- Fecha: 19/09/2017
-- Descripcion: Busca usuarios que coincidan con el nombre pasado por parámetro
-----------------------------------------------------------
--DROP PROCEDURE dbo.SP_BuscarUsuario
CREATE PROCEDURE dbo.SP_BuscarUsuario
	@nombre_usuario varchar(15),
	@datos varchar(50)
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @InicieTransaccion BIT
	
	DECLARE @id_usuario int
	
	SET @datos = LOWER(@datos)
	
	EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario, @id_usuario = @id_usuario OUTPUT;
	
	SET @InicieTransaccion = 0
	IF @@TRANCOUNT=0 BEGIN
		SET @InicieTransaccion = 1
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED
		BEGIN TRANSACTION		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		
		SELECT nombre_usuario, nombre, apellido, area, id_usuario as x FROM dbo.Usuario WHERE 
		(@datos like ('%'+LOWER(nombre)+'%')  OR @datos LIKE ('%'+LOWER(apellido)+'%') OR @datos LIKE ('%'+LOWER(area)+'%')
		or ('%'+LOWER(nombre)+'%') like @datos OR ('%'+LOWER(apellido)+'%') LIKE @datos  OR ('%'+LOWER(area)+'%') LIKE @datos)
		AND (SELECT COUNT(1) FROM dbo.Bloqueado WHERE (id_usuario = @id_usuario and id_usuarioBloqueado = Usuario.id_usuario) or (id_usuario = Usuario.id_usuario and id_usuarioBloqueado = @id_usuario) )<1
		AND Usuario.id_usuario <> @id_usuario ORDER BY nombre ASC;
		
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
