const path = require("path");
const express = require('express');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");

console.log("__dirname: ", __dirname);
app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  methodOverride((request, response) => {
    if (request.body && request.body._method) {
      const method = request.body._method;
      return method;
    }
  })
);

const cohortsRouter = require("./routes/cohortsRouter");
app.use("/cohorts", cohortsRouter);

app.get("/", (req,res)=>{
  res.render("welcome")
})

const PORT = 3000;
const ADDRESS = "localhost"; // 127.0.0.1
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on http://${ADDRESS}:${PORT}`);
});