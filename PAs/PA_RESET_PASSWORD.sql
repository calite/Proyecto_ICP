USE FCT_9
GO

/*
#######################################################################

	NOMBRE DEL FUNCIÓN:			PA_RESET_PASSWORD
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



ALTER PROCEDURE PA_RESET_PASSWORD

	@ID_USUARIO		INT,
	@PASSWORD		VARCHAR(500),
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
		
		IF ISNULL(@PASSWORD,'') = ''
		BEGIN
			SET @RETCODE = 20
			SET @MENSAJE = 'La CONTRASEÑA recibida esta vacía'
			RETURN
		END
		
		-- --------------------------------------------------------------------
		-- TRANSACCIÓN
		-- --------------------------------------------------------------------
		IF @NTRANS = 0 BEGIN TRANSACTION [TR_RESET_PASSWORD]		
			
			
			--SI TODO OK CAMBIAMOS REGISTRO
			UPDATE	USUARIOS 
			SET 
				PASSWORD = @PASSWORD,
				SALT = @SALT,
				RESET_PASSWORD = 1
			WHERE
				ID_USUARIO = @ID_USUARIO


		IF @NTRANS = 0 AND @@TRANCOUNT > 0 COMMIT TRANSACTION [TR_RESET_PASSWORD]

		SET @RETCODE = 0
		SET @MENSAJE = ''

	END TRY
	BEGIN CATCH
		
		SET @MENSAJE = ERROR_MESSAGE()
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 ROLLBACK TRANSACTION [TR_RESET_PASSWORD]

	END CATCH

	RETURN @RETCODE