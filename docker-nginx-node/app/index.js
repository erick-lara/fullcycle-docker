const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'nodedb'
};
const mysql = require('mysql');

app.get('/', (httpRequest, httpResponse) => {
    getNames(httpResponse);
})

app.get('/:name',(httpRequest, httpResponse) => {
    const name = httpRequest.params.name;
    const connection = stabilishConfig();
    connection.query(`INSERT INTO people (name) VALUES ("${name}")`);
    connection.end();
    getNames(httpResponse);
})


app.listen(port, () => {
    console.log('Rodando na porta: ' + port);
})

function stabilishConfig() {
    return mysql.createConnection(config);
}

function getNames(httpResponse) {
    let response = '<h1>Full Cycle Rocks!</h1>';
    const connection = stabilishConfig();
    connection.query('SELECT p.name FROM people AS p;', (err, res, fields) => {
        for(it of res) {
            response += `<h2>${it.name}</h2>`
        }
        httpResponse.send(response);
    })
    connection.end();
}