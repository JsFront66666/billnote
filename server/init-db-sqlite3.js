const fs = require("fs");
const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./localdb/bill.sqlite3', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the bill database.');
});
let sqlBody = '';
const sql=fs.createReadStream("./server/sql/schema-sqlite3.sql");
sql.on('data', (chunk) => {
    sqlBody += chunk;
});
sql.on('end', () => {
    try {
        db.serialize(function() {
            console.log(sqlBody);
            db.exec(sqlBody);  
        });
        db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    } catch (er) {
        console.log(er);
        db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    }
  });