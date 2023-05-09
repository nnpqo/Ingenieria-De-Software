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

-- --------------------------------------------------------------
-- TABLE DISPOSITIVO_MOVIL											-
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `dispositivo_movil` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `imei` bigint(15) NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `vendido` tinyint(4) NOT NULL DEFAULT 0,
  `ultima_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id_modelo_dispositivo` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_modelo_dispositivo` (`id_modelo_dispositivo`),
  CONSTRAINT `pertenece_modelo` FOREIGN KEY (`id_modelo_dispositivo`) REFERENCES `modelos_dispositivos_moviles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------------
-- TABLE USUARIO											-
-- --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` mediumint(8) unsigned NOT NULL DEFAULT 0,
  `nombre` varchar(50) DEFAULT NULL,
  `contrasenia` varchar(50) DEFAULT NULL,
  `rol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;