const express = require("express");
const db=require("./db-sqlite3");
const bodyParser = require('body-parser');

const app = express();
app.set("port", process.env.PORT || 3001);
app.use(bodyParser.json());
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
}
// Read selection list
app.get("/form/config", (req, res) => {
    const config_tables=[{
        "key":"name",
        "tables":['billpaymenttype','billpayby','billfor']
    },{
        "key":"relation",
        "tables":['billcategory1','billcategory2']
    }];
    var dbPromises=[];
    config_tables.forEach((table_type)=>{
        table_type.tables.forEach((table)=>{
            dbPromises.push(db.readConfig(table,table_type.key));
        })
    });
    Promise.all(dbPromises).then((values)=>{
        res.send(Object.assign(...values));
    });
});
app.post("/form/createRecord", (req, res) => { 
    db.createRecord(req.body).then(()=>{
        res.status(200).send({"status":true});
    });
});
app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});