/*
	DESCRIPCION DE LA VISTA:		[EXPLICACIÓN BREVE]
	
	vista general de los stocks ACTIVOS

#######################################################################

	FECHA DE MODIFICACIÓN: 
	AUTOR:
	EXPLICACIÓN:		
	
#######################################################################
*/
ALTER VIEW V_STOCKS_REPUESTOS
AS	
	
	SELECT 
		R.ID_REPUESTO, R.DESCRIPCION_REPUESTO "DESCRIPCION_REPUESTO", R.FABRICANTE, R.PESO, R.ALTO, R.LARGO, R.ANCHO, R.IMAGEN, S.CANTIDAD "STOCK"
	FROM 
		REPUESTOS R
	LEFT JOIN 
		STOCKS S WITH (NOLOCK)
	ON 
		S.ID_REPUESTO = R.ID_REPUESTO
	WHERE
		R.ACTIVO = 1;