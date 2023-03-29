-- Trigers 

--Validacion de datos modelo_dispositivos_moviles

drop trigger if exists validacion_datos_modelos_dispositivos; 
DELIMITER $$ 
create trigger validacion_datos_modelos_dispositivos before insert on modelos_dispositivos_moviles for each row
begin 
	declare nom Varchar(40);
    set nom = upper(new.nombre);
    if not (nom REGEXP '^[ A-Z0-9]+$'  and length(nom) >= '2' and length(nom) <= '30')
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = "nombre de modelo de dispositivo no válido";
    elseif not (length(new.descripcion) <= '200') 
        then SIGNAL SQLSTATE '45000'
        set MESSAGE_TEXT = 'Numero de carateres excedidos';
    else 
        set new.nombre = nom;   
	end if;
end 
$$