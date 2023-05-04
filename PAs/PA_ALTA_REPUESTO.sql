USE FCT_9
GO

/*
#######################################################################

	NOMBRE DEL FUNCIÓN:			PA_ALTA_REPUESTO
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



ALTER PROCEDURE PA_ALTA_REPUESTO

	@DESCRIPCION_REPUESTO	VARCHAR(50),
	@FABRICANTE		VARCHAR(50),
	@PESO			INT,
	@ALTO			INT,
	@LARGO			INT,
	@ANCHO			INT,
	@IMAGEN			VARCHAR,
	@CANTIDAD		INT,
	@DESCRIPCION_SINTOMA	VARCHAR(50),

	@INVOKER		INTEGER,
	
	@RETCODE		INT		OUTPUT,
	@MENSAJE		VARCHAR(8000)	OUTPUT
AS
	
	DECLARE @NTRANS			INT = @@TRANCOUNT	

	SET @MENSAJE = ''
	SET @RETCODE = 0	


	BEGIN TRY
		
		--COMPROBACIONES
		IF ISNULL(@FABRICANTE,'') = ''
		IF ISNULL(@PESO,'') = ''
		IF ISNULL(@ALTO,'') = ''
		IF ISNULL(@LARGO,'') = ''
		IF ISNULL(@ANCHO,'') = ''
		IF ISNULL(@IMAGEN,'') = ''
		IF ISNULL(@CANTIDAD,'') = ''
		IF ISNULL(@DESCRIPCION_SINTOMA,'') = ''
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
		IF @CANTIDAD < 0
		BEGIN
			SET @RETCODE = 40
			SET @MENSAJE = 'No puede contener numeros negativos'
			RETURN
		END
		
		-- --------------------------------------------------------------------
		-- TRANSACCIÓN
		-- --------------------------------------------------------------------
		IF @NTRANS = 0 BEGIN TRANSACTION [TR_ALTA_REPARACION]		
			
			
			--SI TODO OK INSERTAMOS REGISTRO

			INSERT INTO REPUESTOS(DESCRIPCION_REPUESTO,FABRICANTE,PESO,ALTO,LARGO,ANCHO,IMAGEN,ACTIVO)
				VALUES(@DESCRIPCION_REPUESTO,@FABRICANTE,@PESO,@ALTO,@LARGO,@ANCHO,@IMAGEN, 1) --EMPIEZA ACTIVO

			--INSERTAMOS EL STOCK

			INSERT INTO STOCKS(ID_REPUESTO, CANTIDAD)
			VALUES (
				(SELECT TOP 1 ID_REPUESTO FROM REPUESTOS ORDER BY ID_REPUESTO DESC),
				@CANTIDAD
			)

			--SE CREA EL SINTOMA

			INSERT INTO SINTOMAS(ID_SINTOMA,ID_REPUESTO,DESCRIPCION_SINTOMA) 
			VALUES (
				((SELECT TOP 1 ID_SINTOMA FROM SINTOMAS ORDER BY ID_SINTOMA DESC) + 10),
				(SELECT TOP 1 ID_REPUESTO FROM REPUESTOS ORDER BY ID_REPUESTO DESC),
				@DESCRIPCION_SINTOMA
			)

		IF @NTRANS = 0 AND @@TRANCOUNT > 0 COMMIT TRANSACTION [TR_ALTA_REPARACION]

		SET @RETCODE = 0
		SET @MENSAJE = ''

	END TRY
	BEGIN CATCH
		
		SET @MENSAJE = ERROR_MESSAGE()
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 ROLLBACK TRANSACTION [TR_ALTA_REPARACION]

	END CATCH

	RETURN @RETCODE