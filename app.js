const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const employeeArr=[];
const render = require("./lib/htmlRenderer");

//manager qs, name id email officenum

//then ask next employee or finsih. arrow key q engineer intern or i dont want to add anymore


function managerInfo(){
    return inquirer.prompt([
        {
            messege:"What is the Managers name?",
            type:"input",
            name:"name"
        },
        {
            messege:"What is the Managers ID",
            type:"input",
            name:"id"
        },
        {
            messege:"What is the Managers email address?",
            type:"input",
            name:"email"
        },
        {
            messege:"What is the Managers office number?",
            type:"input",
            name:"officeNumber"
        },


    ]).then( (response)=>{
        const newManager= new Manager(response.name,response.id,response.email,response.officeNumber);
        employeeArr.push(newManager);
        employeeInfo();
    });

    

    
};
function employeeInfo(){
    return inquirer.prompt([
        {
            messege:"What type of Employee would you like to add?",
            type:"list",
            choices:["Engineer","Intern","I dont want to add any more Employees"],
            name:"data"
        },

    ]).then( (response)=>{
           //prompt then conditional leading to other function or cal to render html and write file
           if(response.data == "Engineer"){
               engineerInfo();
           }else if(response.data == "Intern"){
                internInfo();
           }else{
            renderFile();
           }
        
    });

    //prompt then conditional leading to other function or cal to render html and write file
};
function engineerInfo(){
    return inquirer.prompt([
        {
            messege:"What is the Engineers name?",
            type:"input",
            name:"name"
        },
        {
            messege:"What is the Engineers ID",
            type:"input",
            name:"id"
        },
        {
            messege:"What is the Engineers email address?",
            type:"input",
            name:"email"
        },
        {
            messege:"What is the Engineers gitHub accout username?",
            type:"input",
            name:"github"
        },


    ]).then( (response)=>{
        const newEngineer= new Engineer(response.name,response.id,response.email,response.github);
        employeeArr.push(newEngineer);
        employeeInfo();
    });

};
function internInfo(){
    return inquirer.prompt([
        {
            messege:"What is the Interns name?",
            type:"input",
            name:"name"
        },
        {
            messege:"What is the Interns ID",
            type:"input",
            name:"id"
        },
        {
            messege:"What is the Interns email address?",
            type:"input",
            name:"email"
        },
        {
            messege:"What is the Interns school?",
            type:"input",
            name:"officeNumber"
        },


    ]).then( (response)=>{
        const newIntern= new Intern(response.name,response.id,response.email,response.school);
        employeeArr.push(newIntern);
        employeeInfo();
    });

};
function renderFile(){
    const fileInfo=render(employeeArr);
    //writefile
}
managerInfo();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
