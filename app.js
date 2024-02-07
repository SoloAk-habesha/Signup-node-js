const express = require("express");
const axios = require("axios");
const path = require("path");
const dotenv = require('dotenv').config();

const API_KEY = process.env.API_KEY; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const addData = {
      members: [
        {
          email_address: email,
          status: "pending", 
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          }
        }
      ]
    };

    const url = process.env.URL; 


    const response = await axios.post(url, addData, {
      headers: {
        Authorization: `auth ${API_KEY}`,
      },
    });

    res.sendFile(path.join(__dirname, "public", "success.html"));
  } catch (error) {
    res.sendFile(path.join(__dirname, "public", "failure.html"));
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
