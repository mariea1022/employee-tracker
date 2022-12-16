const inquirer = require("inquirer");
const fs = require("fs");

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

    }
]

const roleQuestions = [
    {

    }
]

const employeeQuestions = [
    {

    }
]

// function to initialize app
function init() {
    inquirer.prompt(mainMenuQuestions).then((answers) => {
     
    }
    )
}
  
function mainQuestions() {

}

init();
