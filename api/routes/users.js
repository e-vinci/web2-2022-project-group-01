/* eslint-disable no-console */
const express = require('express');
const { addGame } = require('../models/Game');

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


module.exports = router;
