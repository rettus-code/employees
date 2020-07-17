INSERT INTO department (name)
VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

INSERT INTO role (title,salary,department_id)
VALUES ("Sales Lead",100000,1),("Sales Person",65000,1),("Lead Engineer",150000,2),("Software Engineer",120000,2),
("Account Manager",90000,3),("Accountant",90000,3),("Legal Team Lead",130000,4),("Lawyer",85000,4),("Junior Engineer",70000,2);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("John","Cohsman",3,NULL),("Evin","Pach",7,NULL),("Joe","Denice",8,null),
("Zach","Swan",6,NULL),("Richard","Gonzales",1,NULL);

SELECT role.id, role.id, role.department_id, department.id
FROM role
INNER JOIN department ON role.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id;

SELECT role.id, role.title FROM role LEFT JOIN employee ON role.id = employee.role_id;

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
