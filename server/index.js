const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require("mysql");

//create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "olaz",
});

//connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL Connected...');
});

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/get', (req, res) => {
    const sqlSelect = "Select * from user;";
    db.query(sqlSelect, (err, result) => {
        // console.log(result);
        res.send(JSON.stringify({ status:200, error: null, response: result}));
    });
});

app.post('/api/insert', (req, res) => {
    const ten = req.body.ten
    const sdt = req.body.sdt
    const email = req.body.email
    const mk = req.body.mk

    const sqlInsert = "INSERT INTO user (ten, sdt, email, pass) VALUES (?,?,?,?);";
    db.query(sqlInsert, [ten, sdt, email, mk], (err, result) => {
        res.send(JSON.stringify({ status:200, error: null, response: "Thêm Thành Công"}));
    });
});

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "Delete from user where id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if(err) throw err;
        res.send(JSON.stringify({ status:200, error: null, response: "Xóa Thành Công"}));
    });
});

app.listen(3001, () =>{
    console.log("hi 3001");
});