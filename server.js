const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = 5000;
const url = "http://172.17.0.1";

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const getCities = async () => {
  try {
    const res = await fetch(`${url}:5001/city`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return "error";
  }
};

const getAdjectives = async () => {
  try {
    const res = await fetch(`${url}:5002/adjective`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return "error";
  }
};

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/sentence", async (req, res) => {
  let city;
  let adjective;
  city = await getCities();
  adjective = await getAdjectives();
  if (city === "error" || adjective === "error") {
    return res.status(500).json("Something went wrong");
  }
  res.status(200).json(`${city} is ${adjective}`);
});

app.listen(PORT);
