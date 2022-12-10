/* eslint-disable consistent-return */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-unresolved
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const { addGame } = require('../models/Game');
const {
  searchUser,
  getUserFriends,
  isFriend,
  addFriend,
  getUsersScore,
  addUser,
  getUser,
} = require('../models/Users');
const { authorize } = require('../utils/auths');

const router = express.Router();
const jwtSecret = 'ilovemygame!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // 24h
const saltRounds = 10;

router.post('/login', async (req, res) => {
  const { username } = req.body;
  const userPassword = req.body.password;

  const userFound = await getUser(username);
  // il faut que tu return un res.send pour que on ai un message
  // avant tu faisais juste un return undifined donc on voyait pas la difference entre le prog qui s'arrete ou qui continue
  if (!userFound) return res.sendStatus(404);
  const passwordMatch = await bcrypt.compare(userPassword, userFound.password);
  if (!passwordMatch) return res.sendStatus(400);

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    id: userFound.id_user,
    token,
  };
  return res.json(authenticatedUser);
});

router.post('/register', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const userPassword = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !userPassword) return res.sendStatus(400); // 400 Bad Request

  const userFound = await getUser(username);

  if (userFound) return res.sendStatus(400);
  const encryptedData = await bcrypt.hash(userPassword, saltRounds);
  await addUser(username, encryptedData);
  const userAdd = await getUser(username);

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    id: userAdd.id_user,
    token,
  };
  return res.json(authenticatedUser);
});

// add the user score
router.post('/addScore', authorize, async (req, res) => {
  const { user } = req.body;
  const { score } = req.body;

  if (user === undefined || score === undefined) res.sendStatus(400);

  await addGame(user, score);

  res.json('adding true');
});

router.get('/getUser', authorize, async (req, res) => {
  const user = await searchUser(req.query.pseudo);
  res.json(user);
});

router.get('/getUserFriends', authorize, async (req, res) => {
  const user = await getUserFriends(req.query.id);
  res.json(user);
});

router.post('/addFriend', authorize, async (req, res) => {
  const user1 = parseInt(req.body.user1, 10);
  const user2 = parseInt(req.body.user2, 10);

  if (await isFriend(user1, user2)) return res.sendStatus(400);
  if (user1 === user2) return res.sendStatus(404);

  await addFriend(user1, user2);

  res.json('true');
});

// afficher la table des meilleurs scores
router.get('/getUsersScore', authorize, async (req, res) => {
  const user = await getUsersScore();
  res.json(user);
});


module.exports = router;
