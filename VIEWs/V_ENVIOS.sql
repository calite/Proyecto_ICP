/*
	DESCRIPCION DE LA VISTA:		[EXPLICACIÓN BREVE]
	

#######################################################################

	FECHA DE MODIFICACIÓN: 
	AUTOR:
	EXPLICACIÓN:		
	
#######################################################################
*/
ALTER VIEW V_ENVIOS
AS	
	
	SELECT 
		E.ID_ENVIO, E.ID_REPARACION, E.CALLE, E.NUMERO, E.POBLACION, E.PROVINCIA, E.CODIGO_POSTAL, E.PERSONA_CONTACTO, E.TELEFONO
	FROM 
		ENVIOS E

	