-----------------------------------------------------------
-- Autor: Eros Hernández
-- Fecha: 19/09/2017
-- Descripcion: Bloquea a un usuario.
-----------------------------------------------------------
CREATE PROCEDURE dbo.SP_BloquearUsuario
	@nombre_usuario_usuario varchar(15),
	@nombre_usuario_bloqueado varchar(15)
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @InicieTransaccion BIT
	
	DECLARE @esta_bloqueado INT
	
	DECLARE @id_usuario int
	DECLARE @id_usuarioBloqueado int
	
	EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario_usuario, @id_usuario = @id_usuario OUTPUT;
	EXEC dbo.SP_ObtenerUsuarioId @nombre_usuario=@nombre_usuario_bloqueado, @id_usuario = @id_usuarioBloqueado OUTPUT;
	
	SET @InicieTransaccion = 0
	IF @@TRANCOUNT=0 BEGIN
		SET @InicieTransaccion = 1
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED
		BEGIN TRANSACTION		
	END
	
	BEGIN TRY
		SET @CustomError = 2001
		
		SET @esta_bloqueado = 
		(
			SELECT COUNT(1) FROM dbo.Bloqueado WHERE id_usuario = @id_usuario AND id_usuarioBloqueado = @id_usuarioBloqueado
		)
		
		
		IF @esta_bloqueado>0
			BEGIN
				RAISERROR('El usuario ya ha está bloqueado.', 12, 1, 13013)
			END
		ELSE
			IF @id_usuario = @id_usuarioBloqueado 
				BEGIN
					RAISERROR('No se puede bloquear usted mismo.', 12, 1, 13013)
				END
			ELSE
				BEGIN
					INSERT INTO dbo.Bloqueado (id_usuario, id_usuarioBloqueado) VALUES (@id_usuario, @id_usuarioBloqueado)
					DELETE FROM dbo.Favorito WHERE (id_usuario = @id_usuario AND id_usuarioFavorito = @id_usuarioBloqueado) OR (id_usuario = @id_usuarioBloqueado AND id_usuarioFavorito = @id_usuario)
					DELETE FROM dbo.PasajeroViaje WHERE id_pasajero = @id_usuarioBloqueado AND id_viaje in (SELECT id_viaje from dbo.Viaje WHERE id_conductor = @id_usuario) --Elimina al pasajero bloqueado de todos los viajes que no ha realizado el conductor
					DELETE FROM dbo.PasajeroViaje WHERE id_pasajero = @id_usuario AND id_viaje in (SELECT id_viaje from dbo.Viaje WHERE id_conductor = @id_usuarioBloqueado)
					EXEC dbo.SP_ObtenerBloqueados @nombre_usuario = @nombre_usuario_usuario
				END	
				
		IF @InicieTransaccion=1 BEGIN
			COMMIT
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
