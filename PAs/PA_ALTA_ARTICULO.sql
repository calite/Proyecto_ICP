USE FCT_9
GO

/*
#######################################################################

	NOMBRE DEL FUNCIÓN:			PA_ALTA_ARTICULO
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



ALTER PROCEDURE PA_ALTA_ARTICULO

	@MARCA			VARCHAR(50),
	@MODELO			VARCHAR(50),

	@INVOKER		INTEGER,
	
	@RETCODE		INT		OUTPUT,
	@MENSAJE		VARCHAR(8000)	OUTPUT
AS
	
	DECLARE @NTRANS			INT = @@TRANCOUNT	

	SET @MENSAJE = ''
	SET @RETCODE = 0	


	BEGIN TRY
		
		--COMPROBACIONES
		IF ISNULL(@MARCA,'') = ''
		IF ISNULL(@MODELO,'') = ''
		BEGIN
			SET @RETCODE = 10
			SET @MENSAJE = 'Faltan datos'
			RETURN
		END
		
		-- --------------------------------------------------------------------
		-- TRANSACCIÓN
		-- --------------------------------------------------------------------
		IF @NTRANS = 0 BEGIN TRANSACTION [TR_ALTA_ARTICULO]		
			
			
			--SI TODO OK INSERTAMOS REGISTRO

			INSERT INTO ARTICULOS(MARCA,MODELO,ACTIVO)
				VALUES(@MARCA,@MODELO,1) --EMPIEZA ACTIVO


		IF @NTRANS = 0 AND @@TRANCOUNT > 0 COMMIT TRANSACTION [TR_ALTA_ARTICULO]

		SET @RETCODE = 0
		SET @MENSAJE = ''

	END TRY
	BEGIN CATCH
		
		SET @MENSAJE = ERROR_MESSAGE()
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 ROLLBACK TRANSACTION [TR_ALTA_ARTICULO]

	END CATCH

	RETURN @RETCODE