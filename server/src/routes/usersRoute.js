const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_KEY);
const userRouter = express.Router();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//GOOD
//Check whether email is verified
userRouter.get('/:email', async (req, res) => {
  try {
    const response = (await admin.auth().getUserByEmail(req.params.email)).emailVerified;
    res.json(response);
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      res.status(404).json({ error: 'auth/user-not-found' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

//GOOD
//Check if users are registered
userRouter.get('/users/:emails', async (req, res) => {
  try {
    let isUserInDatabase = true; 
    const listUsersResult = await admin.auth().listUsers();
    const userList = listUsersResult.users;
    const userEmailList = userList.map((user) => user.email);
    const emailList = req.params.emails.split(',');
    for (const member of emailList) {
      if (userEmailList.includes(member)) {
        continue;
      } else {
        isUserInDatabase = false;
        break;
      }
    };
    res.json(isUserInDatabase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = userRouter;

