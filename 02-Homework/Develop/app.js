const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// Intial questions asked to the user
const questions = [
    {
        type: "list",
        message: "What is your role?",
        name: "officeRole",
        choices: ['Manager', 'Engineer', 'Intern']
    },
    {
        type: "input",
        message: "What is your name?",
        name: "name",
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email",
    },
    {
        type: "input",
        message: "What if your id?",
        name: "id",
    },
    {
        type: "input",
        message: "What is your github?",
        name: "github",
        when: (response) => response.officeRole === "Engineer",
    },
    {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber",
        when: (response) => response.officeRole === "Manager",
    },
    {
        type: "input",
        message: "What is your school?",
        name: "school",
        when: (response) => response.officeRole === "Intern",
    },
    {
        type: "confirm",
        message: "Would you like to add another employee?",
        name: "isDone"
    },
];

const employees = [];




const addEmployee = () => inquirer.prompt(questions).then(makeEmployee);



const makeEmployee = (response) => {
    let newEmployee;
//If i have an engineer collect engineer data
    // name, id, email, github
    if (response.officeRole === "Engineer"){
        newEmployee = new Engineer(response.name, response.id, response.email, response.github);
   }
// If i have an intern collect intern data
   // name, id, email, school
   else if (response.officeRole === "Intern"){
       newEmployee = new Intern(response.name, response.id, response.email, response.school);
   }
//If i have an manager collect manager data
   // name, id, email, officeNumber
   else if (response.officeRole === "Manager"){
       newEmployee = new Manager(response.name, response.id, response.email, response.officeNumber);
   };

   
employees.push(newEmployee);
  //Runs the addEmployee function again if another employee is needed to added 
   if (response.isDone)
       return addEmployee();
   // console.log(response);

//if they select no then write the file
fs.writeFile(outputPath, render(employees), function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("it worked")
});
};
addEmployee();









// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
