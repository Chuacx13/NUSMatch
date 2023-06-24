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
    const userList = listUsersResult.users;
    res.json(userList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

userRouter.get('/emails', async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const userList = listUsersResult.users;
    const userEmails = []
    userList.forEach((user) => userEmails.push(user.email));
    res.json(userEmails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = userRouter;

