USE FCT_9
GO

/*
#######################################################################

	NOMBRE DEL FUNCI�N:			PA_ALTA_REPARACION
	FECHA DE CREACI�N: 			[FECHA]
	AUTOR:					[AUTOR]
	RUTA REPOSITORIO:			[RUTA]
	USADO POR:				WEB o APP
	DESCRIPCION DE LA VISTA:		[EXPLICACI�N BREVE]
	

#######################################################################

	FECHA DE MODIFICACI�N: 
	AUTOR:
	EXPLICACI�N:		
	
#######################################################################
*/



ALTER PROCEDURE PA_ALTA_REPARACION

	@ID_ARTICULO		INT,
	@SINTOMAS_JSON		VARCHAR(MAX),
	@REPUESTOS_JSON		VARCHAR(MAX),

	@INVOKER		INT,
	
	@RETCODE		INT		OUTPUT,
	@MENSAJE		VARCHAR(8000)	OUTPUT
AS
	
	DECLARE @NTRANS			INT = @@TRANCOUNT	

	SET @MENSAJE = ''
	SET @RETCODE = 0	


	BEGIN TRY
	
		--COMPROBACIONES
		IF ISNULL(@ID_ARTICULO,'') = ''
		BEGIN
			SET @RETCODE = 10
			SET @MENSAJE = 'El ID recibido esta vac�o'
			RETURN
		END
			
		IF NOT EXISTS(SELECT ID_ARTICULO FROM ARTICULOS WHERE ID_ARTICULO = @ID_ARTICULO)
		BEGIN
			set @MENSAJE = 'NO existe el ID del articulo'
			SET @RETCODE = 20
			RETURN
		END

		-- --------------------------------------------------------------------
		-- TRANSACCI�N
		-- --------------------------------------------------------------------
		IF @NTRANS = 0 BEGIN TRANSACTION [TR_ALTA_REPARACION]		
			
			
			--SI TODO OK INSERTAMOS REGISTRO

			INSERT INTO REPARACIONES(
				ID_ESTADO_REPARACION,
				ID_ARTICULO,
				FECHA_INSERCION
			) VALUES(
				101,
				@ID_ARTICULO,
				GETDATE()
			);


			--TABLA TEMPORAL DE SINTOMAS CON REPUESTOS

			CREATE TABLE #TEMPTABLE(ID_SINTOMA INT, ID_REPUESTO INT)

			--INSERTAMOS DATOS EN TABLA TEMPORAL

			INSERT INTO #TEMPTABLE(ID_SINTOMA)
			SELECT VALUE
			FROM OPENJSON(@SINTOMAS_JSON)

			INSERT INTO #TEMPTABLE(ID_REPUESTO)
			SELECT VALUE
			FROM OPENJSON(@REPUESTOS_JSON);


			--OBTENEMOS EL ULTIMO ID INSERTADO EN REPARACIONES

			SELECT TOP 1 ID_REPARACION FROM REPARACIONES ORDER BY ID_REPARACION DESC

			select * from #TEMPTABLE

			-- SE INSERTAR CAMPOS EN REPARACIONES_SINTOMAS_ESTADO

			INSERT INTO REPARACIONES_SINTOMAS_ESTADO
			(
				ID_REPARACION,
				ID_ESTADO_REPARACION,
				ID_SINTOMA,
				ID_ESTADO_SINTOMA,
				FECHA_ESTADO
			) SELECT 
				(SELECT TOP 1 ID_REPARACION FROM REPARACIONES ORDER BY ID_REPARACION DESC),
				101, 
				T.ID_SINTOMA,
				11,
				GETDATE()
			FROM
				 #TEMPTABLE AS T
			

			-- SE INSERTAR CAMPOS EN REPARACIONES_SINTOMAS_REPUESTO

			INSERT INTO REPARACIONES_SINTOMAS_REPUESTO
			(
				ID_REPARACION,
				ID_SINTOMA,
				ID_REPUESTO
			) SELECT 
				(SELECT TOP 1 ID_REPARACION FROM REPARACIONES ORDER BY ID_REPARACION DESC),
				T.ID_SINTOMA,
				T.ID_REPUESTO
			FROM
				 #TEMPTABLE AS T
				


		IF @NTRANS = 0 AND @@TRANCOUNT > 0 COMMIT TRANSACTION [TR_ALTA_REPARACION]

		SET @RETCODE = 0
		SET @MENSAJE = ''

	END TRY
	BEGIN CATCH
		
		SET @MENSAJE = ERROR_MESSAGE()
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 ROLLBACK TRANSACTION [TR_ALTA_REPARACION]

	END CATCH

	RETURN @RETCODE