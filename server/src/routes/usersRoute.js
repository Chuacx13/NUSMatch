const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('../config/authentication-nusmatch-firebase-adminsdk.json');
const userRouter = express.Router();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

userRouter.get('/users', async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const user = listUsersResult.users;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = userRouter;

