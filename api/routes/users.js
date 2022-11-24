/* eslint-disable no-console */
const express = require('express');
const { getUsers } = require('../models/Users');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  console.log(getUsers())
  res.json({ users: [{ name: 'e-baron' }] });
});

module.exports = router;
