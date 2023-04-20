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
('1', '9');
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


