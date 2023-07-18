const { Server } = require('socket.io');
const MessageModel = require('./models/Messages.js');
const ProfileModel = require('./models/Profiles.js')

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://nusmatch.onrender.com'],
      methods: ['GET', 'POST', 'PUT'],
    },
  });

  io.on('connection', (socket) => {

    socket.on('join-chat', async (data) => {
      socket.join(data);
      const messages = await MessageModel.find({ groupId: data });
      socket.emit('chat-history', messages);
    });

    socket.on('send-message', async (data) => {
      try {
        const { groupId, content, creatorEmail, time } = data;
        const profile = await ProfileModel.findOne({ email: creatorEmail });
        const name = profile.name;
        const message = new MessageModel({ groupId, content, creatorEmail, creatorName: name, time });
        const response = await message.save();
        io.to(groupId).emit('receive-message', response);
      } catch (err) {
        console.error(err);
      }
    });

    socket.on('disconnect', () => {
      socket.leaveAll();
    });
  });
};

module.exports = initializeSocket;
