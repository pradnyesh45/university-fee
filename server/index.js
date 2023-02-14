var express = require("express");
var app = express();
var fs = require("fs");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/getData", function (req, res) {
  fs.readFile(__dirname + "/" + "data.json", "utf8", function (err, data) {
    res.end(data);
  });
});

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server Running", host, port);
});

// Testing Mysql
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded());

// const mysql = require("mysql");
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Adarsh.1234",
//   database: "fee_viewer",
//   port: 3306,
// });

// connection.connect((err) => {
//   if (err) {
//     console.log(err.message);
//   }
//   console.log("db " + connection.state);
// });

app.get("/getTableData", (req, res) => {
  connection.query("SELECT * from new_fees", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

app.get("/getTableData/:id", (req, res) => {
  connection.query(
    "SELECT * from new_fees where id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/enterTableData", (request, response) => {
  const { fee_name, fee_amount } = request.body;
  console.log("testing", request.body, fee_name);
  connection.query(
    "INSERT into new_fees(fee_name, amount) values(?, ?)",
    [fee_name, fee_amount],
    (err, rows, fields) => {
      if (!err) {
        response.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// End of Mysql Testing
