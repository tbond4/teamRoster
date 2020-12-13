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

function managerInfo(){
    return inquirer.prompt([
        {
            type:"input",
            message:"What is the Managers name?",
            name:"name"
        },
        {
            message:"What is the Managers ID",
            type:"input",
            name:"id"
        },
        {
            message:"What is the Managers email address?",
            type:"input",
            name:"email"
        },
        {
            message:"What is the Managers office number?",
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
            message:"What type of Employee would you like to add?",
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
            message:"What is the Engineers name?",
            type:"input",
            name:"name"
        },
        {
            message:"What is the Engineers ID",
            type:"input",
            name:"id"
        },
        {
            message:"What is the Engineers email address?",
            type:"input",
            name:"email"
        },
        {
            message:"What is the Engineers gitHub accout username?",
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
            message:"What is the Interns name?",
            type:"input",
            name:"name"
        },
        {
            message:"What is the Interns ID",
            type:"input",
            name:"id"
        },
        {
            message:"What is the Interns email address?",
            type:"input",
            name:"email"
        },
        {
            message:"What is the Interns school?",
            type:"input",
            name:"school"
        },


    ]).then( (response)=>{
        const newIntern= new Intern(response.name,response.id,response.email,response.school);
        employeeArr.push(newIntern);
        employeeInfo();
    });

};
function renderFile(){
    const fileInfo=render(employeeArr);
    fs.writeFile("outputs/team.html", fileInfo,(err)=>{ err ? console.log("failed to write file"):console.log("Success!")})
}
managerInfo();
