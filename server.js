const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

const getCities = async () => {
  try {
    const res = await fetch("http://localhost:5001/city");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return "error";
  }
};

const getAdjectives = async () => {
  try {
    const res = await fetch("http://localhost:5002/adjective");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return "error";
  }
};

app.get("/", async (req, res) => {
  let city;
  let adjective;
  city = await getCities();
  adjective = await getAdjectives();
  if (city === "error" || adjective === "error") {
    return res.status(500).json("Something went wrong");
  }
  res.status(200).json(`${city} is ${adjective}`);
});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
