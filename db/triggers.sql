-- Trigers 

-- Validacion de datos modelo_dispositivos_moviles

use jdkcell_db;

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
        set MESSAGE_TEXT = "El campo 'Descripcion' no cumple el formato requerido";
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
        set MESSAGE_TEXT = "nombre de modelo de dispositivo no válido";
    elseif not (length(new.descripcion) <= '200' and length(new.descripcion) >= '10') 
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = 'Numero de carateres excedidos';
    else 
        set new.nombre = nom;   
	end if;
end 
$$
