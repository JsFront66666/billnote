const util    = require('util');
const sqlite3 = require('sqlite3');

sqlite3.verbose();
var db; // store the database connection here

exports.connectDB = function() {
    return new Promise((resolve, reject) => {
        if (db) {return resolve(db);}
        const dbfile = process.env.SQLITE_FILE || "./localdb/bill.sqlite3";
        db = new sqlite3.Database(dbfile,
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
            err => {
                if (err) {reject(err);}
                else {
                    console.log('Opened SQLite3 database '+ dbfile);
                    resolve(db);
                }
            });
    });
};
exports.create = function(note) {
    return exports.connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO bill VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? );",
                note, err => {
                    if (err) {reject(err);}
                    else {
                        console.log('CREATE '+ util.inspect(note));
                        resolve(note);
                    }
            });
        });
    });
};
exports.update = function(note) {
    return exports.connectDB().then(() => {
        const note = new Note(key, title, body);
        return new Promise((resolve, reject) => {
            db.run("UPDATE bill "+
                "SET  title = ?, body = ? "+
                "WHERE billLogId = ?",
                note, err => {
                    if (err) {reject(err);}
                    else {
                        console.log('UPDATE '+ util.inspect(note));
                        resolve(note);
                    }
            });
        });
    });
};
exports.read = function(key) {
    return exports.connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM notes WHERE notekey = ?",
                [ key ], (err, row) => {
                if (err){ reject(err);}
                else {
                    console.log('READ '+ util.inspect(row));
                    resolve(row);
                }
            });
        });
    });
};
exports.readConfig = function(table,key) {
    return exports.connectDB().then(() => {
        return new Promise((resolve, reject) => {
            var querySQL=`SELECT rowid AS id, name FROM ${table}`;
            if(key==="relation"){
                querySQL=`SELECT rowid AS id, parentcategorytype, categorytype, name FROM ${table}`;
            }
            db.all(querySQL, (err, rows) => {
                if (err){ reject(err);}
                else {
                    const namestr=`${table}List`;
                    const list={};
                    list[namestr] = rows;
                    //console.log('READ '+ util.inspect(list));
                    resolve(list);
                }
            });
        });
    });
};
exports.destroy = function(key) {
    return exports.connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM bill WHERE notekey = ?;",
                [ key ], err => {
                if (err) {reject(err);}
                else {
                    console.log('DESTROY '+ key);
                    resolve();
                }
            });
        });
    });
};
exports.keylist = function() {
    return exports.connectDB().then(() => {
        return new Promise((resolve, reject) => {
            var keyz = [];
            db.each("SELECT notekey FROM bill",
                (err, row) => {
                    if (err) {reject(err);}
                    else keyz.push(row.notekey);
                },
                (err, num) => {
                    if (err) {reject(err);}
                    else resolve(keyz);
                });
        });
    });
};
exports.count = function() {
    return exports.connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.get("select count(notekey) as count from bill",
                (err, row) => {
                    if (err) {return reject(err);}
                    resolve(row.count);
                });
        });
    });
};
exports.close = function() {
    return exports.connectDB().then(() => {
        return new Promise((resolve, reject) => {
            db.close((err) => {
                if (err) {
                  return console.log(err.message);
                }
                console.log('Close the database connection.');
            });
        });
    });
};