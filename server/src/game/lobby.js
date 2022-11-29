lobbies = [];

class Lobby {
  constructor(creatorName, id, pw) {
    this.creatorName = creatorName;
    this.id = id;
    this.pw = pw;
    this.players = []
  }
}

function createLobby(data) {
  lobby = new Lobby(data.name, data.id, data.pw);
  lobbies.push(lobby);
  console.log(`New lobby ${lobby.id} was created`); //Might remove
  console.log(`Now hosting ${lobbies.length} lobbies`);
  return lobby;
}

function checkExisting(id) {
  for (index in lobbies) {
    if (lobbies[index].id === id) {
      return true;
    }
  }
  return false;
}

function joinLobby(id, pw, name) {
  for (index in lobbies) {
    lobby = lobbies[index];
    if (lobby.id === id) {
      if (lobby.pw !== pw) return 2;
      if (lobby.players.includes(name)) return 3;
      lobby.players.push(name)
      return 0;
    }
  }
  return 1;
}

module.exports = {createLobby, checkExisting, joinLobby};