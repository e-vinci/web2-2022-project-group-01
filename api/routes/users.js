/* eslint-disable consistent-return */
/* eslint-disable no-console */
const express = require('express');
const { addGame } = require('../models/Game');
const { getUsers, getUserFriends, isFriend, addFriend, getUsersScore } = require('../models/Users');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ users: [{ name: 'e-baron' }] });
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
  const user= getUsers(req.query.pseudo)
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
