const express = require('express');
const router = express.Router();
lobbyModule = require('../game/lobby');

router.post('/', (req, res) => {
  if (lobbyModule.checkExisting(req.body.id)) {
    res.json({
      alreadyExists: true,
    })
    return;
  }
  lobby = lobbyModule.createLobby(req.body);
  res.json({
    alreadyExists: false
  })
});

module.exports = router;