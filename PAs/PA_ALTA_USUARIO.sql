USE FCT_9
GO

/*
#######################################################################

	NOMBRE DEL FUNCI�N:			PA_ALTA_USUARIO
	FECHA DE CREACI�N: 			[FECHA]
	AUTOR:					[AUTOR]
	RUTA REPOSITORIO:			[RUTA]
	USADO POR:				WEB o APP
	DESCRIPCION DE LA VISTA:		[EXPLICACI�N BREVE]
	

#######################################################################

	FECHA DE MODIFICACI�N: 
	AUTOR:
	EXPLICACI�N:		
	
#######################################################################
*/



ALTER PROCEDURE PA_ALTA_USUARIO

	@USUARIO		VARCHAR(50),
	@PASSWORD		VARCHAR(500),
	@ID_PERFIL		INT,
	@EMAIL			VARCHAR(50),
	@SALT			VARCHAR(500),

	@INVOKER		INTEGER,
	
	@RETCODE		INT		OUTPUT,
	@MENSAJE		VARCHAR(8000)	OUTPUT
AS
	
	DECLARE @NTRANS			INT = @@TRANCOUNT	

	SET @MENSAJE = ''
	SET @RETCODE = 0	


	BEGIN TRY
	
		--COMPROBACIONES
		IF ISNULL(@USUARIO,'') = ''
		BEGIN
			SET @RETCODE = 10
			SET @MENSAJE = 'El USUARIO recibido esta vac�o'
			RETURN
		END
		
		IF ISNULL(@PASSWORD,'') = ''
		BEGIN
			SET @RETCODE = 20
			SET @MENSAJE = 'La CONTRASE�A recibida esta vac�a'
			RETURN
		END
		
		IF ISNULL(@ID_PERFIL,'') = ''
		BEGIN
			SET @RETCODE = 30
			SET @MENSAJE = 'El PERFIL recibida esta vac�o'
			RETURN
		END

		IF ISNULL(@EMAIL,'') = ''
		BEGIN
			SET @RETCODE = 40
			SET @MENSAJE = 'El EMAIL recibido esta vac�o'
			RETURN
		END
		
		IF EXISTS(SELECT ID_USUARIO FROM USUARIOS WHERE usuario = @usuario)
		BEGIN
			set @MENSAJE = 'Ya existe un USUARIO con ese nombre'
			SET @RETCODE = 101
			RETURN
		END

		IF EXISTS(SELECT ID_USUARIO FROM USUARIOS WHERE email = @email)
		BEGIN
			set @MENSAJE = 'Ya existe un USUARIO con ese email'
			SET @RETCODE = 102
			RETURN
		END

		--COMPROBAMOS EL ID

		IF @ID_PERFIL != 10
		IF @ID_PERFIL != 20
		IF @ID_PERFIL != 30
			BEGIN
				set @MENSAJE = 'Perfil Incorrecto'
				SET @RETCODE = 70
				RETURN
			END


		-- --------------------------------------------------------------------
		-- TRANSACCI�N
		-- --------------------------------------------------------------------
		IF @NTRANS = 0 BEGIN TRANSACTION [TR_ALTA_REPARACION]		
			
			
			--SI TODO OK INSERTAMOS REGISTRO
			--por el momento se le asigna la password con el mismo nombre de usuario
			INSERT INTO USUARIOS(USUARIO,PASSWORD,ID_PERFIL,EMAIL,ACTIVO,SALT,RESET_PASSWORD) VALUES(@USUARIO,@PASSWORD,@ID_PERFIL,@EMAIL,1,@SALT,0);

			--servicio smpt??


		IF @NTRANS = 0 AND @@TRANCOUNT > 0 COMMIT TRANSACTION [TR_ALTA_REPARACION]

		SET @RETCODE = 0
		SET @MENSAJE = ''

	END TRY
	BEGIN CATCH
		
		SET @MENSAJE = ERROR_MESSAGE()
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 ROLLBACK TRANSACTION [TR_ALTA_REPARACION]

	END CATCH

	RETURN @RETCODE