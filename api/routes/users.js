/* eslint-disable consistent-return */
/* eslint-disable no-console */
const jwt = require('jsonwebtoken')
const express = require('express');
const { addGame } = require('../models/Game');
const { searchUser, getUserFriends, isFriend, addFriend, getUsersScore, addUser ,getUser, getUsersTest} = require('../models/Users');
const { authorize} = require('../utils/auths');

const router = express.Router();
const jwtSecret = 'ilovemygame!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // 24h

/* GET users listing. */
router.get('/', async (req, res) => {
  const test = await getUsersTest();
  console.log(test);
  res.json({ users: [{ name: 'e-baron' }] });
});

router.post('/login',  (req, res) => {
  const {username} = req.body;
  const userPassword = req.body.password;

  const userFound =  getUser(username);

  // il faut que tu return un res.send pour que on ai un message
  // avant tu faisais juste un return undifined donc on voyait pas la difference entre le prog qui s'arrete ou qui continue
  if(!userFound) return res.send('aucun user sous ce nom');
  if(userFound.password !== userPassword) return res.send('mauvais mdp');
  
  const token = jwt.sign(
    {username }, // session data added to the payload (payload : part 2 of a JWT)
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

router.post('/register', (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const userPassword = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  
  if (!username || !userPassword) return res.sendStatus(400); // 400 Bad Request
  
  const userFound =  getUser(username);
  // il faut que tu return un res.send pour que on ai un message
  // avant tu faisais juste un return undifined donc on voyait pas la difference entre le prog qui s'arrete ou qui continue
  if (userFound) return res.send('il y a deja un user avec ce pseudo');

  addUser(username,userPassword);
  const userAdd =  getUser(username);

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
router.post('/addScore', authorize, (req, res) => {
  const {user} = req.body;
  const {score}=req.body;

  if(user===undefined || score === undefined)res.sendStatus(400);

  addGame(user,score);

  res.json('adding true');
});

router.get('/getUser',authorize, (req, res) => {
  const user= searchUser(req.query.pseudo)
  res.json(user);
});

router.get('/getUserFriends',authorize, (req, res) => {
  const user= getUserFriends(req.query.id)
  res.json(user);
});

router.post('/addFriend',authorize, (req, res) => {
  const user1 = parseInt(req.body.user1,10)
  const user2= parseInt(req.body.user2,10)

  if(isFriend(user1,user2)) return res.send("deja amis");
  if(user1===user2) return res.send("pas possible d'ajouter en amis la meme personne")

  addFriend(user1,user2);

  res.json('true');
});

// afficher la table des meilleurs scores
router.get('/getUsersScore', authorize,(req, res) => {
  const user = getUsersScore();
  res.json(user);
});

module.exports = router;
