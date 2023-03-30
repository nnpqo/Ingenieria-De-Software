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
/*-------------------------------------------------*/
/*procedimiento almacenado para actualizar el modelo*/
delimiter / / 
CREATE PROCEDURE modificar_modelo(
    IN nombre_antiguo VARCHAR(150),
    IN nombre_nuevo VARCHAR(150),
    IN descrip_nueva TEXT
)
BEGIN
    UPDATE modelos_dispositivos_moviles
    SET nombre = nombre_nuevo,
        descripcion = descrip_nueva
    WHERE nombre = nombre_antiguo 
END
/ /
    /*llamada al procedimiento almacenado ejemplo:*/
    /*CALL modificar_modelo('nombre_modelo_antiguo','nombre_modelo_nuevo','descripcion_nueva');*/
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
SELECT ruta_imagen, etiquetas.nombre AS etiqueta, modelos_dispositivos_moviles.nombre AS modelo
FROM modelos_dispositivos_moviles,etiquetas,etiqueta_modelo
WHERE nombre_etiqueta=etiquetas.nombre AND etiqueta_modelo.id_etiqueta=etiquetas.id AND 
etiqueta_modelo.id_modelo_dispositivo=modelos_dispositivos_moviles.id;
//
/*EJEMPLO: llamada al procedimiento almacenado*/
/*CALL obtener_todos_modelo_dispositivo('nombre_etiqueta');*/
/*-------------------------------------------------*/