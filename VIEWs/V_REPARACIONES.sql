/*
	DESCRIPCION DE LA VISTA:		[EXPLICACIÓN BREVE]
	
	vista general de las reparaciones, con sus estados, sintomas,repuesto a usar ...

#######################################################################

	FECHA DE MODIFICACIÓN: 
	AUTOR:
	EXPLICACIÓN:		
	
#######################################################################
*/
ALTER VIEW V_REPARACIONES_ESTADO
AS	
	
SELECT 
		DISTINCT(R.ID_REPARACION), A.MARCA, A.MODELO, E.DESCRIPCION_ESTADO "ESTADO"
	FROM 
		REPARACIONES R, ARTICULOS A, ESTADOS E, REPARACIONES_ESTADO RE
	WHERE 
		R.ID_ESTADO = RE.ID_ESTADO
		AND R.ID_ARTICULO = A.ID_ARTICULO
		AND E.ID_ESTADO = RE.ID_ESTADO
		AND R.ID_REPARACION = RE.ID_REPARACION
		
	