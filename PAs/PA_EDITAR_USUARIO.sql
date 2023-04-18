USE FCT_9
GO

/*
#######################################################################

	NOMBRE DEL FUNCIÓN:			PA_EDITAR_USUARIO
	FECHA DE CREACIÓN: 			[FECHA]
	AUTOR:					[AUTOR]
	RUTA REPOSITORIO:			[RUTA]
	USADO POR:				WEB o APP
	DESCRIPCION DE LA VISTA:		[EXPLICACIÓN BREVE]
	

#######################################################################

	FECHA DE MODIFICACIÓN: 
	AUTOR:
	EXPLICACIÓN:		
	
#######################################################################
*/



ALTER PROCEDURE PA_EDITAR_USUARIO

	@ID_USUARIO		INT,
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
		IF ISNULL(@ID_USUARIO,'') = ''
		BEGIN
			SET @RETCODE = 10
			SET @MENSAJE = 'El ID USUARIO recibido esta vacío'
			RETURN
		END
		IF ISNULL(@USUARIO,'') = ''
		BEGIN
			SET @RETCODE = 20
			SET @MENSAJE = 'El USUARIO recibido esta vacío'
			RETURN
		END
		
		IF ISNULL(@PASSWORD,'') = ''
		BEGIN
			SET @RETCODE = 30
			SET @MENSAJE = 'La CONTRASEÑA recibida esta vacía'
			RETURN
		END
		
		IF ISNULL(@ID_PERFIL,'') = ''
		BEGIN
			SET @RETCODE = 40
			SET @MENSAJE = 'El PERFIL recibida esta vacío'
			RETURN
		END

		IF ISNULL(@EMAIL,'') = ''
		BEGIN
			SET @RETCODE = 50
			SET @MENSAJE = 'El EMAIL recibido esta vacío'
			RETURN
		END
		
		IF EXISTS(SELECT ID_USUARIO FROM USUARIOS WHERE USUARIO = @USUARIO AND ID_USUARIO <> @ID_USUARIO)
		BEGIN
			set @MENSAJE = 'Ya existe un USUARIO con ese nombre'
			SET @RETCODE = 60
			RETURN
		END
		
		IF EXISTS(SELECT ID_USUARIO FROM USUARIOS WHERE EMAIL = @EMAIL AND ID_USUARIO <> @ID_USUARIO)
		BEGIN
			set @MENSAJE = 'Ya existe un USUARIO con ese email'
			SET @RETCODE = 70
			RETURN
		END

		--COMPROBAMOS EL ID

		IF @ID_PERFIL != 10
		IF @ID_PERFIL != 20
		IF @ID_PERFIL != 30
			BEGIN
				set @MENSAJE = 'Perfil Incorrecto'
				SET @RETCODE = 80
				RETURN
			END


		-- --------------------------------------------------------------------
		-- TRANSACCIÓN
		-- --------------------------------------------------------------------
		IF @NTRANS = 0 BEGIN TRANSACTION [TR_EDITAR_USUARIO]		
			
			
			--SI TODO OK CAMBIAMOS REGISTRO
			UPDATE	USUARIOS 
			SET 
				USUARIO = @USUARIO,
				ID_PERFIL = @ID_PERFIL,
				PASSWORD = @PASSWORD,
				EMAIL = @EMAIL,
				SALT = @SALT
			WHERE
				ID_USUARIO = @ID_USUARIO


		IF @NTRANS = 0 AND @@TRANCOUNT > 0 COMMIT TRANSACTION [TR_EDITAR_USUARIO]

		SET @RETCODE = 0
		SET @MENSAJE = ''

	END TRY
	BEGIN CATCH
		
		SET @MENSAJE = ERROR_MESSAGE()
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 ROLLBACK TRANSACTION [TR_EDITAR_USUARIO]

	END CATCH

	RETURN @RETCODE