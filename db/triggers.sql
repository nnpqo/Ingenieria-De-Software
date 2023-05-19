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

drop trigger if exists validacion_producto; 
DELIMITER $$ 
create trigger validacion_producto before insert on dispositivo_movil for each row
begin 
    if not (new.color REGEXP '^[ a_zA-Z]+$'  and length(new.color) >= '3' and length(new.color) <= '15')
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = "El campo 'nombre' no cumple el formato requerido" ;
    end if;
end 
$$

drop trigger if exists validacion_producto; 
DELIMITER $$ 
create trigger validacion_producto before update on dispositivo_movil for each row
begin 
    if not (new.color REGEXP '^[ a_zA-Z]+$'  and length(new.color) >= '3' and length(new.color) <= '15')
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = "El campo 'nombre' no cumple el formato requerido" ;
    end if;
end 
$$
