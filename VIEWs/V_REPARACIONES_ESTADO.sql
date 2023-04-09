/*
	DESCRIPCION DE LA VISTA:		[EXPLICACIÓN BREVE]
	
	vista general de las reparaciones, con sus estados, sintomas,repuesto a usar ...

#######################################################################

	FECHA DE MODIFICACIÓN: 
	AUTOR:
	EXPLICACIÓN:		
	
#######################################################################
*/
alter VIEW V_REPARACIONES_ESTADO
AS	
	
SELECT 
		DISTINCT(R.ID_REPARACION), A.MARCA, A.MODELO, E.DESCRIPCION_ESTADO "ESTADO"
	FROM 
		REPARACIONES R
	LEFT JOIN ARTICULOS A WITH(NOLOCK)
	ON
		R.ID_ARTICULO = A.ID_ARTICULO
	LEFT JOIN REPARACIONES_ESTADO RE WITH(NOLOCK)
	ON
		R.ID_REPARACION = RE.ID_REPARACION
	LEFT JOIN ESTADOS E WITH(NOLOCK)
	ON
		E.ID_ESTADO = RE.ID_ESTADO
	
	
GO