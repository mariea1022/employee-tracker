const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");

const mainMenuQuestions = [
    {
        type: "list",
        message: "What do you want to do?",
        choices: ["view all departments", "view all roles", "view all employees",
        "add a department", "add a role", "add an employee", "update an employee role"],
        name: "action"
    }
];

const departmentQuestions = [
    {
        type: "input",
        message: "What is the name of the department?",
        name: departmenName
    }
];

const roleQuestions = [
    {
        type: "input",
        message: "What is the name of the role?",
        name: roleName
    },
    {
        type: "number",
        message: "What is the salary of the role?",
        name: roleSalary
    },
    {
        type: "list",
        message: "Which department does this role belong to?",
        choices: [],
        name: roleDepartment
    }
];

const employeeQuestions = [
    {
        type: "input",
        message: "What is the employee's first name?",
        name: employeeFirstName
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: employeeLastName
    },
    {
        type: "list",
        message: "What is the employee's role?",
        choices: [],
        name: employeeRole
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        choices: [],
        name: employeeManager
    }
];

// function to initialize app
function init() {
    inquirer.prompt(mainMenuQuestions).then((answers) => {
     
    }
    )
}
  
function mainQuestions() {

}

init();

// to connect to the database
const dbConnection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_db",
    },
    console.log(`Connected to the employee_db database.`)
);

// querries to the database using the dbConnection
// should have a query to view all departments, all roles, all employees?
dbConnection.query("SELECT * FROM department", function (err, results) {
    console.log(results);

    // when inquirer questions are done, end the connection
    dbConnection.end();
});

