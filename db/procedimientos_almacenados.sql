use jdkcell_db;
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
    SELECT etiquetas.nombre AS marca, modelos_dispositivos_moviles.nombre AS modelo, precio_venta_sugerido AS precio, descripcion, ruta_image as ruta
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


/*----------------3ER SPRINT-----------------*/


/*-------------------------------------------------*/
/*procedimiento almacenado para obtener los datos de un producto (dispositivo celular)*/
drop procedure if exists obtener_producto;
delimiter //
CREATE PROCEDURE obtener_producto(IN nomb_modelo VARCHAR(100))
BEGIN
SELECT modelos_dispositivos_moviles.nombre AS modelo, etiquetas.nombre AS marca,
       imei, color, modelos_dispositivos_moviles.precio_venta_sugerido AS precio, modelos_dispositivos_moviles.ruta_imagen AS imagen
FROM dispositivo_movil,modelos_dispositivos_moviles,etiquetas,etiqueta_modelo
WHERE modelos_dispositivos_moviles.id=dispositivo_movil.id_modelo_dispositivo AND 
modelos_dispositivos_moviles.id=etiqueta_modelo.id_modelo_dispositivo AND dispositivo_movil.vendido=0 AND 
etiqueta_modelo.id_etiqueta=etiquetas.id AND modelos_dispositivos_moviles.nombre=nomb_modelo;
END 
//
/*EJEMPLO: llamada al procedimiento almacenado*/
/*CALL obtener_producto('nombre_modelo');*/
/*-------------------------------------------------*/


/*-------------------------------------------------*/
/*procedimiento almacenado para ocultar un producto (dispositivo celular)*/
drop procedure if exists ocultar_producto;
delimiter //
CREATE PROCEDURE ocultar_producto(IN imei_prod BIGINT(15))
BEGIN 
    UPDATE dispositivo_movil 
    SET dispositivo_movil.vendido = 1
    WHERE dispositivo_movil.imei=imei_prod;
END //
delimiter ;
/*EJEMPLO: llamada al procedimiento almacenado*/
/*CALL ocultar_producto(1245789636547854);*/
/*-------------------------------------------------*/