const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = 3306

const questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?' 
    }
]