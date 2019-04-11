 const inquirer = require('inquirer');
 const ContactController = require("./ContactController");

 module.exports = class MenuController {
   constructor(){
	this.mainMenuQuestions = [
      {
       type: "list",
        name: "mainMenuChoice",
        message: "Please choose from an option below: ",
        choices: [
          "Add new contact",
		  "Get date and time",
		  "Remind Me!",
          "Exit"
        ]
      }
    ];
    this.book = new ContactController();

   }

   main(){
     console.log(`Welcome to AddressBloc!`);
     inquirer.prompt(this.mainMenuQuestions).then((response) => {
       switch(response.mainMenuChoice){
         case "Add new contact":
           this.addContact();
           break;
		 case "Get date and time":
			this.getDate();
			break;
         case "Exit":
           this.exit();
		 case " Remind Me !"
		   this.remindMe();
		   break;
         default:
           console.log("Invalid input");
           this.main();
       }
     })
     .catch((err) => {
       console.log(err);
     });
   }

   clear(){
     console.log("\x1Bc");
   }
   
   addContact(){
     this.clear();
     inquirer.prompt(this.book.addContactQuestions).then((answers) => {
       this.book.addContact(answers.name, answers.phone).then((contact) => {
         console.log("Contact added successfully!");
         this.main();
       }).catch((err) => {
         console.log(err);
         this.main();
       });
     });
   }

   exit(){
     console.log("Thanks for using AddressBloc!");
     process.exit();
   }
   
   getContactCount(){
		return this.contacts.length;
   }
   
   getDate()
   {
	    var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		var hour = today.getHours();
		var minute = today.getMinutes();
		var second = today.getSeconds();
		var prepand = (hour >= 12)? " PM ":" AM ";
		hour = (hour >= 12)? hour - 12: hour;
  
		if (hour===0 && prepand===' PM ') 
		{ 
		  if (minute===0 && second===0)
		  { 
			hour=12;
			prepand=' Noon';
		  } 
		  else
		  { 
			hour=12;
			prepand=' PM';
		  } 
		} 
		if (hour===0 && prepand===' AM ') 
		{ 
			if (minute===0 && second===0)
			{ 
			  hour=12;
			  prepand=' Midnight';
			} 
			else
			{ 
			  hour=12;
			  prepand=' AM';
			} 
		} 
		
		this.main();
		
		today = mm + '/' + dd + '/' + yyyy;

		console.log(today + " Current Time : "+hour + prepand + " : " + minute + " : " + second);

   }
   
   remindMe()
   {
	   return "Learning is a life-long poursuit";
   }
 }
 
 