const express = require('express');
const User = require('../models/User');
const auth = require('../midlware/auth');
const update = require('../midlware/update');

const router = express.Router();

router.post('/users', async (req, res) => {
  try {
    console.log(`Body: ${req.body}`);
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

router.put('/users/me', update, function (req, res) {
  res.send(req.user.data);
});

router.post('/users/me/logout', auth, async (req, res) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/users/me/logoutall', auth, async (req, res) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
