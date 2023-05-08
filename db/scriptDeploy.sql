SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

DROP DATABASE IF EXISTS jdkcell_db;
CREATE DATABASE jdkcell_db CHARACTER SET utf8mb4;
USE jdkcell_db;

-- --------------------------------------------------------------
-- TABLE CATEGORIA												-
-- --------------------------------------------------------------
CREATE TABLE categorias (
  id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  ultima_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE (nombre)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------------
-- TABLE ETIQUETA										    -
-- --------------------------------------------------------------
CREATE TABLE etiquetas (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  id_categoria MEDIUMINT UNSIGNED NOT NULL,
  ultima_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY  (id),
  UNIQUE (nombre),
  KEY idx_fk_id_categoria (id_categoria),
  CONSTRAINT fk_etiqueta_categoria FOREIGN KEY (id_categoria) REFERENCES categorias (id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------------
-- TABLE ETIQUETA_MODELO							    -
-- --------------------------------------------------------------
CREATE TABLE etiqueta_modelo(
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_modelo_dispositivo INT UNSIGNED NOT NULL,
  id_etiqueta INT UNSIGNED NOT NULL,
  ultima_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY  (id),
  KEY idx_fk_id_modelo_dispositivo (id_modelo_dispositivo),
  KEY idx_fk_id_etiqueta (id_etiqueta),
  CONSTRAINT fk_etiqueta_modelo_modelo FOREIGN KEY (id_modelo_dispositivo) REFERENCES modelos_dispositivos_moviles (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_etiqueta_modelo_etiqueta FOREIGN KEY (id_etiqueta) REFERENCES etiquetas (id) ON DELETE RESTRICT ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------------
-- TABLE MODELOS_DISPOSITIVOS_MOVILES												-
-- --------------------------------------------------------------
CREATE TABLE modelos_dispositivos_moviles (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
  nombre VARCHAR(30) NOT NULL,
  ruta_imagen VARCHAR(250) NOT NULL,
  descripcion TEXT,
  cantidad SMALLINT,
  precio_compra decimal(10,2) CHECK( precio_compra > 0),
  precio_venta_sugerido DECIMAL(10,2) CHECK (precio_venta_sugerido > 0),
  visible TINYINT NOT NULL DEFAULT 1,
  ultima_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY  (id),
  UNIQUE (nombre)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


drop procedure if exists registrar_modelo;
delimiter // 
CREATE PROCEDURE registrar_modelo(
    IN nomb VARCHAR(150),
    IN ruta_imag VARCHAR(100),
    IN descripc TEXT,
    IN precio DECIMAL
) BEGIN
    INSERT INTO modelos_dispositivos_moviles (nombre, ruta_imagen, descripcion,precio_venta_sugerido)
    VALUES (nomb, ruta_imag, descripc,precio);
END //
/*llamada al procedimiento almacenado ejemplo:*/
/*CALL registrar_modelo('huawei p30 min','/images','celular 100 px etc',1879);*/
/*-------------------------------------------------*/

/*procedimiento almacenado para modificar un modelo de un dispositivo*/
drop procedure if exists modificar_modelo;
-------------------------------------------------/
delimiter //
CREATE PROCEDURE modificar_modelo(IN nombre_antiguo VARCHAR(150),
                                  IN nombre_nuevo VARCHAR(150),
                                  IN descrip_nueva TEXT,
                                  IN etiqueta_nueva VARCHAR(100),
                                  IN precio_nuevo DECIMAL,
                                  IN ruta VARCHAR(100))
      BEGIN 
         SET @id_etiquet=(SELECT id FROM etiquetas WHERE nombre=etiqueta_nueva LIMIT 1);
         SET @id_modelo=(SELECT id FROM modelos_dispositivos_moviles WHERE nombre=nombre_antiguo limit 1);
         SET @id_etiquet_modelo=(SELECT id FROM etiqueta_modelo WHERE id_modelo_dispositivo=@id_modelo limit 1);
         UPDATE modelos_dispositivos_moviles 
         SET nombre=nombre_nuevo,
             ruta_imagen = ruta,
             descripcion=descrip_nueva,
             precio_venta_sugerido=precio_nuevo
         WHERE nombre=nombre_antiguo;  
         UPDATE etiqueta_modelo 
         SET id_etiqueta=@id_etiquet   
         WHERE id=@id_etiquet_modelo;
      END //
delimiter ;
/*EJEMPLO: llamada al procedimiento almacenado*/
/*CALL modificar_modelo('nombre_modelo_antiguo','nombre_modelo_nuevo','descripcion_nueva','etiqueta nueva',precioNuevo,'/ruta');*/
/*-------------------------------------------------*/

/*-------------------------------------------------*/
/*procedimiento almacenado para relacionar la etiqueta con el nuevo modelo registrado*/
delimiter / / 
CREATE PROCEDURE relacion_etiqueta_modelo(IN nombre_etiqueta VARCHAR(100)) 
BEGIN
    SET @id_etiqueta2 =(
        SELECT id
        FROM etiquetas
        WHERE nombre = nombre_etiqueta
        );
    SET @id_modelo =(
        SELECT MAX(id)
        FROM modelos_dispositivos_moviles
    );
    INSERT INTO etiqueta_modelo (id_modelo_dispositivo, id_etiqueta)
    VALUES (@id_modelo, @id_etiqueta2);
END / / delimiter;
/*llamada al procedimiento almacenado ejemplo:*/
/*CALL relacion_etiqueta_modelo('nombre_etiqueta');*/
/*-------------------------------------------------*/



/*-------------------------------------------------*/
/*procedimiento almacenado para obtener todos los modelos de una etiqueta*/
delimiter //
CREATE PROCEDURE obtener_todos_modelo_dispositivo(IN nombre_etiqueta VARCHAR(100))
BEGIN
    SELECT ruta_imagen, etiquetas.nombre AS etiqueta, modelos_dispositivos_moviles.nombre AS modelo
    FROM modelos_dispositivos_moviles,etiquetas,etiqueta_modelo
    WHERE nombre_etiqueta=etiquetas.nombre AND etiqueta_modelo.id_etiqueta=etiquetas.id AND 
    etiqueta_modelo.id_modelo_dispositivo=modelos_dispositivos_moviles.id AND modelos_dispositivos_moviles.visible =1;
END
//
/*EJEMPLO: llamada al procedimiento almacenado*/
/*CALL obtener_todos_modelo_dispositivo('nombre_etiqueta');*/
/*-------------------------------------------------*/

/*-------------------------------------------------*/
/*procedimiento almacenado para obtener todas las etiquetas de una categoria*/
delimiter //
CREATE PROCEDURE obtener_etiquetas(IN nomb_categoria VARCHAR(100))
BEGIN 
    SET @id_categ=(SELECT id FROM categorias WHERE nombre=nomb_categoria);
    SELECT etiquetas.nombre FROM etiquetas
    WHERE etiquetas.id_categoria=@id_categ
    ORDER BY etiquetas.nombre ASC ;
END //
delimiter ;
/*EJEMPLO: llamada al procedimiento almacenado*/
/*CALL obtener_etiquetas('dispositivos moviles');*/
/*-------------------------------------------------*/


/*-------------------------------------------------*/
/*procedimiento almacenado para ocultar un modelo*/
delimiter //
CREATE PROCEDURE ocultar_modelo(IN nomb_modelo VARCHAR(100))
BEGIN 
    UPDATE modelos_dispositivos_moviles 
    SET modelos_dispositivos_moviles.visible = 0
    WHERE nombre=nomb_modelo;
END //
delimiter ;
/*EJEMPLO: llamada al procedimiento almacenado*/
/*CALL ocultar_modelo('nombre_modelo');*/
/*-------------------------------------------------*/


/*-------------------------------------------------*/
/*procedimiento almacenado para obtener los datos de un modelo especifico*/
delimiter //
CREATE PROCEDURE obtener_datos_modelo(IN nomb_modelo VARCHAR(150))
BEGIN
    SELECT ruta_imagen,modelos_dispositivos_moviles.nombre AS modelo,descripcion,etiquetas.nombre AS etiqueta
    FROM modelos_dispositivos_moviles,etiquetas,etiqueta_modelo
    WHERE modelos_dispositivos_moviles.nombre=nomb_modelo AND modelos_dispositivos_moviles.visible=1
    AND modelos_dispositivos_moviles.id=etiqueta_modelo.id_modelo_dispositivo AND etiqueta_modelo.id_etiqueta=etiquetas.id;
END
//
/*EJEMPLO: llamada al procedimiento almacenado*/
/*CALL obtener_datos_modelo('nombre_modelo');*/
/*-------------------------------------------------*/


/*----------------2DO SPRINT-----------------*/


/*-------------------------------------------------*/
/*procedimiento almacenado para obtener los datos de un modelo (marca,modelo,precio y descripcion)*/
drop procedure if exists obtener_caracteristicas_modelo;
delimiter //
CREATE PROCEDURE obtener_caracteristicas_modelo(IN nomb_modelo VARCHAR(150))
BEGIN
    SELECT etiquetas.nombre AS marca, modelos_dispositivos_moviles.nombre AS modelo, precio_venta_sugerido AS precio, descripcion, ruta_imagen as ruta
    FROM etiquetas, modelos_dispositivos_moviles, etiqueta_modelo
    WHERE etiqueta_modelo.id_modelo_dispositivo=modelos_dispositivos_moviles.id 
	       AND etiqueta_modelo.id_etiqueta=etiquetas.id AND modelos_dispositivos_moviles.nombre=nomb_modelo; 
END
//
/*EJEMPLO: llamada al procedimiento almacenado*/
/*CALL obtener_caracteristicas_modelo('nombre_modelo');*/
/*-------------------------------------------------*/


/*-------------------------------------------------*/
/*procedimiento almacenado para buscar un modelo por similitudes*/
drop procedure if exists buscar_modelo;
delimiter //
CREATE PROCEDURE buscar_modelo(IN nombre_modelo VARCHAR(150))
BEGIN 
   select distinct m.id, m.visible, m.nombre, m.ruta_imagen, m.descripcion, m.precio_venta_sugerido as precio, e.nombre as etiqueta
   from modelos_dispositivos_moviles m, etiqueta_modelo em, etiquetas e
   where m.id = em.id_modelo_dispositivo and em.id_etiqueta = e.id and e.id_categoria = 1 
        and m.nombre like CONCAT('%',nombre_modelo,'%') 
   ORDER BY m.nombre ASC;
END //
delimiter ;
/*EJEMPLO: llamada al procedimiento almacenado*/
/*CALL buscar_modelo('nombre_modelo');*/
/*-------------------------------------------------*/
drop procedure if exists modificar_modelo_sin_imagen;
-------------------------------------------------/
delimiter //
CREATE PROCEDURE modificar_modelo_sin_imagen(IN nombre_antiguo VARCHAR(150),
                                  IN nombre_nuevo VARCHAR(150),
                                  IN descrip_nueva TEXT,
                                  IN etiqueta_nueva VARCHAR(100),
                                  IN precio_nuevo DECIMAL)
      BEGIN 
         SET @id_etiquet=(SELECT id FROM etiquetas WHERE nombre=etiqueta_nueva LIMIT 1);
         SET @id_modelo=(SELECT id FROM modelos_dispositivos_moviles WHERE nombre=nombre_antiguo limit 1);
         SET @id_etiquet_modelo=(SELECT id FROM etiqueta_modelo WHERE id_modelo_dispositivo=@id_modelo limit 1);
         UPDATE modelos_dispositivos_moviles 
         SET nombre=nombre_nuevo,
             descripcion=descrip_nueva,
             precio_venta_sugerido=precio_nuevo
         WHERE nombre=nombre_antiguo;  
         UPDATE etiqueta_modelo 
         SET id_etiqueta=@id_etiquet   
         WHERE id=@id_etiquet_modelo;
      END //
delimiter ;

drop trigger if exists validacion_datos_modelos_dispositivosInsert; 
DELIMITER $$ 
create trigger validacion_datos_modelos_dispositivosInsert before insert on modelos_dispositivos_moviles for each row
begin 
	declare nom Varchar(40);
    set nom = upper(new.nombre);
    if not (nom REGEXP '^[ A-Z0-9]+$'  and length(nom) >= '2' and length(nom) <= '30')
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = "El campo 'Nombre' no cumple el formato requerido";
    elseif not (length(new.descripcion) <= '200' and length(new.descripcion) >= '10') 
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = "El campo 'Descripción' no cumple el formato requerido";
    elseif not (new.precio_venta_sugerido >= '1' and new.precio_venta_sugerido <= '99999') 
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = 'El precio no esta en el rango';
    else
        set new.nombre = nom;   
	end if;
end 
$$

drop trigger if exists validacion_datos_modelos_dispositivosUpdate; 
DELIMITER $$ 
create trigger validacion_datos_modelos_dispositivosUpdate before UPDATE on modelos_dispositivos_moviles for each row
begin 
	declare nom Varchar(40);
    set nom = upper(new.nombre);
    if not (nom REGEXP '^[ A-Z0-9]+$'  and length(nom) >= '2' and length(nom) <= '30')
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = "El campo 'Cambiar nombre' no cumple el formato requerido" ;
    elseif not (length(new.descripcion) <= '200' and length(new.descripcion) >= '10') 
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = "El campo 'Cambiar descripción' no cumple el formato requerido";
    elseif not (new.precio_venta_sugerido >= '1' and new.precio_venta_sugerido <= '99999') 
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = 'El precio no esta en el rango';
    else 
        set new.nombre = nom;   
	end if;
end 
$$

drop trigger if exists validacion_etiquetas; 
DELIMITER $$ 
create trigger validacion_etiquetas before insert on etiquetas for each row
begin 
    if not (new.nombre REGEXP '^[ a_zA-Z]+$'  and length(new.nombre) >= '2' and length(new.nombre) <= '20')
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = "El campo 'nombre' no cumple el formato requerido" ;
    end if;
end 
$$

INSERT INTO  categorias (id, nombre) 
VALUES
     (1,'dispositivos moviles');

INSERT INTO etiquetas ( nombre, id_categoria ) 
VALUES
    ('Samsung', 1),
    ('Xiaomi', 1),
    ('Realme', 1),
    ('Tecno',1),
    ('Honor',1),
    ('Apple',1),
    ('Infinix',1),
    ('Huawei',1),
    ('ZTE',1);


INSERT INTO modelos_dispositivos_moviles (id, nombre, descripcion, ruta_imagen) 
values 
    ('1','galaxy s22 ultra', 'descripcion prueba','/images/s22u.jpeg'),
    ('2','galaxy a71', 'descripcion prueba', '/images/a71.jpeg'),
    ('3','Tab s7 Fe', 'descripcion prueba','/images/s7fe.jpeg'),
    ('4','galaxy z flip4','descripcion prueba','/images/zflip4.jpeg' ),
    ('5','galaxy s20 ultra','descripcion prueba','/images/s20u.jpeg' ),
    ('6','tab s6 lite', 'descripcion prueba','/images/s22u.jpeg'),
    ('7','tab a7 lite','descripcion prueba','/images/a7l.jpeg' ),
    ('8','galaxy a51', 'descripcion prueba','/images/a51.jpeg'),
    ('9','Tab a8 lite','descripcion prueba','/images/s20u.jpeg' ),
    ('10','Redmi Note 10','descripcion prueba','/images/51UyTHwP6wL.jpg' ),
    ('11','Redmi Note 8 pro','descripcion prueba','/images/download.jpg' ),
    ('12','Poco x3 nfc','descripcion prueba','/images/d2a1b7dd275f4683be670a5b9cb04a88.jpg' ),
    ('13','Iphone X','descripcion prueba','/images/iphonex.png' ),
    ('14','Iphone 14 pro max','descripcion prueba','/images/iphone14.jpg' ),
    ('15','Realme 9','descripcion prueba','/images/realme9.jpg' ),
    ('16','Realme 7','descripcion prueba','/images/realme7.jpg' ),
    ('17','y9 prime 2019','descripcion prueba','/images/516bkMvgzzL._SL500_.jpg' ),
    ('18','Mate 30 pro','descripcion prueba','/images/mate30-pro-space-silver.png' ),
    ('19','Spark 10 Pro','descripcion prueba','/images/Tecno-Spark-10-Pro-Review-plus-1.jpg' ),
    ('20','camon 17','descripcion prueba','/images/download (1).jpg' ),
    ('21','hot 10','descripcion prueba','/images/infinix-hot10-play-1.jpg' );
    


insert into etiqueta_modelo (id_etiqueta, id_modelo_dispositivo) values 
('1', '1'),
('1', '2'),
('1', '3'),
('1', '4'),
('1', '5'),
('1', '6'),
('1', '7'),
('1', '8'),
('1', '9'),
('2', '10'),
('2', '11'),
('2', '12'),
('6', '13'),
('6', '14'),
('3', '15'),
('3', '16'),
('8', '17'),
('8', '18'),
('4', '19'),
('4', '20'),
('7', '21');



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;