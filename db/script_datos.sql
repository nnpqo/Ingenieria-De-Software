SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

use jdkcell_db; 

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
    ('1','galaxy s22 ultra', '','/images/s22u.jpeg'),
    ('2','galaxy a71', '', '/images/a71.jpeg'),
    ('3','Tab s7 Fe', '','/images/s7fe.jpeg'),
    ('4','galaxy z flip4','','/images/zflip4.jpeg' ),
    ('5','galaxy s20 ultra','','/images/s20u.jpeg' ),
    ('6','tab s6 lite', '','/images/s22u.jpeg'),
    ('7','tab a7 lite','','/images/a7l.jpeg' ),
    ('8','galaxy a51', '','/images/a51.jpeg'),
    ('9','Tab a8 lite','','/images/s20u.jpeg' );

insert into etiqueta_modelo (id_etiqueta, id_modelo_dispositivo) values 
('1', '1'),
('1', '2'),
('1', '3'),
('1', '4'),
('1', '5'),
('1', '6'),
('1', '7'),
('1', '8'),
('1', '9');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


