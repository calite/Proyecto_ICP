USE FCT_9
GO

/*
#######################################################################

	NOMBRE DEL FUNCI�N:			PA_CAMBIAR_STOCK
	FECHA DE CREACI�N: 			[FECHA]
	AUTOR:					[AUTOR]
	RUTA REPOSITORIO:			[RUTA]
	USADO POR:				WEB o APP
	DESCRIPCION DE LA VISTA:		[EXPLICACI�N BREVE]
	
	CAMBIA EL STOCK DE UN REPUESTO PASADO POR PARAMETRO, ACEPTA NUMEROS
	POSITIVOS Y NEGATIVOS, EN CASO DE QUERER AUMENTAR O DISMINUIR EL STOCK

#######################################################################

	FECHA DE MODIFICACI�N: 
	AUTOR:
	EXPLICACI�N:		
	
#######################################################################
*/



ALTER PROCEDURE PA_CAMBIAR_STOCK

	@ID_REPUESTO		INT,
	@CANTIDAD		INT,
	
	@INVOKER		INTEGER,
	
	@RETCODE		INT		OUTPUT,
	@MENSAJE		VARCHAR(8000)	OUTPUT
AS
	
	DECLARE @NTRANS			INT = @@TRANCOUNT	

	SET @MENSAJE = ''
	SET @RETCODE = 0	


	BEGIN TRY
	
		--COMPROBACIONES
		IF ISNULL(@ID_REPUESTO,'') = ''
		BEGIN
			SET @RETCODE = 10
			SET @MENSAJE = 'El ID recibido esta vac�o'
			RETURN
		END
		/*
		IF COALESCE(@CANTIDAD, '') = ''
		BEGIN
			SET @RETCODE = 20
			SET @MENSAJE = 'La CANTIDAD recibida esta vac�a'
			RETURN
		END
		*/
		IF NOT EXISTS(SELECT ID_REPUESTO FROM STOCKS WHERE ID_REPUESTO = @ID_REPUESTO)
		BEGIN
			set @MENSAJE = 'NO existe un REPUESTO con ese ID'
			SET @RETCODE = 30
			RETURN
		END
		
		--COMPROBAMOS LA CANTIDAD
		IF @CANTIDAD < 0
		BEGIN
			set @MENSAJE = 'La CANTIDAD no puede ser menor que 0'
			SET @RETCODE = 40
			RETURN
		END
		
		-- --------------------------------------------------------------------
		-- TRANSACCI�N
		-- --------------------------------------------------------------------
		IF @NTRANS = 0 BEGIN TRANSACTION [TR_CAMBIAR_STOCK]		
			
			
			--SI TODO OK INSERTAMOS REGISTRO

			UPDATE STOCKS 
			SET	
				CANTIDAD = @CANTIDAD
			WHERE ID_REPUESTO = @ID_REPUESTO
				
				


		IF @NTRANS = 0 AND @@TRANCOUNT > 0 COMMIT TRANSACTION [TR_CAMBIAR_STOCK]

		SET @RETCODE = 0
		SET @MENSAJE = ''

	END TRY
	BEGIN CATCH
		
		SET @MENSAJE = ERROR_MESSAGE()
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 ROLLBACK TRANSACTION [TR_CAMBIAR_STOCK]

	END CATCH

	RETURN @RETCODE