const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json());

/* CORS */
const whitelist = ['http://localhost:8080', 'http://127.0.0.1:5550']
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

app.get("/", (req, res) => {
  res.send("Hello, this is my Express Server");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () =>{
  console.log("My port: " + port);
});
