USE employees_db;

INSERT INTO departments (dept_name)
VALUES ("Finance"),
        ("Sales"),
        ("Production"),
        ("HR");

INSERT INTO roles (role_dept, role_name, salary)
VALUES (1, "Manager", 200000),
        (2, "Employee", 50000);

INSERT INTO employees (employee_firstName, employee_lastName, employee_jobTitle)
VALUES ("Bob", "Smith", 2),
        ("Susie", "Jones", 1),
        ("John", "Doe", 2);

UPDATE employees SET employee_manager = 1 WHERE employee_firstName = 'Bob';


