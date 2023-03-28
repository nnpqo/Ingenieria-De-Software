SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

use jdkcell_db; 

INSERT INTO  categorias (nombre) 
VALUES
     ('dispositivos moviles');

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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- Trigers 
drop TRIGGER IF EXISTS validacion_datos_modelos_dispositivos;

DELIMITER $$ 
create trigger validacion_datos_modelos_dispositivos before insert on modelos_dispositivos_moviles for each row
begin 
    declare @nombre = upper(new.nombre);
    if not (@nombre REGEXP '^[ A-Z0-9]+$')
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = "nombre de modelo de dispositivo no válido";
    elseif not (char_length(descripcion) < 1000) 
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = 'Numero de carateres excedidos';
    else 
        set new.nombre = @nombre;   
    endif;
end 
$$