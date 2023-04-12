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
	DISTINCT
		(R.ID_REPARACION), 
		A.MARCA, A.MODELO, 
		ER.DESCRIPCION_ESTADO AS ESTADO
	FROM 
		REPARACIONES R
	
		LEFT JOIN 
		ARTICULOS A
		ON R.ID_ARTICULO = A.ID_ARTICULO

		LEFT JOIN 
		REPARACIONES_SINTOMAS_ESTADO RSE
		ON R.ID_REPARACION = RSE.ID_REPARACION
	
		LEFT JOIN 
		ESTADOS_REPARACION ER
		ON ER.ID_ESTADO_REPARACION = RSE.ID_ESTADO_REPARACION
	
	
GO