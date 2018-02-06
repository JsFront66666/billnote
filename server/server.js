const express = require("express");
const app = express();
const db=require("./db-sqlite3");

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
}

app.get("/form/config", (req, res) => {
    const db_tables=['billtype','billcategory1','billcategory2','billpaymenttype','billpayby','billfor'];
    var dbPromises=[];
    db_tables.forEach((db_table)=>{
        dbPromises.push(db.readConfig(db_table));
    });
    Promise.all(dbPromises).then((values)=>{
        res.send(Object.assign(...values));
        db.close();
    });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});