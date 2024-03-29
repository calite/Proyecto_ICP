USE FCT_9
GO

/*
#######################################################################

	NOMBRE DEL FUNCI�N:			PA_LOGIN
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

/*

	SI TODO OK -> RETCODE = 0
	SI TODO ERROR -> RETCODE < 0
	SI TODO ERROR CONTROLADO -> RETCODE > 0
*/

--ALTER PROCEDURE PA_LOGIN	
CREATE PROCEDURE PA_LOGIN	

	
	@LOGIN			VARCHAR(30),
	@PASSWORD		VARCHAR(30),

	@INVOKER		INTEGER,
	
	@RETCODE		INT		OUTPUT,
	@MENSAJE		VARCHAR(8000)	OUTPUT
AS
	
	DECLARE @NTRANS			INT = @@TRANCOUNT	

	SET @MENSAJE = ''
	SET @RETCODE = 0	


	BEGIN TRY	

		IF ISNULL(@LOGIN,'') = ''
		BEGIN
			SET @RETCODE = 10
			SET @MENSAJE = 'El login recibido esta vac�o'
			RETURN
		END

		-- --------------------------------------------------------------------
		-- TRANSACCI�N
		-- --------------------------------------------------------------------
		IF @NTRANS = 0 BEGIN TRANSACTION [TR_LOGIN]		
			
			-- CUERPO DEL PA
			-- INSTRUCCIONES INSERT, UPDATE, DELETE, LLAMADAS A OTROS PAS, ETC
	
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 COMMIT TRANSACTION [TR_LOGIN]

		SET @RETCODE = 0
		SET @MENSAJE = ''

	END TRY
	BEGIN CATCH
		
		SET @MENSAJE = ERROR_MESSAGE()
		SET @RETCODE = -1
		IF @NTRANS = 0 AND @@TRANCOUNT > 0 ROLLBACK TRANSACTION [TR_LOGIN]

	END CATCH

	RETURN @RETCODE