DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;



CREATE TABLE department(
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10, 2),
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  LAST_name VARCHAR(30),
  ROLE_ID int, 
  MANAGER_id INT,
  PRIMARY KEY (id)
);