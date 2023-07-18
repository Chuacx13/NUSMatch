require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const initializeSocket = require('./socket.js');
const userRouter = require('./routes/usersRoute.js');
const profileRouter = require('./routes/profilesRoute.js');
const groupRouter = require('./routes/groupsRoute.js');
const scheduleRouter = require('./routes/schedulesRoute.js');
const messageRouter = require('./routes/messagesRoute.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', userRouter);
app.use('/profile', profileRouter);
app.use('/group', groupRouter);
app.use('/schedule', scheduleRouter);
app.use('/message', messageRouter);

mongoose.connect( process.env.MONGODB_API_KEY );

const server = http.createServer(app);

initializeSocket(server);

const port = process.env.PORT || 3001
server.listen(port, () => console.log('Server started'));
