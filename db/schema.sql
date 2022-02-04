DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE departments (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE roles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL,
    role_dept INT UNSIGNED NOT NULL,
    salary INT NOT NULL,
    FOREIGN KEY (role_dept)
    REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_firstName VARCHAR(30) NOT NULL,
    employee_lastName VARCHAR(30) NOT NULL,
    employee_jobTitle INT UNSIGNED NOT NULL, 
    employee_manager INT UNSIGNED,
    FOREIGN KEY (employee_jobTitle)
    REFERENCES roles(id)
);

ALTER TABLE employees
    ADD CONSTRAINT sr_fk_emp_man 
    FOREIGN KEY (employee_manager) 
    REFERENCES employees(id);

