const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");

// to connect to the database
const dbConnection = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "employee_db",
    },
    console.log(`Connected to the employee_db database.`)
);

const mainMenuQuestions = [
    {
        type: "list",
        message: "What do you want to do?",
        choices: ["view all departments", "view all roles", "view all employees",
        "add a department", "add a role", "add an employee", "update an employee role", "I'm done"],
        name: "action"
    }
];

const departmentQuestions = [
    {
        type: "input",
        message: "What is the name of the department?",
        name: "departmentName"
    }
];

const roleQuestions = [
    {
        type: "input",
        message: "What is the name of the role?",
        name: "roleTitle"
    },
    {
        type: "number",
        message: "What is the salary of the role?",
        name: "roleSalary"
    },
    {
        type: "list",
        message: "Which department does this role belong to?",
        // name value pair
        choices: [],
        name: "roleDepartment"
    }
];

const employeeQuestions = [
    {
        type: "input",
        message: "What is the employee's first name?",
        name: "employeeFirstName"
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "employeeLastName"
    },
    {
        type: "list",
        message: "What is the employee's role?",
        choices: [],
        name: "employeeRole"
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        choices: [],
        name: "employeeManager"
    }
];

// function to initialize inquirer app
function init() {
    inquirer.prompt(mainMenuQuestions).then((answers) => {
    if (answers.action == "view all departments") {
        viewDepartments()
    }
    else if (answers.action == "view all roles") {
        viewRoles()
    }
    else if (answers.action == "view all employees") {
        viewEmployees()
    }
    else if (answers.action = "add a department") {
        // addDepartment()
    //     // let department = new Department(answers.departmentName);
    //     // departments.push(department)
    }
    if (answers.action = "add a role") {
        addRole()
    //     // let role = new Role (answers.roleTitle, answers.roleSalary, answers.roleDepartment);
    //     // roles.push(roles)
    }
    else if (answers.action = "add an employee") {
        // addEmployee()
    //     // let employees = new Employee (answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager);
    //     // employees.push(employee)
    }
    // if user selects I'm done, end the connection
    else if (answers.action = "I'm done") {
        dbConnection.end();
    }
    })
}
  
function viewDepartments() {
    let query = `SELECT *
                FROM department`
    dbConnection.query(query, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.log(results)
        init()
})}

function viewRoles() {
    let query = `SELECT role.title, role.id, role.salary
                FROM role 
                JOIN department ON role.department_id = department.id`
    dbConnection.query(query, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.log(results)
        init()
})}

function viewEmployees() {
    let query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, m.first_name as 'manager_first_name', m.last_name as 'manager_last_name' 
                FROM employee LEFT JOIN role ON role.id = employee.role_id 
                LEFT JOIN department ON department.id = role.department_id 
                LEFT OUTER JOIN employee m ON employee.manager_id = m.id;`
    dbConnection.query(query, (err, results) => {
        if (err) {
            console.log(err)
        }
        console.log(results)
        init()
})}

function viewDepartmentNames() {
    let depts = ""
    let query = `SELECT * FROM department`
    dbConnection.query(query, (err, results) => {
if (err) {
    console.log(err)
}
console.log(results)
depts = results
// console.log(departmentNamesArray)
// return departmentNamesArray
})
return depts
}

function addRole() {
    viewDepartmentNames().then(answers => {
        console.log(answers)
        let departmentList = answers.map((forEachItem) => ({
            name: forEachItem.name,
            value: forEachItem.id
        })
        )
        console.log(departmentList)
    }).then(answers => {
        inquirer.prompt(roleQuestions).then(answers => {
        
            dbConnection.query(`INSERT INTO role (title, salary, department_id)
            VALUES (${answers.roleTitle}, ${answers.roleSalary}, ${departmentNamesArray})`, function (err, results) {
                console.log(results)
            })
        }) 
    })
   
}

init();


