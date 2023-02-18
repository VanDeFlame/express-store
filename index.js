const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");

const errorHandlers = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/* CORS */
const whitelist = ['http://localhost:8080', 'http://127.0.0.1:5550', undefined]
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Petition Origin not allowed'))
    }
  }
}

app.use(cors(options))
require('./utils/auth');

app.get("/", (req, res) => {
  res.send("Hello, this is my Express Server");
});

routerApi(app);

app.use(errorHandlers.logErrors);
app.use(errorHandlers.ormErrorHandler);
app.use(errorHandlers.boomErrorHandler);
app.use(errorHandlers.errorHandler);

app.listen(port, () =>{
  console.log("My port: " + port);
});
