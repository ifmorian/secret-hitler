const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const io = require('socket.io')(3001, {
  cors: {
    origin: [
      'http://localhost:8080'
    ]
  }
});

lobbyModule = require('./game/lobby');

io.on('connection', socket => {
  socket.on('join-lobby', (id, pw, name, cb) => {
    error = lobbyModule.joinLobby(id, pw, name)
    if (error !== 0) {
      cb(error);
      return;
    }
    socket.join(id);
  })
});

app.use(cors())
app.use(express.json())

const createRouter = require('./routes/create.js');
app.use('/create', createRouter);

app.listen(port, () => {
  console.log('App is running on port ' + port)
})