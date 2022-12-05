/* eslint-disable consistent-return */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken')
const express = require('express');
const { addGame } = require('../models/Game');
const { searchUser, getUserFriends, isFriend, addFriend, getUsersScore, addUser ,getUser} = require('../models/Users');
const { authorize} = require('../utils/auths');
const bcrypt = require('bcrypt');

const router = express.Router();
const jwtSecret = 'ilovemygame!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // 24h
const saltRounds = 10;

/* GET users listing. */
router.get('/', authorize,(req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
});

router.post('/login', async (req, res) => {
  const userUsername = req.body.username;
  const userPassword = req.body.password;

  const userFound = await getUser(userUsername);

  // il faut que tu return un res.send pour que on ai un message
  // avant tu faisais juste un return undifined donc on voyait pas la difference entre le prog qui s'arrete ou qui continue
  if(!userFound) return res.send('aucun user sous ce nom');
  const passwordMatch = await bcrypt.compare(userPassword, userFound.password);
  if(!passwordMatch) return res.sendStatus(400)
  
  const token = jwt.sign(
    { userUsername }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
   );

  const authenticatedUser = {
    userUsername,
    token,
  };
 return res.json(authenticatedUser);

});

router.post('/register', async (req, res) => {
  const userUsername = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const userPassword = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  
  if (!userUsername || !userPassword) return res.sendStatus(400); // 400 Bad Request
  
  const userFound = await getUser(userUsername);
  // il faut que tu return un res.send pour que on ai un message
  // avant tu faisais juste un return undifined donc on voyait pas la difference entre le prog qui s'arrete ou qui continue
  if (userFound) return res.send('il y a deja un user avec ce pseudo');
  const encryptedData = await bcrypt.hash(userPassword, saltRounds);
 await addUser(userUsername,encryptedData);

  const token = jwt.sign(
    { userUsername }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    userUsername,
    token,
  };
 return res.json(authenticatedUser);

});

// add the user score
// faire le authorized pour connecter
router.post('/addScore',  (req, res) => {
  const {user} = req.body;
  const {score}=req.body;

  if(user===undefined || score === undefined)res.sendStatus(400);

  addGame(user,score);

  res.json('adding true');
});

// faire le authorized pour connecter
router.get('/getUser', (req, res) => {
  const user= searchUser(req.query.pseudo)
  res.json(user);
});

// faire le authorized pour connecter
router.get('/getUserFriends', (req, res) => {
  const user= getUserFriends(req.query.id)
  res.json(user);
});

// faire le authorized pour connecter
router.post('/addFriend', (req, res) => {
  const user1 = parseInt(req.body.user1,10)
  const user2= parseInt(req.body.user2,10)

  if(isFriend(user1,user2)) return res.send("deja amis");
  if(user1===user2) return res.send("pas possible d'ajouter en amis la meme personne")

  addFriend(user1,user2);

  res.json('true');
});

// afficher la table des meilleurs scores
router.get('/getUsersScore', (req, res) => {
  const user = getUsersScore();
  res.json(user);
});

module.exports = router;
