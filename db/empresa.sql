CREATE DATABASE IF NOT EXISTS empresa;

USE empresa;

CREATE TABLE empleados(
id INT(11)NOT NULL auto_increment,
nombre varchar(45)DEFAULT NULL,
salario INT(11) DEFAULT NULL,
PRIMARY KEY(id)
);

DESCRIBE empleados;
