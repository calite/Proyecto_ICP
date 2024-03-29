--insercion perfiles
INSERT INTO PERFILES(ID_PERFIL,DESCRIPCION_PERFIL) VALUES(10,'administrador');
INSERT INTO PERFILES(ID_PERFIL,DESCRIPCION_PERFIL) VALUES(20,'operador');
INSERT INTO PERFILES(ID_PERFIL,DESCRIPCION_PERFIL) VALUES(30,'gestor');
--insercion usuarios
INSERT INTO USUARIOS(USUARIO,PASSWORD,ID_PERFIL,EMAIL,ACTIVO,RESET_PASSWORD) VALUES('administrador','administrador',10,'administrador@administrador.com',1,0);
INSERT INTO USUARIOS(USUARIO,PASSWORD,ID_PERFIL,EMAIL,ACTIVO,RESET_PASSWORD) VALUES('operador','operador',20,'operador@operador.com',1,0);
INSERT INTO USUARIOS(USUARIO,PASSWORD,ID_PERFIL,EMAIL,ACTIVO,RESET_PASSWORD) VALUES('gestor','gestor',30,'gestor@gestor.com',1,0);
--insercion articulos
INSERT INTO ARTICULOS(MARCA,MODELO,ACTIVO) VALUES('apple','iphone 10',1);
INSERT INTO ARTICULOS(MARCA,MODELO,ACTIVO) VALUES('apple','iphone 11',1);
INSERT INTO ARTICULOS(MARCA,MODELO,ACTIVO) VALUES('apple','iphone 12',1);
INSERT INTO ARTICULOS(MARCA,MODELO,ACTIVO) VALUES('samsung','s20',1);
INSERT INTO ARTICULOS(MARCA,MODELO,ACTIVO) VALUES('samsung','s21',1);
INSERT INTO ARTICULOS(MARCA,MODELO,ACTIVO) VALUES('samsung','s22',1);
--insercion repuestos
INSERT INTO REPUESTOS(DESCRIPCION_REPUESTO,FABRICANTE,PESO,ALTO,LARGO,ANCHO,IMAGEN,ACTIVO) 
  VALUES('pantalla','Martinez SL',5,5,5,5,'',1);
INSERT INTO REPUESTOS(DESCRIPCION_REPUESTO,FABRICANTE,PESO,ALTO,LARGO,ANCHO,IMAGEN,ACTIVO) 
  VALUES('bateria','Martinez SL',5,5,5,5,'',1);
INSERT INTO REPUESTOS(DESCRIPCION_REPUESTO,FABRICANTE,PESO,ALTO,LARGO,ANCHO,IMAGEN,ACTIVO)
  VALUES('altavoz','Martinez SL',5,5,5,5,'',1);
INSERT INTO REPUESTOS(DESCRIPCION_REPUESTO,FABRICANTE,PESO,ALTO,LARGO,ANCHO,IMAGEN,ACTIVO)
  VALUES('camara','Martinez SL',5,5,5,5,'',1);
--insercion estados reparacion
INSERT INTO ESTADOS_REPARACION(ID_ESTADO_REPARACION,DESCRIPCION_ESTADO) VALUES(101,'EN TRANSITO');
INSERT INTO ESTADOS_REPARACION(ID_ESTADO_REPARACION,DESCRIPCION_ESTADO) VALUES(202,'SIN REPARAR');
INSERT INTO ESTADOS_REPARACION(ID_ESTADO_REPARACION,DESCRIPCION_ESTADO) VALUES(303,'REPARACION EN CURSO');
INSERT INTO ESTADOS_REPARACION(ID_ESTADO_REPARACION,DESCRIPCION_ESTADO) VALUES(404,'REPARADO');
INSERT INTO ESTADOS_REPARACION(ID_ESTADO_REPARACION,DESCRIPCION_ESTADO) VALUES(505,'ENVIADO');
--insercion estados sintomas
INSERT INTO ESTADOS_SINTOMA(ID_ESTADO_SINTOMA,DESCRIPCION_ESTADO) VALUES(11,'SIN REPARAR');
INSERT INTO ESTADOS_SINTOMA(ID_ESTADO_SINTOMA,DESCRIPCION_ESTADO) VALUES(22,'REPARACION EN CURSO');
INSERT INTO ESTADOS_SINTOMA(ID_ESTADO_SINTOMA,DESCRIPCION_ESTADO) VALUES(33,'REPARADO');
INSERT INTO ESTADOS_SINTOMA(ID_ESTADO_SINTOMA,DESCRIPCION_ESTADO) VALUES(44,'IMPOSIBLE REPARAR');
--insercion sintomas
INSERT INTO SINTOMAS(ID_SINTOMA,DESCRIPCION_SINTOMA,ID_REPUESTO) VALUES(10,'pantalla rota',1);
INSERT INTO SINTOMAS(ID_SINTOMA,DESCRIPCION_SINTOMA,ID_REPUESTO) VALUES(20,'bateria rota',2);
INSERT INTO SINTOMAS(ID_SINTOMA,DESCRIPCION_SINTOMA,ID_REPUESTO) VALUES(30,'altavoz rota',3);
INSERT INTO SINTOMAS(ID_SINTOMA,DESCRIPCION_SINTOMA,ID_REPUESTO) VALUES(40,'camara rota',4);
--insercion stocks
INSERT INTO STOCKS(ID_REPUESTO,CANTIDAD) VALUES(1,50);
INSERT INTO STOCKS(ID_REPUESTO,CANTIDAD) VALUES(2,50);
INSERT INTO STOCKS(ID_REPUESTO,CANTIDAD) VALUES(3,50);
INSERT INTO STOCKS(ID_REPUESTO,CANTIDAD) VALUES(4,50);
--insercion reparaciones
INSERT INTO REPARACIONES(ID_ESTADO_REPARACION,ID_ARTICULO,FECHA_INSERCION) VALUES(101,1,GETDATE());
INSERT INTO REPARACIONES(ID_ESTADO_REPARACION,ID_ARTICULO,FECHA_INSERCION) VALUES(202,2,GETDATE());
INSERT INTO REPARACIONES(ID_ESTADO_REPARACION,ID_ARTICULO,FECHA_INSERCION) VALUES(303,3,GETDATE());
INSERT INTO REPARACIONES(ID_ESTADO_REPARACION,ID_ARTICULO,FECHA_INSERCION) VALUES(101,4,GETDATE());
INSERT INTO REPARACIONES(ID_ESTADO_REPARACION,ID_ARTICULO,FECHA_INSERCION) VALUES(202,5,GETDATE());
INSERT INTO REPARACIONES(ID_ESTADO_REPARACION,ID_ARTICULO,FECHA_INSERCION) VALUES(303,6,GETDATE());
--insercion reparaciones_estado
INSERT INTO REPARACIONES_SINTOMAS_ESTADO(ID_REPARACION,ID_ESTADO_REPARACION,ID_SINTOMA,ID_ESTADO_SINTOMA,FECHA_ESTADO) VALUES(1,101,10,11,GETDATE()); --ojo con el primer campo que es el id de la reparacion
INSERT INTO REPARACIONES_SINTOMAS_ESTADO(ID_REPARACION,ID_ESTADO_REPARACION,ID_SINTOMA,ID_ESTADO_SINTOMA,FECHA_ESTADO) VALUES(2,202,20,22,GETDATE());
INSERT INTO REPARACIONES_SINTOMAS_ESTADO(ID_REPARACION,ID_ESTADO_REPARACION,ID_SINTOMA,ID_ESTADO_SINTOMA,FECHA_ESTADO) VALUES(3,303,30,33,GETDATE());
INSERT INTO REPARACIONES_SINTOMAS_ESTADO(ID_REPARACION,ID_ESTADO_REPARACION,ID_SINTOMA,ID_ESTADO_SINTOMA,FECHA_ESTADO) VALUES(4,101,40,44,GETDATE());
INSERT INTO REPARACIONES_SINTOMAS_ESTADO(ID_REPARACION,ID_ESTADO_REPARACION,ID_SINTOMA,ID_ESTADO_SINTOMA,FECHA_ESTADO) VALUES(5,202,10,11,GETDATE());
INSERT INTO REPARACIONES_SINTOMAS_ESTADO(ID_REPARACION,ID_ESTADO_REPARACION,ID_SINTOMA,ID_ESTADO_SINTOMA,FECHA_ESTADO) VALUES(6,303,20,22,GETDATE());
INSERT INTO REPARACIONES_SINTOMAS_ESTADO(ID_REPARACION,ID_ESTADO_REPARACION,ID_SINTOMA,ID_ESTADO_SINTOMA,FECHA_ESTADO) VALUES(6,303,30,33,GETDATE());
--insercion reparaciones_sintomas
INSERT INTO REPARACIONES_SINTOMAS_REPUESTO(ID_REPARACION,ID_SINTOMA,ID_REPUESTO) VALUES(1,10,1); --ojo con el primer campo que es el id de la reparacion
INSERT INTO REPARACIONES_SINTOMAS_REPUESTO(ID_REPARACION,ID_SINTOMA,ID_REPUESTO) VALUES(2,20,2);
INSERT INTO REPARACIONES_SINTOMAS_REPUESTO(ID_REPARACION,ID_SINTOMA,ID_REPUESTO) VALUES(3,30,3);
INSERT INTO REPARACIONES_SINTOMAS_REPUESTO(ID_REPARACION,ID_SINTOMA,ID_REPUESTO) VALUES(4,40,4);
INSERT INTO REPARACIONES_SINTOMAS_REPUESTO(ID_REPARACION,ID_SINTOMA,ID_REPUESTO) VALUES(5,10,1);
INSERT INTO REPARACIONES_SINTOMAS_REPUESTO(ID_REPARACION,ID_SINTOMA,ID_REPUESTO) VALUES(6,20,2);
INSERT INTO REPARACIONES_SINTOMAS_REPUESTO(ID_REPARACION,ID_SINTOMA,ID_REPUESTO) VALUES(6,30,3);
--insercion reparaciones_repuesto
/*
INSERT INTO REPARACIONES_REPUESTO VALUES(1,1);
INSERT INTO REPARACIONES_REPUESTO VALUES(2,2);
INSERT INTO REPARACIONES_REPUESTO VALUES(3,3);
INSERT INTO REPARACIONES_REPUESTO VALUES(4,4);
INSERT INTO REPARACIONES_REPUESTO VALUES(5,1);
INSERT INTO REPARACIONES_REPUESTO VALUES(6,2);
*/
--insercion envios
INSERT INTO ENVIOS (CALLE, NUMERO, POBLACION, PROVINCIA, CODIGO_POSTAL, PERSONA_CONTACTO, TELEFONO, ID_REPARACION)
VALUES ('Calle Mayor', 23, 'Madrid', 'Madrid', '28001', 'Juan Perez', 912345678, 1);

INSERT INTO ENVIOS (CALLE, NUMERO, POBLACION, PROVINCIA, CODIGO_POSTAL, PERSONA_CONTACTO, TELEFONO, ID_REPARACION)
VALUES ('Calle del Sol', 45, 'Barcelona', 'Barcelona', '08001', 'Ana Gomez', 934567890, 2);

INSERT INTO ENVIOS (CALLE, NUMERO, POBLACION, PROVINCIA, CODIGO_POSTAL, PERSONA_CONTACTO, TELEFONO, ID_REPARACION)
VALUES ('Calle del Mar', 67, 'Valencia', 'Valencia', '46001', 'Maria Rodriguez', 960123456, 3);

INSERT INTO ENVIOS(CALLE, NUMERO, POBLACION, PROVINCIA, CODIGO_POSTAL, PERSONA_CONTACTO, TELEFONO, ID_REPARACION)
VALUES('Calle del Sol', 23, 'Madrid', 'Madrid', '28010', 'Laura García', 912345678, 4);

INSERT INTO ENVIOS(CALLE, NUMERO, POBLACION, PROVINCIA, CODIGO_POSTAL, PERSONA_CONTACTO, TELEFONO, ID_REPARACION)
VALUES('Avenida de la Libertad', 45, 'Barcelona', 'Barcelona', '08007', 'Pablo Fernández', 933456789, 5);

INSERT INTO ENVIOS(CALLE, NUMERO, POBLACION, PROVINCIA, CODIGO_POSTAL, PERSONA_CONTACTO, TELEFONO, ID_REPARACION)
VALUES('Calle Mayor', 10, 'Valencia', 'Valencia', '46001', 'Ana Pérez', 961234567, 6);

--insercion recogidas

INSERT INTO RECOGIDAS (CALLE, NUMERO, POBLACION, PROVINCIA, CODIGO_POSTAL, PERSONA_CONTACTO, TELEFONO, ID_REPARACION)
VALUES ('Calle del Prado', 12, 'Madrid', 'Madrid', '28014', 'Ana López', 917654321, 1);

INSERT INTO RECOGIDAS (CALLE, NUMERO, POBLACION, PROVINCIA, CODIGO_POSTAL, PERSONA_CONTACTO, TELEFONO, ID_REPARACION)
VALUES ('Calle Mayor', 45, 'Toledo', 'Toledo', '45001', 'José Martínez', 925123456, 2);

INSERT INTO RECOGIDAS (CALLE, NUMERO, POBLACION, PROVINCIA, CODIGO_POSTAL, PERSONA_CONTACTO, TELEFONO, ID_REPARACION)
VALUES ('Calle Ancha', 22, 'Sevilla', 'Sevilla', '41001', 'María González', 955789012, 3);

INSERT INTO RECOGIDAS (CALLE, NUMERO, POBLACION, PROVINCIA, CODIGO_POSTAL, PERSONA_CONTACTO, TELEFONO, ID_REPARACION)
VALUES ('Calle Gran Vía', 100, 'Barcelona', 'Barcelona', '08009', 'David Sánchez', 934567890, 4);

INSERT INTO RECOGIDAS (CALLE, NUMERO, POBLACION, PROVINCIA, CODIGO_POSTAL, PERSONA_CONTACTO, TELEFONO, ID_REPARACION)
VALUES ('Calle San Juan', 8, 'Valencia', 'Valencia', '46002', 'Lucía Pérez', 963456789, 5);

INSERT INTO RECOGIDAS (CALLE, NUMERO, POBLACION, PROVINCIA, CODIGO_POSTAL, PERSONA_CONTACTO, TELEFONO, ID_REPARACION)
VALUES ('Calle Real', 20, 'Córdoba', 'Córdoba', '14002', 'Javier Ruiz', 957123456, 6);


-- EXTRAS 
/*
--insercion puntos de recogida
INSERT INTO PUNTOS_RECOGIDA VALUES ('VITORIA', 'C/ Ollamendi, Parcela 4.8. Pol. Ind. Jundiz C.T.V.', 'VITORIA', '1015', 'VITORIA', '945292323', 'L-V 8:00-20:30  S  8:00-13:30');
INSERT INTO PUNTOS_RECOGIDA VALUES ('ALBACETE', 'Pol. Ind. Campollano. C/ D, 35', 'ALBACETE', '2007', 'ALBACETE', '967190019', 'L-V 8:00-20:30  S  8:30-13:30');
INSERT INTO PUNTOS_RECOGIDA VALUES ('ALICANTE', 'Avda. del Euro, Parcela 9. Pol. Ind. Las Atalayas', 'ALICANTE', '3114', 'ALICANTE', '965987777', 'L-V 8:00-21:00  S  8:00-14:00');
INSERT INTO PUNTOS_RECOGIDA VALUES ('ALMERIA', 'C/ Los Mármoles, 28', 'ALMERÍA', '4007', 'ALMERÍA', '950220600', 'L-V 9:00-20:30  S  9:00-13:30');
INSERT INTO PUNTOS_RECOGIDA VALUES ('AVILA', 'Avda. Sta Cruz de Tenerife, 1', 'ÁVILA', '5005', 'ÁVILA', '920229213', 'L-V 9:00-20:30  S  9:00-13:30');
INSERT INTO PUNTOS_RECOGIDA VALUES ('BADAJOZ', 'C/ Nevero, 12 Parc. 16-20 . Pol. Ind. El Nevero (Ampliación)', 'BADAJOZ', '6006', 'BADAJOZ', '924271408', 'L-V 8:00-20:00  S  8:00-14:00');
INSERT INTO PUNTOS_RECOGIDA VALUES ('MALLORCA','C/ Gremi de Fusters, 8. Pol. Ind. de Son Castelló','PALMA DE MALLORCA','7009','PALMA DE MALLORCA','971436666','L-V 8:00-20:30  S  8:00-14:00');
INSERT INTO PUNTOS_RECOGIDA VALUES ('BARCELONA','Cal Nyepa, 23-27 ( PRAT DE LLOBREGAT)','EL PRAT DE LLOBREGAT','8820','EL PRAT DE LLOBREGAT','934797900','L-V 9:00-21:00  S  9:00-13:00');
INSERT INTO PUNTOS_RECOGIDA VALUES ('BURGOS','C/ La Ribera, Parcela Seur. Pol. Ind. Gamonal-Villayuda','BURGOS','9007','BURGOS','947486000','L-V 10:00-14:00  Y 17:00-20:00  S  10:00-13:00');
INSERT INTO PUNTOS_RECOGIDA VALUES ('CACERES','Pol. Ind. Las Capellanías, Travesía D-27','CÁCERES','10005','CÁCERES','927629063','L-V 8:30-21:00  S  8:30-14:00');
INSERT INTO PUNTOS_RECOGIDA VALUES ('CADIZ','C/ Gibraltar, s/n','CÁDIZ','11011','CÁDIZ','956263625','L-V 8:30-19:45  S  8:30-12:00');
INSERT INTO PUNTOS_RECOGIDA VALUES ('CASTELLON','Avda. Valencia, 233','CASTELLÓN','12005','CASTELLÓN','964240244','L-V 8:00-20:30  S  8:00-13:30');
INSERT INTO PUNTOS_RECOGIDA VALUES ('CIUDAD REAL','C/ Luis Pasteur, s/n. Pol. Ind. Avanzado','CIUDAD REAL','13005','CIUDAD REAL','926274000','L-V 9:00-21:00  S  9:00-14:00');
INSERT INTO PUNTOS_RECOGIDA VALUES ('CORDOBA','C/ Ingeniero Iribarren Esq. C/ Herreros. Pol. Ind. Amargacena','CÓRDOBA','14013','CÓRDOBA','957760076','L-V 8:00-20:00  S  8:00-14:00');

INSERT INTO PUNTOS_RECOGIDA (CIUDAD, DIRECCION, PROVINCIA, CODIGO_POSTAL, NOMBRE_CIUDAD, TELEFONO, HORARIO) 
VALUES
('CUENCA', 'Travesía Ronda Oeste, 5. Pol. Ind. El Pocillo', 'CUENCA', '16004', 'CUENCA', '969226516', 'L-V 8:00-20:30 S 8:00-13:30'),
('GERONA', 'C/ Pont d´ en Canals, s/n. Sector Güel', 'VILABLAREIX', '17180', 'VILABLAREIX', '972242526', 'L-V 8:00-20:00 S 9:00-13:30'),
('GRANADA', 'Avda. Asegra, s/n. Pol. Ind. Asegra', 'PELIGROS', '18210', 'PELIGROS', '958402288', 'L-V 8:00-21:00 S 8:00-14:00'),
('GUADALAJARA', 'C/ Trafalgar, Parcela 51. Pol. Ind. El Balconcillo', 'GUADALAJARA', '19004', 'GUADALAJARA', '949208020', 'L-V 8:30-20:30 S 8:30-13:30'),
('S SEBASTIAN', 'C/ Mateo Errota, 15 Nave P. Pol. Ind. 27. MARTUTENE', 'SAN SEBASTIÁN', '20014', 'SAN SEBASTIÁN', '943445677', 'L-V 9:00-19:00 S 9:00-13:30'),
('HUELVA', 'Pol. Ind. La Paz, Naves 10-11', 'HUELVA', '21007', 'HUELVA', '959233553', 'L-V 8:30-20:30 S 9:00-13:30'),
('HUESCA', 'C/ Agricultura, Nave 6. Pol. Ind. de Lucas Mallada', 'HUESCA', '22006', 'HUESCA', '974229970', 'L-V 7:30-20:00 S 7:30-13:30'),
('JAEN', 'C/ Torredonjimeno, 11. Pol. Ind. Los Olivares', 'JAÉN', '23009', 'JAÉN', '953280228', 'L-V 8:30-20:30 S 8:30-13:30'),
('LEON', 'Pol. Ind. de Onzonilla, Parcela G11-A', 'ONZONILLA', '24231', 'ONZONILLA', '987214012', 'L-V 8:30-21:30 S 8:30-14:00'),
('LERIDA', 'Pol. Ind. Mecanova. Ctra Tarragona, Km. 90', 'LÉRIDA', '25191', 'LÉRIDA', '973205266', 'L-V 8:00-20:00 S 8:00-13:30');

INSERT INTO PUNTOS_RECOGIDA (CIUDAD, DIRECCION, PROVINCIA, CODIGO_POSTAL, NOMBRE_CIUDAD, TELEFONO, HORARIO)
VALUES
('LOGROÑO', 'Pol. Ind. Cantabria II. C/ Las Cañas, 1', 'LOGROÑO', '26006', 'LOGROÑO', '941252022', 'L-V 8:30-20:00 S 9:00-14:00'),
('LUGO', 'Avda. Benigno Rivera, 12', 'LUGO', '27003', 'LUGO', '982209367', 'L-V 8:00-21:30 S 8:00-14:00'),
('MADRID', 'Ctra. Villaverde-Vallecas, Km. 257', 'MADRID', '28031', 'MADRID', '913228080', 'L-V 8:00-21:30 S 8:00-14:00'),
('MALAGA', 'C/ Fernando Sor, 2. Pol. Ind. Trévenez', 'MÁLAGA', '29590', 'MÁLAGA', '952354911', 'L-V 7:30-20:30 S 8:30-14:00'),
('MURCIA', 'Avda. Constitución, 9 Bajo', 'MURCIA', '30008', 'MURCIA', '968248395', 'L-V 9:30-13:30 Y 16:00-20:00'),
('PAMPLONA', 'Pol. Ind. NOAIN-ESQUIROZ. C/ Z, Nave 17', 'NOAIN', '31110', 'NOAIN', '948317112', 'L-V 8:00-20:00 S 8:00-13:30'),
('ORENSE', 'C/ Ramón Cabanillas, 4 Bajo', 'ORENSE', '32004', 'ORENSE', '988241229', 'L-V 9:00-13:30 Y 16:00-20:15'),
('ASTURIAS', 'Ctra. Antigua Oviedo-Gijón (Frente a I.T.V.)', 'PRUVIA LLANERA', '33192', 'PRUVIA LLANERA', '985266005', 'L-V 7:30-21:30 S 7:30-14:00'),
('PALENCIA', 'C/ Sevilla, 33. Pol. Ind. Los Angeles', 'PALENCIA', '34004', 'PALENCIA', '979728707', 'L-V 8:00-21:00 S 8:00-14:00'),
('LAS PALMAS', 'Pol. Ind. Salinetas. Ctra. Gral. del Sur, Km. 15', 'TELDE', '35200', 'TELDE', '928131700', 'L-V 8:00-19:30 S 8:00-13:00');

INSERT INTO PUNTOS_RECOGIDA (CIUDAD, DIRECCION, PROVINCIA, CODIGO_POSTAL, NOMBRE_CIUDAD, TELEFONO, HORARIO)
VALUES
  ('SALAMANCA', 'Avda. de La Aldehuela, s/n. Pol. Ind. del Tormes', 'SALAMANCA', '37003', 'SALAMANCA', '923182828', 'L-V 8:00-21:00 S 8:00-14:00'),
  ('TENERIFE', 'C/ Camino de San Lazaro nº 174, La Laguna.', 'LA LAGUNA', '38108', 'LA LAGUNA', '922200300', ''),
  ('SANTANDER', 'C/ Calderón de la Barca, 19', 'SANTANDER', '39002', 'SANTANDER', '942313011', 'L-V 9:00-19:30 S 9:00-13:00'),
  ('SEGOVIA', 'C/ Atalaya, 1. Pol. Ind. El Cerro', 'SEGOVIA', '40006', 'SEGOVIA', '921430616', 'L-V 8:00-20:00 S 8:00-13:30'),
  ('SEVILLA', 'C/ Torre de los Herberos, 8. Pol. Ind. Carretera de la Isla.', 'DOS HERMANAS', '41700', 'DOS HERMANAS', '954589300', 'L-V 8:00-21:00 S 8:00-14:00'),
  ('SORIA', 'Pol. Ind. Las Casas, Parcela 10 C-D', 'SORIA', '42005', 'SORIA', '975240101', 'L-V 9:00-14:00 Y 16:00-20:00 S 9:00-13:00'),
  ('TARRAGONA', 'NAL TRESCIENTOS CUARENTA N 228', 'TARRAGONA', '43006', 'TARRAGONA', '977544151', 'L-V 8:00-20:30 S 8:00-14:00');

  INSERT INTO PUNTOS_RECOGIDA (CIUDAD, DIRECCION, PROVINCIA, CODIGO_POSTAL, NOMBRE_CIUDAD, TELEFONO, HORARIO)
VALUES ('TERUEL', 'Ctra. de Cubla, s/n', 'TERUEL', '44001', 'TERUEL', '978607102', 'L-V 8:00-20:00  S  8:00-14:00');

INSERT INTO PUNTOS_RECOGIDA (CIUDAD, DIRECCION, PROVINCIA, CODIGO_POSTAL, NOMBRE_CIUDAD, TELEFONO, HORARIO)
VALUES ('TOLEDO', 'Ctra. de Madrid-Toledo, Km. 63', 'OLÍAS DEL REY', '45280', 'OLÍAS DEL REY', '925353024', 'L-V 8:00-20:00  S  8:00-13:30');

INSERT INTO PUNTOS_RECOGIDA (CIUDAD, DIRECCION, PROVINCIA, CODIGO_POSTAL, NOMBRE_CIUDAD, TELEFONO, HORARIO)
VALUES ('VALENCIA', 'C/ Ciudad de Barcelona, 26 Parc. 43-44. Pol. Ind. Fuente del Jarro (2ª Fase)', 'PATERNA', '46980', 'PATERNA', '961325335', 'L-V 8:00-22:00  S  8:00-14:00');

INSERT INTO PUNTOS_RECOGIDA (CIUDAD, DIRECCION, PROVINCIA, CODIGO_POSTAL, NOMBRE_CIUDAD, TELEFONO, HORARIO)
VALUES ('VALLADOLID', 'C/ Níquel, 4', 'VALLADOLID', '47012', 'VALLADOLID', '983101010', 'L-V 8:00-21:00  S  8:00-14:00');

INSERT INTO PUNTOS_RECOGIDA (CIUDAD, DIRECCION, PROVINCIA, CODIGO_POSTAL, NOMBRE_CIUDAD, TELEFONO, HORARIO)
VALUES ('BILBAO', 'Pol. Ind. Lezama Leguizamón. C/ Araba, 3', 'ECHEVARRI', '48450', 'ECHEVARRI', '944871010', 'L-V 8:00-20:00  S  8:30-14:00');

INSERT INTO PUNTOS_RECOGIDA (CIUDAD, DIRECCION, PROVINCIA, CODIGO_POSTAL, NOMBRE_CIUDAD, TELEFONO, HORARIO)
VALUES ('ZAMORA', 'C/ Villalpando, 12', 'ZAMORA', '49005', 'ZAMORA', '980510797', 'L-V 8:30-20:15  S  8:30-14:00');
*/