
CREATE TABLE perfiles(
	id INT IDENTITY(1,1) PRIMARY KEY, 
	descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE usuarios(
	id INT IDENTITY(1,1) PRIMARY KEY, 
	usuario VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL, 
	id_perfil INT FOREIGN KEY REFERENCES perfiles(id) NOT NULL, 
	email VARCHAR(50) NOT NULL
);

CREATE TABLE articulos(
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
	marca VARCHAR(50) NOT NULL, 
	modelo VARCHAR(50) NOT NULL
);

CREATE TABLE repuestos(
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
	descripcion VARCHAR(50) NOT NULL,
	fabricante VARCHAR(50), 
	peso INT NOT NULL, 
	alto INT NOT NULL, 
	largo INT NOT NULL, 
	ancho INT NOT NULL
);

CREATE TABLE stocks(
	pantallas INT, 
	baterias INT
);

CREATE TABLE envios(
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
	calle VARCHAR(50) NOT NULL, 
	provincia VARCHAR(50) NOT NULL, 
	poblacion VARCHAR(50) NOT NULL, 
	codigo_postal VARCHAR(50) NOT NULL, 
	numero int NOT NULL, 
	persona_contacto VARCHAR(50) NOT NULL, 
	telefono INT NOT NULL
);

CREATE TABLE estados(
	id INT IDENTITY(1,1) PRIMARY KEY, 
	descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE sintomas(
	id INT IDENTITY(1,1) PRIMARY KEY, 
	descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE reparaciones(
	id INT IDENTITY(1,1) PRIMARY KEY,
	id_estado INT NOT NULL FOREIGN KEY REFERENCES estados(id),
	id_sintoma INT NOT NULL FOREIGN KEY REFERENCES sintomas(id),
	id_articulo INT NOT NULL FOREIGN KEY REFERENCES articulos(id)
);

CREATE table reparaciones_articulos(
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	id_reparacion INT NOT NULL FOREIGN KEY REFERENCES reparaciones(id),
	id_articulo INT NOT NULL FOREIGN KEY REFERENCES articulos(id),
	id_repuesto INT NOT NULL FOREIGN KEY REFERENCES repuestos(id),
	cantidad INT NOT NULL
);

CREATE TABLE reparaciones_sintomas(
	id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	id_reparacion INT NOT NULL FOREIGN KEY REFERENCES reparaciones(id),
	id_sintoma INT NOT NULL FOREIGN KEY REFERENCES sintomas(id)
);
