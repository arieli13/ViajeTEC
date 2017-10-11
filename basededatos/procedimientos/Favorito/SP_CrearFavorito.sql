-----------------------------------------------------------
-- Autor: Eros Hernández
-- Fecha: 19/09/2017
-- Descripcion: Agrega un usuario como favorito, si ya lo es entonces no lo crea.
-----------------------------------------------------------

CREATE PROCEDURE dbo.SP_CrearFavorito
	@nombre_usuario_usuario varchar(15),
	@nombre_usuario_favorito varchar(15)
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @InicieTransaccion BIT
	
	DECLARE @es_favorito INT
	
	DECLARE @id_usuario int
	DECLARE @id_usuarioFavorito int
	DECLARE @esta_Bloqueado int
	
	EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario_usuario, @id_usuario = @id_usuario OUTPUT;
	EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario_favorito, @id_usuarioFavorito = @id_usuarioFavorito OUTPUT;
	SET @esta_Bloqueado = (SELECT COUNT(1) FROM dbo.Bloqueado WHERE (id_usuario = @id_usuario AND id_usuarioBloqueado = @id_usuarioFavorito)OR(id_usuario = @id_usuarioFavorito AND id_usuarioBloqueado = @id_usuario))
	
	SET @InicieTransaccion = 0
	IF @@TRANCOUNT=0 BEGIN
		SET @InicieTransaccion = 1
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED
		BEGIN TRANSACTION		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		
		SET @es_favorito = 
		(
			SELECT COUNT(1) FROM dbo.Favorito WHERE id_usuario = @id_usuario AND id_usuarioFavorito = @id_usuarioFavorito
		)
		
		IF @esta_Bloqueado>0
			BEGIN
				RAISERROR('No se pudo agregar a favoritos. Usted tiene bloqueado al usuario ó él/ella a usted.', 12, 1, 13013)
			END
		ELSE
			BEGIN
				IF @es_favorito>0
					BEGIN
						RAISERROR('El usuario ya ha sido agregado como favorito.', 12, 1, 13013)
					END
				ELSE
					BEGIN
						IF @id_usuario = @id_usuarioFavorito 
							BEGIN
								RAISERROR('No se puede agregar usted mismo como favorito.', 12, 1, 13013)
							END
						ELSE
							BEGIN
								INSERT INTO dbo.Favorito (id_usuario, id_usuarioFavorito) VALUES (@id_usuario, @id_usuarioFavorito)
								IF @InicieTransaccion=1 BEGIN
									COMMIT
								END
								EXEC dbo.SP_ObtenerFavoritos @nombre_usuario = @nombre_usuario_usuario
							END
					END
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
