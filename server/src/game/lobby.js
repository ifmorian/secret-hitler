lobbies = [];

class Lobby {
  constructor(creatorName, id, pw) {
    this.creatorName = creatorName;
    this.id = id;
    this.pw = pw;
    this.players = []
  }
}

function getLobby(id) {
  for (let index in lobbies) {
    lobby = lobbies[index];
    if (lobby.id === id) {
      return lobby;
    }
  }
  return null;
}

function createLobby(data) {
  lobby = new Lobby(data.name, data.id, data.pw);
  lobbies.push(lobby);
  console.log(`New lobby ${lobby.id} was created`); //Might remove
  console.log(`Now hosting ${lobbies.length} lobbies`);
  return lobby;
}

function checkExisting(id) {
  if (getLobby(id) === null) return false;
  return true;
}

function joinLobby(id, pw, name) {
  lobby = getLobby(id);
  if (lobby === null) return 1;
  if (lobby.pw !== pw) return 2;
  if (lobby.players.includes(name)) return 3;
  lobby.players.push(name)
  return 0;
}

function getPlayers(id) {
  lobby = getLobby(id);
  if (lobby === null) return [];
  return lobby.players;
}

module.exports = {createLobby, checkExisting, joinLobby, getPlayers};