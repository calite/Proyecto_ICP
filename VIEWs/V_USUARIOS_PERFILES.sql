/*
	DESCRIPCION DE LA VISTA:		[EXPLICACIÓN BREVE]
	

#######################################################################

	FECHA DE MODIFICACIÓN: 
	AUTOR:
	EXPLICACIÓN:		
	
#######################################################################
*/
ALTER VIEW V_USUARIOS_PERFILES
AS	
	
	SELECT 
		U.ID_USUARIO,U.USUARIO,U.PASSWORD,P.DESCRIPCION_PERFIL "DESCRIPCION",U.EMAIL, U.ACTIVO  
	FROM 
		USUARIOS U
	LEFT JOIN 
		PERFILES P WITH (NOLOCK)
	ON 
		P.ID_PERFIL = U.ID_PERFIL;
	
	