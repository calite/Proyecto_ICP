USE FCT_9
GO

/*
#######################################################################

	NOMBRE DEL FUNCIÓN:			PA_CAMBIAR_ARTICULO
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



ALTER PROCEDURE PA_CAMBIAR_ARTICULO

	@ID_ARTICULO		INT,
	@MARCA		VARCHAR(30),
	@MODELO		VARCHAR(30),

	@INVOKER		INTEGER,
	
	@RETCODE		INT		OUTPUT,
	@MENSAJE		VARCHAR(8000)	OUTPUT
AS
	
	DECLARE @NTRANS			INT = @@TRANCOUNT	

	SET @MENSAJE = ''
	SET @RETCODE = 0	


	BEGIN TRY
	
		--COMPROBACIONES
		IF ISNULL(@ID_ARTICULO,'') = ''
		IF ISNULL(@MARCA,'') = ''
		IF ISNULL(@MODELO,'') = ''
		BEGIN
			SET @RETCODE = 10
			SET @MENSAJE = 'Faltan datos'
			RETURN
		END

		IF NOT EXISTS(SELECT @ID_ARTICULO FROM ARTICULOS WHERE ID_ARTICULO = @ID_ARTICULO)
		BEGIN
			set @MENSAJE = 'NO existe un ARTICULO con ese ID'
			SET @RETCODE = 20
			RETURN
		END
		
		-- --------------------------------------------------------------------
		-- TRANSACCIÓN
		-- --------------------------------------------------------------------
		IF @NTRANS = 0 BEGIN TRANSACTION [TR_CAMBIAR_ARTICULO]		
			
			
			--SI TODO OK INSERTAMOS REGISTRO

			UPDATE ARTICULOS 
			SET	
				MARCA = @MARCA,
				MODELO = @MODELO
			WHERE ID_ARTICULO = @ID_ARTICULO
				
				


		IF @NTRANS = 0 AND @@TRANCOUNT > 0 COMMIT TRANSACTION [TR_CAMBIAR_ARTICULO]

		SET @RETCODE = 0
		SET @MENSAJE = ''

	END TRY
	BEGIN CATCH
		
		SET @MENSAJE = ERROR_MESSAGE()
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 ROLLBACK TRANSACTION [TR_CAMBIAR_ARTICULO]

	END CATCH

	RETURN @RETCODE