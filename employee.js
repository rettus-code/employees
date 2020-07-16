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

connection.connect(function(err) {
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
      .then(function(answer) {
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
    .then(function(answer) {
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
  .then(function(answer) {
    "INSERT INTO department (name) VALUES (answer.dprtmnt)";
    start()
  })
}
function createRole() {
  
  inquirer.prompt({
    type: "input",
    name: "title",
    message: "Name of new Role?",
  }),
  inquirer.prompt({
    type: "number",
    name: "salary",
    message: "What is the positions salary?"
  }),
  inquirer.prompt({
    type: "list",
    name: "department",
    message: "What department does this role belong to?"
  })
  .then(function(answer) {
    console.log(answers);
    // when finished prompting, insert a new item into the db with that info
    connection.query(
      "INSERT INTO role SET ?",
      {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.department
      },
      (err) => {
          if (err) throw err;
          console.log("The role of " + answers.new_role + " has been added.");
      }
  );
  start();
})
}

//*******finish this function
function createEmployee() {
  inquirer.prompt({
    type: "input",
    name: "dprtmnt",
    message: "Name of new Department?"
  })
  .then(function(answer) {
    //var query = connection.query(
    "INSERT INTO department (name) VALUES (answer.dprtmnt)";
  })
  start();
}

function read() {
  inquirer.prompt({
    type: "list",
    name: "read",
    message: "What would you like to view?",
    choices: ["Department", "Role", "Employee"]
  })
  .then(function(answer) {
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