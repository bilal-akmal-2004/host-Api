const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const connectDB = require("./db");
const users = require("./routes/users");
// connect Db
connectDB();
//body parser
app.use(express.json());

// user routes here of user
app.use("/api", users);

app.get("/", (req, res) => {
  res.send("Yellp!");
});

app.listen(PORT, () => {
  console.log(`The port is up and running on ${PORT}`);
});
