USE FCT_9
GO

/*
#######################################################################

	NOMBRE DEL FUNCIÓN:			PA_ALTA_ENVIO
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



ALTER PROCEDURE PA_ALTA_ENVIO

	@CALLE			VARCHAR(50),
	@NUMERO			INT,
	@POBLACION		VARCHAR(50),
	@PROVINCIA		VARCHAR(50),
	@CODIGO_POSTAL		VARCHAR(50),
	@PERSONA_CONTACTO	VARCHAR(50),
	@TELEFONO		VARCHAR(50),
	@ID_REPARACION		INT,

	@INVOKER		INTEGER,
	
	@RETCODE		INT		OUTPUT,
	@MENSAJE		VARCHAR(8000)	OUTPUT
AS
	
	DECLARE @NTRANS			INT = @@TRANCOUNT	

	SET @MENSAJE = ''
	SET @RETCODE = 0	


	BEGIN TRY
		
		--COMPROBACIONES
		IF ISNULL(@CALLE,'') = ''
		--IF ISNULL(@NUMERO,'') = '' --puede existir una direccion sin numero??
		IF ISNULL(@POBLACION,'') = ''
		IF ISNULL(@PROVINCIA,'') = ''
		IF ISNULL(@CODIGO_POSTAL,'') = ''
		IF ISNULL(@PERSONA_CONTACTO,'') = ''
		IF ISNULL(@TELEFONO,'') = ''
		IF ISNULL(@ID_REPARACION,'') = ''
		BEGIN
			SET @RETCODE = 10
			SET @MENSAJE = 'Faltan datos'
			RETURN
		END
		
		-- --------------------------------------------------------------------
		-- TRANSACCIÓN
		-- --------------------------------------------------------------------
		IF @NTRANS = 0 BEGIN TRANSACTION [TR_ALTA_REPARACION]		
			
			
			--SI TODO OK INSERTAMOS REGISTRO
			INSERT INTO ENVIOS (CALLE, NUMERO, POBLACION, PROVINCIA, CODIGO_POSTAL, PERSONA_CONTACTO, TELEFONO, ID_REPARACION)
				VALUES (@CALLE,@NUMERO,@POBLACION,@PROVINCIA,@CODIGO_POSTAL,@PERSONA_CONTACTO,@TELEFONO,@ID_REPARACION);


		IF @NTRANS = 0 AND @@TRANCOUNT > 0 COMMIT TRANSACTION [TR_ALTA_REPARACION]

		SET @RETCODE = 0
		SET @MENSAJE = ''

	END TRY
	BEGIN CATCH
		
		SET @MENSAJE = ERROR_MESSAGE()
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 ROLLBACK TRANSACTION [TR_ALTA_REPARACION]

	END CATCH

	RETURN @RETCODE