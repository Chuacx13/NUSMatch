const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./config/authentication-nusmatch-firebase-adminsdk.json');
const cors = require('cors');
const app = express();


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(cors());

app.get('/getUsers', async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const userEmails = listUsersResult.users;
    res.json(userEmails);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user emails' });
  }
});

const port = 3001; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



