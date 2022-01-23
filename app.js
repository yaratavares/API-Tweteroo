import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());

const userLogin = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const regexImg = /(https?:\/\/.*\.(?:png|jpg))/i;
  const insertUsername = req.body.username;
  const insertAvatar = req.body.avatar;

  if (insertUsername.length === 0 || insertAvatar.length === 0) {
    res.sendStatus(400);
  } else if (!regexImg.test(insertAvatar)) {
    res.sendStatus(400);
  } else {
    userLogin.push(req.body);
    res.sendStatus(201);
  }
});

app.post("/tweets", (req, res) => {
  const headerTweet = req.headers;
  const avatarUser = userLogin.filter(
    (user) => user.username === headerTweet.user
  );
  let tweet = req.body;
  tweet = {
    ...tweet,
    username: avatarUser[0].username,
    avatar: avatarUser[0].avatar,
  };
  tweets.unshift(tweet);
  res.sendStatus(201);
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
    res.send("Informe uma página válida!").status(400);
  }
});

app.listen(5000, () => {
  console.log("Rodando na porta http://localhost:5000");
});
