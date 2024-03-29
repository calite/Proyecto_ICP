CREATE TABLE PERFILES(
	ID_PERFIL INT PRIMARY KEY, 
	DESCRIPCION_PERFIL VARCHAR(50) NOT NULL,
);

CREATE TABLE USUARIOS(
	ID_USUARIO INT IDENTITY(1,1) PRIMARY KEY,
	USUARIO VARCHAR(50) NOT NULL, 
	PASSWORD VARCHAR(50) NOT NULL, 
	ID_PERFIL INT FOREIGN KEY REFERENCES PERFILES(ID_PERFIL) NOT NULL, 
	EMAIL VARCHAR(50) NOT NULL,
	ACTIVO INT NOT NULL,
	RESET_PASSWORD INT NOT NULL,
);

CREATE TABLE ARTICULOS(
	ID_ARTICULO INT IDENTITY(1,1) PRIMARY KEY, 
	MARCA VARCHAR(50) NOT NULL, 
	MODELO VARCHAR(50) NOT NULL,	
	ACTIVO INT NOT NULL
);

CREATE TABLE REPUESTOS(
	ID_REPUESTO INT IDENTITY(1,1) PRIMARY KEY, 
	DESCRIPCION_REPUESTO VARCHAR(50) NOT NULL,
	FABRICANTE VARCHAR(50), 
	PESO INT NOT NULL, 
	ALTO INT NOT NULL, 
	LARGO INT NOT NULL, 
	ANCHO INT NOT NULL,
	IMAGEN VARCHAR(200),
	ACTIVO INT NOT NULL
);

CREATE TABLE STOCKS(
	ID_STOCK INT IDENTITY(1,1) PRIMARY KEY,
	ID_REPUESTO INT FOREIGN KEY REFERENCES REPUESTOS(ID_REPUESTO) NOT NULL,
	CANTIDAD INT NOT NULL,
);

CREATE TABLE SINTOMAS(
	ID_SINTOMA INT PRIMARY KEY, 
	ID_REPUESTO INT FOREIGN KEY REFERENCES REPUESTOS(ID_REPUESTO) NOT NULL,
	DESCRIPCION_SINTOMA VARCHAR(50) NOT NULL
);

CREATE TABLE ESTADOS_REPARACION(
	ID_ESTADO_REPARACION INT PRIMARY KEY, 
	DESCRIPCION_ESTADO VARCHAR(50) NOT NULL
);

CREATE TABLE ESTADOS_SINTOMA(
	ID_ESTADO_SINTOMA INT PRIMARY KEY, 
	DESCRIPCION_ESTADO VARCHAR(50) NOT NULL
);


CREATE TABLE REPARACIONES(
	ID_REPARACION INT IDENTITY(1,1) PRIMARY KEY,
	ID_ESTADO_REPARACION INT FOREIGN KEY REFERENCES ESTADOS_REPARACION(ID_ESTADO_REPARACION) NOT NULL,
	ID_ARTICULO INT FOREIGN KEY REFERENCES ARTICULOS(ID_ARTICULO) NOT NULL,
	FECHA_INSERCION DATE NOT NULL,
	FECHA_RECUPERACION DATE
);

CREATE TABLE REPARACIONES_SINTOMAS_ESTADO(
	ID_REPARACION_SINTOMAS_ESTADO INT IDENTITY(1,1) PRIMARY KEY,
	ID_REPARACION INT FOREIGN KEY REFERENCES REPARACIONES(ID_REPARACION) NOT NULL,
	ID_ESTADO_REPARACION INT FOREIGN KEY REFERENCES ESTADOS_REPARACION(ID_ESTADO_REPARACION) NOT NULL,
	ID_SINTOMA INT FOREIGN KEY REFERENCES SINTOMAS(ID_SINTOMA) NOT NULL,
	ID_ESTADO_SINTOMA INT FOREIGN KEY REFERENCES ESTADOS_SINTOMA(ID_ESTADO_SINTOMA) NOT NULL,
	FECHA_ESTADO DATE NOT NULL
);

CREATE TABLE REPARACIONES_SINTOMAS_REPUESTO(
	ID_REPARACION_SINTOMA INT IDENTITY(1,1) PRIMARY KEY,
	ID_REPARACION INT FOREIGN KEY REFERENCES REPARACIONES(ID_REPARACION) NOT NULL,
	ID_SINTOMA INT FOREIGN KEY REFERENCES SINTOMAS(ID_SINTOMA) NOT NULL,
	ID_REPUESTO INT FOREIGN KEY REFERENCES REPUESTOS(ID_REPUESTO) NOT NULL
);

CREATE TABLE ENVIOS(
	ID_ENVIO INT IDENTITY(1,1) PRIMARY KEY, 
	CALLE VARCHAR(50) NOT NULL, 
	NUMERO INT NOT NULL, 
	POBLACION VARCHAR(50) NOT NULL, 
	PROVINCIA VARCHAR(50) NOT NULL, 
	CODIGO_POSTAL VARCHAR(50) NOT NULL, 
	PERSONA_CONTACTO VARCHAR(50) NOT NULL, 
	TELEFONO INT NOT NULL,
	ID_REPARACION INT FOREIGN KEY REFERENCES REPARACIONES(ID_REPARACION) NOT NULL
);

CREATE TABLE RECOGIDAS(
	ID_RECOGIDA INT IDENTITY(1,1) PRIMARY KEY, 
	CALLE VARCHAR(50) NOT NULL, 
	NUMERO INT NOT NULL, 
	POBLACION VARCHAR(50) NOT NULL, 
	PROVINCIA VARCHAR(50) NOT NULL, 
	CODIGO_POSTAL VARCHAR(50) NOT NULL, 
	PERSONA_CONTACTO VARCHAR(50) NOT NULL, 
	TELEFONO INT NOT NULL,
	ID_REPARACION INT FOREIGN KEY REFERENCES REPARACIONES(ID_REPARACION) NOT NULL
);

/*
CREATE TABLE PUNTOS_RECOGIDA (
    ID_PUNTO_RECOGIDA INT PRIMARY KEY IDENTITY(1,1),
    CIUDAD VARCHAR(50),
    DIRECCION VARCHAR(100),
    PROVINCIA VARCHAR(50),
    CODIGO_POSTAL VARCHAR(10),
    NOMBRE_CIUDAD VARCHAR(50),
    TELEFONO VARCHAR(20),
    HORARIO VARCHAR(50)
);
*/




