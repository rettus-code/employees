var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employees"
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});
function start() {
  inquirer.prompt({
    type: "list",
    name: "initial",
    message: "Choose an action",
    choices: ["Add departments, roles, employees", "View departments, roles, employees", "Update employee roles", "exit"]
  })
    .then(function (answer) {
      switch (answer.initial) {
        case "Add departments, roles, employees":
          create();
          break;

        case "View departments, roles, employees":
          read();
          break;

        case "Update employee roles":
          update();
          break;

        case "exit":
          connection.end();
          break;
      };
    });
};
function create() {
  inquirer.prompt({
    type: "list",
    name: "create",
    message: "What would you like to add?",
    choices: ["Department", "Role", "Employee"]
  })
    .then(function (answer) {
      switch (answer.create) {
        case "Department":
          createDepartment();
          break;

        case "Role":
          createRole();
          break;

        case "Employee":
          createEmployee();
          break;
      }
    });
};
function createDepartment() {
  inquirer.prompt({
    type: "input",
    name: "dprtmnt",
    message: "Name of new Department?",
  })
    .then(function (answer) {
      connection.query(
        "INSERT INTO department (name) VALUES (?);", answer.dprtmnt, function (err, result) {
          if (err) throw err;
          //console.log(result);
          start()
        })
    })
}
function createRole() {
  var query = "SELECT * FROM department;"
  connection.query(query, function (err, res) {
    if (err) throw err;

    var deptid = []
    var deptname = []
    for (var i = 0; i < res.length; i++) {
      deptid.push(res[i].id)
      deptname.push(res[i].name)
    }
    console.log(deptid);
    inquirer.prompt(
      [{
        type: "input",
        name: "title",
        message: "Name of new Role?",
      },
      {
        type: "number",
        name: "salary",
        message: "What is the positions salary?"
      },
      {
        type: "list",
        name: "department",
        message: "What department does this role belong to?",
        choices: deptid
        //value:deptid
      }
      ])
      .then(function (answers) {
        console.log(answers);
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO role (title,salary,department_id) VALUES (?, ?, ?)",
          [answers.title, answers.salary, answers.department],
          (err, result) => {
            if (err) throw err;
            console.log("The role of " + answers.new_role + " has been added.");
            start();
          }
        );

      })
  })
}

//*******finish this function
function createEmployee() {
  var query = "SELECT id FROM role;"
  connection.query(query, function (err, res) {
    var roleid = []
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleid.push(res[i].id)
    }

    inquirer.prompt(
      [{
        type: "input",
        name: "first",
        message: "Name of new Firstname?"
      },
      {
        type: "input",
        name: "last",
        message: "Name of new lastname?"
      },
      {
        type: "list",
        name: "role",
        message: "What is the employees role",
        choices: roleid
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employees manager",
        choices: [2, 6]
      }
      ])
      .then(function (answers) {
        connection.query(
          "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)",
          [answers.first, answers.last, answers.role, answers.manager],
          (err, result) => {
            if (err) throw err;
            console.log("New employee" + answers.first + " " + answers.last + " has been added.");
            start();
          })
      })
  })
  }

function read() {
      inquirer.prompt({
        type: "list",
        name: "read",
        message: "What would you like to view?",
        choices: ["Department", "Role", "Employee"]
      })
        .then(function (answer) {
          switch (answer.read) {
            case "Department":
              readDepartments();
              break;

            case "Role":
              readRoles();
              break;

            case "Employee":
              readEmployees();
              break;
          }
        });
    };

  function readEmployees() {
    console.log("Viewing all employees.")
    var query = "SELECT * FROM employee;"
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    })
  }

  function readRoles() {
    console.log("Viewing all employees roles.")
    var query = "SELECT * FROM role;"
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    })
  }

  function readDepartments() {
    console.log("Viewing all departments.")
    var query = "SELECT * FROM department;"
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    })
  }