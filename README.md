# Employee Tracker



## Getting Started

This is a command line interface (CLI) application that allows the user to view departments, roles, and employees in a given database. The user is also able to add new departments, roles, and employees, and update existing employee roles. 

### Prerequisites
* [Node](https://nodejs.org/en/)
* [MySql](https://dev.mysql.com/doc/)

### Installation

1. Clone this repository (Visit 
[Cloning a Repository - Github Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) for more details.)
2. Open cloned repository folder in command line interface (Details for [Mac](https://support.apple.com/guide/terminal/open-new-terminal-windows-and-tabs-trmlb20c7888/mac#:~:text=On%20your%20Mac%2C%20open%20a,window%3A%20Choose%20Open%20in%20Terminal.), [Windows](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands), and [Linux](https://www.linux.com/training-tutorials/how-use-linux-command-line-basics-cli/)).
3. Execute `npm install`
4. Execute `mysql -u root -p` and enter personal MySql login credentials (Visit [MySql](https://www.mysql.com/) for more details or to register for an account).
5. Execute `source db/schema.sql`
6. Execute `source db/seeds.sql`
7. Quit mysql
8. Execute `node server.js`
9. The user will then be prompted to choose different options and run the application.

 Watch installation tutorial video [here](https://youtu.be/sBln5avzD1Y).

![](assets/images/tracker1.png)  
  
![](assets/images/tracker2.png)

## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [JQuery](https://developer.mozilla.org/en-US/docs/Glossary/jQuery)
* [Node](https://nodejs.org/en/)
* [MySql](https://dev.mysql.com/doc/)
* [Inquirer](https://www.npmjs.com/package/inquirer)

## Author

**Courtney Foster** 

- [Portfolio](https://cfoster121.github.io/portfolio/)
- [Github](https://github.com/cfoster121)
- [LinkedIn](https://www.linkedin.com/in/courtney-foster/)


## License

This project is licensed under the MIT License 

## Acknowledgments

* [W3 Schools](https://www.w3schools.com/)
* [MDN Web Docs](https://developer.mozilla.org/en-US/)
* TA sessions
