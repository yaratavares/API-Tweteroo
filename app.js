import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const userLogin = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  userLogin.push(req.body);
  res.sendStatus(201);
});

app.post("/tweets", (req, res) => {
  let tweet = req.body;
  tweet = { ...tweet, username: "yara" };
  res.sendStatus(201);
});

app.get("/tweets", (req, res) => {
  const idPage = req.query["page"];
  tweets.push(idPage);
  res.send(tweets);
});

app.listen(5000, () => {
  console.log("Rodando na porta http://localhost:5000");
});
