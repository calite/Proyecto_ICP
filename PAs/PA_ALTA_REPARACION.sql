USE FCT_9
GO

/*
#######################################################################

	NOMBRE DEL FUNCIÓN:			PA_ALTA_REPARACION
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



ALTER PROCEDURE PA_ALTA_REPARACION

	@ID_ESTADO		INTEGER,
	@ID_ARTICULO		INTEGER,
	@FECHA_INSERCION	DATE,
	@FECHA_RECUPERACION	DATE,

	@INVOKER		INTEGER,
	
	@RETCODE		INT		OUTPUT,
	@MENSAJE		VARCHAR(8000)	OUTPUT
AS
	
	DECLARE @NTRANS			INT = @@TRANCOUNT	

	SET @MENSAJE = ''
	SET @RETCODE = 0	


	BEGIN TRY	
		-- --------------------------------------------------------------------
		-- TRANSACCIÓN
		-- --------------------------------------------------------------------
		IF @NTRANS = 0 BEGIN TRANSACTION [TR_ALTA_REPARACION]		
			
			-- CUERPO DEL PA
			--COMPROBAMOS QUE LA FECHA DE INSERCION NO SEA MAOR QUE LA FECHA DE RECUPERACION
			
			IF @FECHA_INSERCION > @FECHA_RECUPERACION
			BEGIN
				PRINT 'La fecha de inserción debe ser menor que la fecha de recuperación'
				RETURN
			END
			
			IF @ID_ESTADO = (SELECT ID FROM ESTADOS WHERE ID = @ID_ESTADO)
				
				PRINT 'existe el ID del estado'

			ELSE 
				PRINT 'NO existe un estado con ese ID'
				RETURN
			
			IF @ID_ARTICULO = (SELECT ID FROM ARTICULOS WHERE ID = @ID_ARTICULO)

				PRINT 'existe el ID del articulo'

			ELSE 
				PRINT 'NO existe el ID del articulo'

		IF @NTRANS = 0 AND @@TRANCOUNT > 0 COMMIT TRANSACTION [TR_ALTA_REPARACION]

		SET @RETCODE = 0
		SET @MENSAJE = ''

	END TRY
	BEGIN CATCH
		
		SET @MENSAJE = ERROR_MESSAGE()
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 ROLLBACK TRANSACTION [TR_ALTA_REPARACION]

	END CATCH

	RETURN @RETCODE