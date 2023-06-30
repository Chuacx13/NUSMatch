require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/usersRoute.js');
const profileRouter = require('./routes/profilesRoute.js');
const groupRouter = require('./routes/groupsRoute.js');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', userRouter);
app.use('/profile', profileRouter);
app.use('/group', groupRouter);

mongoose.connect( process.env.MONGODB_API_KEY );

app.listen(3001, () => console.log('Server started'));
