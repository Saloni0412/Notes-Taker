const express = require("express")
const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express();

// middleware to be used
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const htmlRouter = require("./routes/html");
const inputRouter = require("./routes/input");

//
app.use(htmlRouter);
app.use("/api", inputRouter)


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);