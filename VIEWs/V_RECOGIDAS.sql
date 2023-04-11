/*
	DESCRIPCION DE LA VISTA:		[EXPLICACIÓN BREVE]
	

#######################################################################

	FECHA DE MODIFICACIÓN: 
	AUTOR:
	EXPLICACIÓN:		
	
#######################################################################
*/
CREATE VIEW V_RECOGIDAS
AS	
	
	SELECT 
		R.ID_RECOGIDA, R.ID_REPARACION, R.CALLE, R.NUMERO, R.POBLACION, R.PROVINCIA, R.CODIGO_POSTAL, R.PERSONA_CONTACTO, R.TELEFONO
	FROM 
		RECOGIDAS R

	