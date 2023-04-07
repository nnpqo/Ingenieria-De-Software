/*-------------------------------------------------*/
/*procedimiento almacenado para registrar un modelo*/
drop procedure if exists registrar_modelo;
delimiter / / 
CREATE PROCEDURE registrar_modelo(
    IN nomb VARCHAR(150),
    IN ruta_imag VARCHAR(100),
    IN descripc TEXT
) BEGIN
    DECLARE CONTINUE HANDLER FOR 1062 
    BEGIN 
        SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = 'Error: Modelo Dispositivo ya existe';
    END;
    
    INSERT INTO modelos_dispositivos_moviles (nombre, ruta_imagen, descripcion)
    VALUES (nomb, ruta_imag, descripc);
END / /
/*llamada al procedimiento almacenado ejemplo:*/
/*CALL registrar_modelo('huawei p30 min','/images','celular 100 px etc');*/
/*-------------------------------------------------*/

drop procedure if exists modificar_modelo;
/*-------------------------------------------------*/
/*procedimiento almacenado para actualizar el modelo*/
delimiter //
CREATE PROCEDURE modificar_modelo(IN nombre_antiguo VARCHAR(150),
                                  IN nombre_nuevo VARCHAR(150),
                                  IN descrip_nueva TEXT,
                                  IN etiqueta_nueva VARCHAR(100),
                                  IN ruta VARCHAR(100))
      BEGIN 
         SET @id_etiquet=(SELECT id FROM etiquetas WHERE nombre=etiqueta_nueva);
         SET @id_modelo=(SELECT id FROM modelos_dispositivos_moviles WHERE nombre=nombre_antiguo);
         SET @id_etiquet_modelo=(SELECT id FROM etiqueta_modelo WHERE id_modelo_dispositivo=@id_modelo);
         UPDATE modelos_dispositivos_moviles 
         SET nombre=nombre_nuevo,
             ruta_imagen = ruta,
             descripcion=descrip_nueva
         WHERE nombre=nombre_antiguo; 
         UPDATE etiqueta_modelo 
         SET id_etiqueta=@id_etiquet   
         WHERE id=@id_etiquet_modelo;
      END //
delimiter ;
/*EJEMPLO: llamada al procedimiento almacenado*/
/*CALL modificar_modelo('nombre_modelo_antiguo','nombre_modelo_nuevo','descripcion_nueva','etiqueta nueva');*/
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