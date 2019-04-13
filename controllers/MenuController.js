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
		  "View all contacts",
		  "Search for a contact",
		  "Get date and time",
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
		 case "View all contacts":
			this.getContacts();
			break;
		case "Search for a contact":
			this.search();
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
       this.book.addContact(answers.name, answers.phone, answers.email).then((contact) => {
         console.log("Contact added successfully!");
         this.main();
       }).catch((err) => {
         console.log(err);
         this.main();
       });
     });
   }
   
    getContacts(){
      this.clear();

      this.book.getContacts().then((contacts) => {
        for (let contact of contacts) {
          console.log(`
          name: ${contact.name}
          phone number: ${contact.phone}
          email: ${contact.email}
          ---------------`
          );
        }
        this.main();
      }).catch((err) => {
        console.log(err);
        this.main();
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
   
   
   search(){
      inquirer.prompt(this.book.searchQuestions)
      .then((target) => {
       this.book.search(target.name)
       .then((contact) => {
          if(contact === null){
            this.clear();
            console.log("contact not found");
            this.search();
          } else {
            this.showContact(contact);
         }

        });
     })
     .catch((err) => {
       console.log(err);
       this.main();
     });
    }

    showContact(contact){
      this._printContact(contact);
	  inquirer.prompt(this.book.showContactQuestions)
	  .then((answer) => {
		switch(answer.selected){
        case "Delete contact":
          this.delete(contact);
          break;
        case "Main menu":
          this.main();
          break;
        default:
          console.log("Something went wrong.");
          this.showContact(contact);
      }
    })
     .catch((err) => {
      console.log(err);
      this.showContact(contact);
    });
    }

    _printContact(contact);
      console.log(`
        name: ${contact.name}
        phone number: ${contact.phone}
        email: ${contact.email}
        ---------------`
      );
    }
	
	
	delete(contact){
      inquirer.prompt(this.book.deleteConfirmQuestions)
      .then((answer) => {
        if(answer.confirmation){
          this.book.delete(contact.id);
          console.log("contact deleted!");
          this.main();
        } else {
          console.log("contact not deleted");
          this.showContact(contact);
        }
      })
      .catch((err) => {
        console.log(err);
        this.main();
      });
    }
   
 }
 
 