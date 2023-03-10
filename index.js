const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
const consoleTable = require("console.table");

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

const inquirerMainMenuQuestions = [
  {
    type: "list",
    message: "What do you want to do?",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role",
      "I'm done",
    ],
    name: "action",
  },
];

const inquirerDepartmentQuestions = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "name",
  },
];

function roleQuestions(departmentChoicesArray) {
  const inquirerRoleQuestions = [
    {
      type: "input",
      message: "What is the name of the role?",
      name: "title",
    },
    {
      type: "number",
      message: "What is the salary of the role?",
      name: "salary",
    },
    {
      type: "list",
      message: "Which department does this role belong to?",
      // name value pair
      choices: departmentChoicesArray,
      name: "department_id",
    },
  ];
  return inquirerRoleQuestions;
}

function employeeQuestions(rolesChoicesArray, managersChoicesArray) {
  const inquirerEmployeeQuestions = [
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "first_name",
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "last_name",
    },
    {
      type: "list",
      message: "What is the employee's role?",
      choices: rolesChoicesArray,
      name: "role_id",
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      choices: managersChoicesArray,
      name: "manager_id",
    },
  ];
  return inquirerEmployeeQuestions;
}

// function to initialize app
function init() {
  inquirer.prompt(inquirerMainMenuQuestions).then((answers) => {
    if (answers.action == "view all departments") {
      viewDepartments();
    } else if (answers.action == "view all roles") {
      viewRoles();
    } else if (answers.action == "view all employees") {
      viewEmployees();
    } else if (answers.action == "add a department") {
      addDepartment();
    } else if (answers.action == "add a role") {
      addRole();
    } else if (answers.action == "add an employee") {
      addEmployee();
    } // if user selects I'm done, end the connection
    else if (answers.action == "I'm done") {
      dbConnection.end();
    }
  });
}

// function to view all departments in database
function viewDepartments() {
  let query = `SELECT *
                FROM department`;
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.table(results);
    init();
  });
}

// function to view all roles in database
function viewRoles() {
  let query = `SELECT role.title, role.id, role.salary
                FROM role 
                JOIN department ON role.department_id = department.id`;
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.table(results);
    init();
  });
}

// function to view all employees in database
function viewEmployees() {
  let query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, m.first_name as 'manager_first_name', m.last_name as 'manager_last_name' 
                FROM employee LEFT JOIN role ON role.id = employee.role_id 
                LEFT JOIN department ON department.id = role.department_id 
                LEFT OUTER JOIN employee m ON employee.manager_id = m.id;`;
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.table(results);
    init();
  });
}

// function to add department
function addDepartment() {
  inquirer.prompt(inquirerDepartmentQuestions).then((answers) => {
    dbConnection.query(
      `INSERT INTO department SET ?`,
      answers,
      function (err, results) {
        if (err) {
          console.log(err);
        }
        console.table(results);
        init();
      }
    );
  });
}

// function to add role
function addRole() {
  let query = `SELECT * FROM department`;
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.log(err);
    }
    let depts = results.map((forEachItem) => ({
      name: forEachItem.name,
      value: forEachItem.id,
    }));
    // a console log to see what the .map creates
    // console.log(depts);
    // passing depts variable into roleQuestions function
    inquirer.prompt(roleQuestions(depts)).then((answers) => {
      dbConnection.query(
        `INSERT INTO role SET ?`,
        answers,
        function (err, results) {
          if (err) {
            console.log(err);
          }
          console.table(results);
          init();
        }
      );
    });
  });
}

// function to add employee
function addEmployee() {
  let query = `SELECT * FROM role`;
  let queryTwo = `SELECT * FROM employee`;
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.log(err);
    }
    let roles = results.map((forEachItem) => ({
      name: forEachItem.title,
      value: forEachItem.id,
    }));

    dbConnection.query(queryTwo, (err, results) => {
      if (err) {
        console.log(err);
      }
      let managers = results.map((forEachItem) => ({
        name: forEachItem.first_name + " " + forEachItem.last_name,
        value: forEachItem.id,
      }));
      // a console log to see what the .map creates
      // console.log(roles);
      // console.log(managers);
      // passing roles and managers variables into employeeQuestions function
      inquirer.prompt(employeeQuestions(roles, managers)).then((answers) => {
        dbConnection.query(
          `INSERT INTO employee SET ?`,
          answers,
          function (err, results) {
            if (err) {
              console.log(err);
            }
            console.table(results);
            init();
          }
        );
      });
    });
  });
}

init();

// ask which employee you're updating 
// retreiving all roles
// take employee.id of person chosen and set the updated role to the role that was chosen
// UPDATE table_name
// SET column1 (role.id) = value1 (role.id they chose)

