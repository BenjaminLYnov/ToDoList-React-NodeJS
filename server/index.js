const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const http = require('http');
const app = express();

// BDD Config
const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node"
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);

// AJAX 

app.post('/api/InsertTodo', (req, res) => {
    var dataClient = req.body.data;
    dataClient = JSON.parse(dataClient)
    const memo = dataClient["memo"];
    con.connect(function (err) {
        con.query("SELECT COUNT(*) as isEmpty FROM `todolist`", function (err, result) {
            isEmpty = result[0].isEmpty;
            if (isEmpty != 0) {
                con.query("SELECT * FROM `todolist` ORDER BY priority DESC LIMIT 1", function (err, result) {
                    priority = result[0].priority + 1;
                    const requestSQL = "INSERT INTO `todolist` (`id`, `memo`, `dateAjout`, `priority`) VALUES (NULL, '" + memo + "', NOW(), '" + priority + "');";
                    con.query(requestSQL);
                });
            } else {
                const requestSQL = "INSERT INTO `todolist` (`id`, `memo`, `dateAjout`, `priority`) VALUES (NULL, '" + memo + "', NOW(), '1');";
                con.query(requestSQL);
            }
        });

    });
    res.send(JSON.stringify(""));
});

app.post('/api/GetTodo', (req, res) => {
    con.connect(function (err) {
        con.query("SELECT * FROM `todolist` ORDER BY priority ASC", function (err, result) {
            dataToClient = {
                id: [],
                memo: [],
                dateAjout: [],
                priority: []
            }

            // Get Data to send to client
            for (let index = 0; index < result.length; index++) {

                dataToClient["id"].push(result[index].id);
                dataToClient["memo"].push(result[index].memo);
                dataToClient["priority"].push(result[index].priority);

                // Get date with good format 

                const formatDate = (date) => {
                    let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " à " + date.getUTCHours() + " h " + date.getUTCMinutes() + " min " + date.getUTCSeconds() + " s";
                    return formatted_date;
                }
                result[index].dateAjout = formatDate(result[index].dateAjout);
                dataToClient["dateAjout"].push(result[index].dateAjout);
            }
            res.send(JSON.stringify(dataToClient));
        });
    });
});

app.post('/api/DeleteTodo', (req, res) => {
    var dataClient = req.body.data;
    const id = JSON.parse(dataClient)
    con.connect(function (err) {
        // Get priority of memo to delete
        con.query("SELECT * FROM `todolist` WHERE `todolist`.`id` = " + id + ";", function (err, result) {
            var priority = result[0].priority;

            con.query("DELETE FROM `todolist` WHERE `todolist`.`id` = " + id + ";");

            // Get id of all memo whose priority is higther than priority of memo to delete
            con.query("SELECT * FROM `todolist` WHERE `todolist`.`priority` > " + priority + ";", function (err, idToUpdate) {
                for (let index = 0; index < idToUpdate.length; index++) {
                    con.query("SELECT * FROM `todolist` WHERE `todolist`.`id` = " + idToUpdate[index].id + ";", function (err, result) {
                        priority = result[0].priority - 1;
                        con.query("UPDATE `todolist` SET priority = '" + priority + "' WHERE id = '" + idToUpdate[index].id + "';");
                    });
                }
            });
        });

    });
    res.send(JSON.stringify(""));
});

app.post('/api/ChangePriorityTodo', (req, res) => {
    var dataClient = req.body.data;
    dataClient = JSON.parse(dataClient)
    const id = dataClient["id"];
    const priorityActual = dataClient["priorityActual"];
    const newPriority = dataClient["newPriority"];
    con.connect(function (err) {
        con.query("UPDATE `todolist` SET priority = '" + priorityActual + "' WHERE priority = '" + newPriority + "'");
        con.query("UPDATE `todolist` SET priority = '" + newPriority + "' WHERE priority = '" + priorityActual + "' and id = '" + id + "'");
    });
    res.send(JSON.stringify(""));
});

// AJAX