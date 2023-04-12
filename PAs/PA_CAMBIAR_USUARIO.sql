USE FCT_9
GO

/*
#######################################################################

	NOMBRE DEL FUNCIÓN:			PA_ALTA_USUARIO
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



ALTER PROCEDURE PA_CAMBIAR_USUARIO

	@ID_USUARIO		INT,
	@USUARIO		VARCHAR(30),
	@PASSWORD		VARCHAR(30),
	@ID_PERFIL		INT,
	@EMAIL			VARCHAR(50),

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
			SET @MENSAJE = 'El USUARIO recibido esta vacío'
			RETURN
		END
		
		IF ISNULL(@PASSWORD,'') = ''
		BEGIN
			SET @RETCODE = 20
			SET @MENSAJE = 'La CONTRASEÑA recibida esta vacía'
			RETURN
		END

		IF ISNULL(@ID_PERFIL,'') = ''
		BEGIN
			SET @RETCODE = 30
			SET @MENSAJE = 'El PERFIL recibida esta vacío'
			RETURN
		END

		IF ISNULL(@EMAIL,'') = ''
		BEGIN
			SET @RETCODE = 40
			SET @MENSAJE = 'El EMAIL recibido esta vacío'
			RETURN
		END
		
		IF EXISTS(SELECT ID_USUARIO FROM USUARIOS WHERE usuario = @usuario)
		BEGIN
			set @MENSAJE = 'Ya existe un USUARIO con ese nombre'
			SET @RETCODE = 50
			RETURN
		END

		IF EXISTS(SELECT ID_USUARIO FROM USUARIOS WHERE email = @email)
		BEGIN
			set @MENSAJE = 'Ya existe un USUARIO con ese email'
			SET @RETCODE = 60
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
		-- TRANSACCIÓN
		-- --------------------------------------------------------------------
		IF @NTRANS = 0 BEGIN TRANSACTION [TR_ALTA_REPARACION]		
			
			
			--SI TODO OK INSERTAMOS REGISTRO

			UPDATE USUARIOS 
			SET	
				USUARIO = @USUARIO,
				PASSWORD = @PASSWORD,
				ID_PERFIL = @ID_PERFIL,
				EMAIL = @EMAIL
			WHERE ID_USUARIO = @ID_USUARIO		
				


		IF @NTRANS = 0 AND @@TRANCOUNT > 0 COMMIT TRANSACTION [TR_ALTA_REPARACION]

		SET @RETCODE = 0
		SET @MENSAJE = ''

	END TRY
	BEGIN CATCH
		
		SET @MENSAJE = ERROR_MESSAGE()
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 ROLLBACK TRANSACTION [TR_ALTA_REPARACION]

	END CATCH

	RETURN @RETCODE