var inquirer = require('inquirer');
const db = require("./db/connections")

//***ARRAY FUNCTIONS
//Creates array of departments
const getDeptId = function () {
    deptNumbers = [];
    db.query('SELECT id, dept_name FROM departments', function (err, results) {
        results.forEach(departments => {
            let idVal = departments.id + ': ' + departments.dept_name
            deptNumbers.push(idVal);
        })
    })
}
//Creates array of to choose a manager from
const getManager = function () {
    staff = [];
    db.query('SELECT id, employee_firstName FROM employees', function (err, results) {
        results.forEach(employees => {
            let mgr = employees.id + ': ' + employees.employee_firstName
            staff.push(mgr);
        })
    })
}
//Creates array of roles
const getRole = function () {
    jobs = [];
    db.query('SELECT id, role_name FROM roles', function (err, results) {
        results.forEach(roles => {
            let job = roles.id + ': ' + roles.role_name
            jobs.push(job);
        })
    })
}
//Calls array functions so arrays can be used as prompt choices
getDeptId();
getManager();
getRole();


//Starts main menu
mainMenu();

//**MAIN MENU**
function mainMenu() {
    //Initial prompt
    inquirer
        .prompt([
            {
                message: 'What would you like to do?',
                type: 'list',
                name: 'choices',
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role"
                ]
            }
        ])
        .then((r) => {
            //Functions for corresponding choices
            switch (r.choices) {
                case "View all departments":
                    viewDepts();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add a department":
                    addDept();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateEmployee();
                    break;
            }
        });
};

//**FUNCTIONS**
//View all departments
function viewDepts() {
    db.query('SELECT DISTINCT dept_name FROM departments', function (err, results) {
        if (err) throw err;
        console.table(results);
        mainMenu();
    });
};

//View all roles
function viewRoles() {
    db.query('SELECT DISTINCT role_name FROM roles', function (err, results) {
        if (err) throw err;
        console.table(results);
        mainMenu();

    })
};

//View all employees
function viewEmployees() {
    db.query('SELECT * FROM employees INNER JOIN roles', function (err, results) {
        if (err) throw err;
        console.table(results);
        mainMenu();
    })
};

//Input to add new department
async function addDept() {
    await inquirer
        .prompt([
            {
                message: 'Department name:',
                type: 'input',
                name: 'deptName',
                validate: input => {
                    if (input) {
                        return true;
                    }
                    else {
                        console.log("Please enter a department")
                    }
                }
            }
        ])
        .then((r) => {
            db.query('INSERT INTO departments (dept_name) VALUES (?)', [r.deptName], function (err, results) {
                if (err) throw err
            });
        })
    viewDepts();
};

//Input to add new role
async function addRole() {
    await inquirer
        .prompt([
            {
                message: 'Role name:',
                type: 'input',
                name: 'roleName',
                validate: input => {
                    if (input) {
                        return true;
                    }
                    else {
                        console.log("Please enter a role")
                    }
                }
            },
            {
                message: 'Role department:',
                type: 'list',
                name: 'roleDept',
                choices: deptNumbers,
            },
            {
                message: 'Role salary:',
                type: 'input',
                name: 'roleSalary',
                validate: input => {
                    if (input) {
                        return true;
                    }
                    else {
                        console.log("Please enter a salary")
                    }
                }
            }
        ])
        .then((r) => {
            db.query('INSERT INTO roles (role_name, role_dept, salary) VALUES (?, ?, ?)', [r.roleName, r.roleDept[0], r.roleSalary], function (err, results) {
                if (err) throw err
            }
            );
        })
    viewRoles();
}

//Input to add new employee
async function addEmployee() {
    await inquirer
        .prompt([
            {
                message: 'Employee first name:',
                type: 'input',
                name: 'empFirst',
                validate: input => {
                    if (input) {
                        return true;
                    }
                    else {
                        console.log("Please enter a first name")
                    }
                }
            },
            {
                message: 'Employee last name:',
                type: 'input',
                name: 'empLast',
                validate: input => {
                    if (input) {
                        return true;
                    }
                    else {
                        console.log("Please enter a last name")
                    }
                }
            },
            {
                message: 'Job Title:',
                type: 'list',
                name: 'empRole',
                choices: jobs
            },
            {
                message: 'Does this employee have a manager?',
                type: 'confirm',
                name: 'hasManager'
            },
        ])
        .then(async (r) => {
            db.query('INSERT INTO employees (employee_firstName, employee_lastName, employee_jobTitle) VALUES (?, ?, ?)', [r.empFirst, r.empLast, r.empRole[0]], function (err, results) {
                if (err) throw err
            });
            if (r.hasManager) {
                await inquirer
                    .prompt({
                        message: 'Manager:',
                        type: 'list',
                        name: 'empManager',
                        choices: staff,
                    })
                db.query('INSERT INTO employees (employee_firstName, employee_lastName, employee_jobTitle, employee_manager) VALUES (?, ?, ?, ?)', [r.empFirst, r.empLast, r.empRole[0], r.hasManager], function (err, results) {
                    if (err) throw err
                })
            }
        })
    viewEmployees();
}

//Input to update employee role
async function updateEmployee() {
    await inquirer
        .prompt([
            {
                message: 'Which employee would you like to update?',
                type: 'list',
                name: 'changeEmployee',
                choices: staff
            },
            {
                message: 'What is their new job title?',
                type: 'list',
                name: 'newJob',
                choices: jobs
                }
        ])
        .then((r) => {
            db.query('UPDATE employees SET employee_jobTitle = ? WHERE employee_firstName = ?', [r.newJob[0], r.changeEmployee[0]], function (err, results) {
                if (err) throw err
            }
            );
        })
    viewEmployees();
    }


