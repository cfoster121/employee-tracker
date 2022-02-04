const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db"
})

//Connect sql database
connection.connect((err) => {
    if (err) {
        throw err;
    }
});

module.exports = connection