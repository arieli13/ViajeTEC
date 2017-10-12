-----------------------------------------------------------
-- Autor: Ariel Rodríguez
-- Fecha: 21/09/2017
-- Descripcion: Obtiene los datos de un usuario
-----------------------------------------------------------
--use ViajeTEC
--DROP PROCEDURE dbo.SP_ObtenerDatosUsuario
CREATE PROCEDURE dbo.SP_ObtenerDatosUsuario
	@nombre_usuario varchar(15),
	@nombre_usuario_consulta varchar(15) --Este es el usuario del que se piden los datos
AS 
BEGIN
	
	SET NOCOUNT ON
	
	DECLARE @ErrorNumber INT, @ErrorSeverity INT, @ErrorState INT, @CustomError INT
	DECLARE @Message VARCHAR(200)
	DECLARE @id_usuario int
	DECLARE @id_usuario_consulta int
	DECLARE @bloqueado bit
	DECLARE @bloqueado2 bit
	DECLARE @esFavorito bit
	
	DECLARE @rating int
	DECLARE @numCalificaciones int
	DECLARE @InicieTransaccion BIT
	
	SET @InicieTransaccion = 0
	IF @@TRANCOUNT=0 BEGIN
		SET @InicieTransaccion = 1
		SET TRANSACTION ISOLATION LEVEL READ COMMITTED
		BEGIN TRANSACTION		
	END
	
	
	BEGIN TRY
		SET @CustomError = 2001
		
		EXEC SP_EstaBloqueado @nombre_usuario, @nombre_usuario_consulta, @bloqueado OUTPUT
		EXEC SP_EstaBloqueado @nombre_usuario_consulta, @nombre_usuario, @bloqueado2 OUTPUT
		
		
		
		IF @bloqueado = 1 or @bloqueado2 = 1
			BEGIN
				RAISERROR('No se puede consultar el usuario. Revise que no lo tenga bloqueado o él/ella a usted.', 12, 1);
			END
			
		EXEC SP_ObtenerUsuarioId @nombre_usuario, @id_usuario output;
		EXEC SP_ObtenerUsuarioId @nombre_usuario_consulta, @id_usuario_consulta output;
		
		SELECT @numCalificaciones = COUNT(1), @rating = SUM(Calificacion.resultado) FROM Calificacion WHERE id_calificado = @id_usuario_consulta;
		IF @numCalificaciones = 0
			BEGIN
				SET @rating = 5;
			END
		ELSE
			BEGIN 
				SET @rating = @rating/@numCalificaciones;
			END
		EXEC SP_EsFavorito @nombre_usuario, @nombre_usuario_consulta, @esFavorito OUTPUT;
		
		IF @InicieTransaccion=1 BEGIN
			COMMIT
		END
		
		SELECT nombre_usuario, nombre, correo, apellido, telefono, area, @esFavorito as favorito, @rating as rating FROM Usuario where id_usuario = @id_usuario_consulta
	
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