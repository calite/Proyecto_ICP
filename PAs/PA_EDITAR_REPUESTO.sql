USE FCT_9
GO

/*
#######################################################################

	NOMBRE DEL FUNCIÓN:			PA_EDITAR_REPUESTO
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



ALTER PROCEDURE PA_EDITAR_REPUESTO

	@ID_REPUESTO		INT,
	@DESCRIPCION_REPUESTO	VARCHAR(50),
	@FABRICANTE		VARCHAR(50),
	@PESO			INT,
	@ALTO			INT,
	@LARGO			INT,
	@ANCHO			INT,
	@IMAGEN			VARCHAR(MAX),

	@INVOKER		INTEGER,
	
	@RETCODE		INT		OUTPUT,
	@MENSAJE		VARCHAR(8000)	OUTPUT
AS
	
	DECLARE @NTRANS			INT = @@TRANCOUNT	

	SET @MENSAJE = ''
	SET @RETCODE = 0	


	BEGIN TRY
		
		--COMPROBACIONES
		IF ISNULL(@DESCRIPCION_REPUESTO,'') = ''
		IF ISNULL(@FABRICANTE,'') = ''
		IF ISNULL(@PESO,'') = ''
		IF ISNULL(@ALTO,'') = ''
		IF ISNULL(@LARGO,'') = ''
		IF ISNULL(@ANCHO,'') = ''
		IF ISNULL(@IMAGEN,'') = ''
		BEGIN
			SET @RETCODE = 10
			SET @MENSAJE = 'Faltan datos'
			RETURN
		END

		--COMPROBAMOS ENTEROS
		IF @PESO < 0
		IF @ALTO < 0
		IF @LARGO < 0
		IF @ANCHO < 0
		BEGIN
			SET @RETCODE = 20
			SET @MENSAJE = 'No puede contener numeros negativos'
			RETURN
		END
		
		-- --------------------------------------------------------------------
		-- TRANSACCIÓN
		-- --------------------------------------------------------------------
		IF @NTRANS = 0 BEGIN TRANSACTION [TR_ALTA_REPARACION]		
			
			
			--SI TODO OK INSERTAMOS REGISTRO
								
			UPDATE 
				REPUESTOS 
			SET 
				DESCRIPCION_REPUESTO = @DESCRIPCION_REPUESTO,
				FABRICANTE = @FABRICANTE,
				PESO = @PESO,
				ALTO= @ALTO,
				LARGO = @LARGO,
				ANCHO = @ANCHO,
				IMAGEN = @IMAGEN
			WHERE
				ID_REPUESTO = @ID_REPUESTO
				

		IF @NTRANS = 0 AND @@TRANCOUNT > 0 COMMIT TRANSACTION [TR_ALTA_REPARACION]

		SET @RETCODE = 0
		SET @MENSAJE = ''

	END TRY
	BEGIN CATCH
		
		SET @MENSAJE = ERROR_MESSAGE()
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 ROLLBACK TRANSACTION [TR_ALTA_REPARACION]

	END CATCH

	RETURN @RETCODE