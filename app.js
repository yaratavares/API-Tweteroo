import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

var userLogin = {};
const tweets = [];

app.post("/sign-up", (req, res) => {
  const regexImg = /(https?:\/\/.*\.(?:png|jpg))/i;
  const insertUsername = req.body.username;
  const insertAvatar = req.body.avatar;

  if (insertUsername.length === 0 || insertAvatar.length === 0) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else if (!regexImg.test(insertAvatar)) {
    res.status(400).send("Formato de imagem não compatível!");
  } else {
    userLogin = {
      username: insertUsername,
      avatar: insertAvatar,
    };
    console.log(userLogin);
    res.sendStatus(201);
  }
});

app.post("/tweets", (req, res) => {
  const headerTweet = req.headers;
  let tweetObject = req.body;

  if (headerTweet.user.length === 0 || tweetObject.tweet.length === 0) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    tweetObject = {
      ...tweetObject,
      username: headerTweet.user,
      avatar: userLogin.avatar,
    };
    tweets.unshift(tweetObject);
    res.sendStatus(201);
  }
});

app.get("/tweets/:userName", (req, res) => {
  const userName = req.params.userName;
  const filterTweets = tweets.filter((tweet) => tweet.username === userName);
  res.send(filterTweets);
});

app.get("/tweets", (req, res) => {
  const idPage = parseInt(req.query["page"]);
  const numberTweets = 10;
  const endTweets = numberTweets * idPage;

  if (idPage >= 1) {
    const tweetsForPage = tweets.slice(endTweets - numberTweets, endTweets);
    res.send(tweetsForPage);
  } else {
    res.status(400).send("Informe uma página válida!");
  }
});

app.listen(5000, () => {
  console.log("Rodando na porta http://localhost:5000");
});
