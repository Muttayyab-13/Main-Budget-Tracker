const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');
const port = 3001;
app.use(express.json());
app.use(cors());
const User = require("./models/userSchema.js");

app.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
});

// app.get("/api/products", async (req, res) => {
//   const prods = await Product.find({}); //{} > finds everything inthe database
//   res.status(200).json(prods);
//   //Retrieving the data from dataBase
// });

// app.get("/api/product/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const prod = await Product.findById(id);
//     res.status(200).json(prod);
//   } catch (error) {
//     res.status(500).json({ message: ErrorEvent.message });
//   }
// });

mongoose
  .connect(
    "mongodb+srv://admin:MuttayyabAbd1@cluster0.bsbj6.mongodb.net/Budget?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to the DataBase");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
