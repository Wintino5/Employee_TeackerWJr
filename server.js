const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = 3306
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_tracker'
});
db.connect(function() {
    console.log('connected')
});

const questions = [
    {
        type: "list",
        name: "action",
        message: "What would you like to do?", 
        choices:["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee"]
    }
]

function init() {
    inquirer.prompt(questions)
        .then(answers => {
            if(answers.action === "View Departments"){
                viewDepartments()
            }
        else if(answers.action === "View Roles"){
            viewRoles()
        }
        else if(answers.action === "View Employees"){
            viewEmployees()
        }
        /// add else if add department
        else if(answers.action === "Add Department"){
            addDepartment()
        }
        else if(answers.action === "Add Role" ){
            addRole()
        }
        // et al.
        else if(answers.action === "Add Employee"){
            addEmployee()
        }
        else if(answers.action === "Update Employee"){
            updateEmployee()
        }
        })
}

function viewDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err
            console.table(res)
            init()
    })
}

function viewRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err
            console.table(res)
            init()
    })
}

function viewEmployees() {
    db.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err
            console.table(res)
            init()
    })
}

function addDepartment() {
    db.query('SELECT * FROM department', (err, res) => {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the name of the department?"
            },
        ]).then(data => {
            db.query("INSERT INTO department SET ?", 
            {
                name: data.name
            })
            console.log(`Added ${data.name} to the database` )
            init()
        })
    })
}

function addRole(){
    db.query("SELECT * FROM department", (err, res)=>{
        inquirer.prompt([
            {
                type: "input",
                name:"title",
                message: "What is the title for the new role?"
            },
            {
                type: "input",
                name:"salary",
                message: "What is the salary for the new role?"
            },
            {
                type: "list",
                name:"depID",
                message: "What is the department for the new role?",
                choices: res.map(department => department.name)
            },
        ]).then(data => {
            let chosenDept = res.find(department => department.name === data.depID)

            db.query("INSERT INTO role SET ?",
            {
                title: data.title,
                salary: data.salary,
                department_id: chosenDept.id
            })
            console.log("Role added.")
            init()
        })
    })
}
/// make sure in addEmployee to query role table first
function addEmployee() {
    db.query('SELECT * FROM role', (err, managers) => {
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "roleID",
                message: "What is the new employee's role?",
                choices: managers.map(role => role.name)
            },
            {
                type: "list",
                name: "managerID",
                message: "Who is the employee's manager?",
                choices: managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id}))
            }
        ]).then(data => {
            let chosenRole = res.find(role => role.name === data.roleID)
            let chosenManager = res.find(manager => manager.name === data.managerID)

            db.query("INSERT INTO employee SET ?",
            {
                first_name: data.firstName,
                last_name: data.lastName,
                role_id: chosenRole.id,
                manager_id: chosenManager.id
            })
            console.log(`Added ${data.firstName} ${data.lastName} to the database`)
            init()
        })
    })
}



init()