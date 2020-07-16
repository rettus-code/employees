var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

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
  
        /*case "Update employee roles":
          delete();
          break;
  
        case "Find artists with a top song and top album in the same year":
          songAndAlbumSearch();
          break;*/

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
        createEmploee();
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
    //var query = connection.query(
    "INSERT INTO department (name) VALUES (answer.dprtmnt)";
  })
}