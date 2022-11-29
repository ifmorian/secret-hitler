import { io } from 'socket.io-client';
const socket = io('http://localhost:3001');

socket.on('connect', () => {
  console.log(`You\'re connected with id ${socket.id}`)
});

const joinPlayerNameField = document.querySelector('.join-name');
const joinPlayerNameError = document.querySelector('.join-name-error');

const joinIdField = document.querySelector('.join-id');
const joinIdError = document.querySelector('.join-id-error');

const joinPwField = document.querySelector('.join-pw');
const joinPwError = document.querySelector('.join-pw-error');

const createPlayerNameField = document.querySelector('.create-name');
const createPlayerNameError = document.querySelector('.create-name-error');

const createIdField = document.querySelector('.create-id');
const createIdError = document.querySelector('.create-id-error');

const createPwField = document.querySelector('.create-pw');
const createPwError = document.querySelector('.create-pw-error');

function joinError(error) {
  switch(error) {
    case 1:
      joinIdError.classList.add('input-error');
      joinIdError.textContent = 'Lobby doesn\'t exist';
      joinIdError.style.display = 'block';
      break;
    case 2:
      joinPwError.classList.add('input-error');
      joinPwError.textContent = 'Wrong password';
      joinPwError.style.display = 'block';
      break;
    case 3:
      joinPlayerNameError.classList.add('input-error');
      joinPlayerNameError.textContent = 'Name already exists';
      joinPlayerNameError.style.display = 'block';
      break;
  }
}

document.querySelector('.join').addEventListener('submit', e => {
  e.preventDefault();
  
  let playerName = checkInput(joinPlayerNameField, joinPlayerNameError)
  let id = checkInput(joinIdField, joinIdError)
  let pw = checkInput(joinPwField, joinPwError)

  if (!(playerName && id && pw)) return;

  socket.emit('join-lobby', id, pw, playerName, joinError);
  renderGame(id);
})

document.querySelector('.create').addEventListener('submit', async (e) => {
  e.preventDefault();

  let playerName = checkInput(createPlayerNameField, createPlayerNameError)
  let id = checkInput(createIdField, createIdError)
  let pw = checkInput(createPwField, createPwError)

  if (!(playerName && id && pw)) return;

  await fetch('http://localhost:3000/create', {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({
      name: playerName,
      id: id,
      pw: pw
    })
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  })
  .then(data => {
    if (data.alreadyExists) {
      createIdField.classList.add('input-error');
      createIdError.textContent = 'Lobby already exists';
      createIdError.style.display = 'block';
      return;
    }
    socket.emit('join-lobby', id, pw, playerName, joinError);
    renderGame(id);
  })
  .catch(error => {
    console.error(error);
  })
});

joinPlayerNameField.addEventListener('input', () => {
  joinPlayerNameField.classList.remove('input-error');
  joinPlayerNameError.style.display = 'none';
});
joinIdField.addEventListener('input', () => {
  joinIdField.classList.remove('input-error');
  joinIdError.style.display = 'none';
});
joinPwField.addEventListener('input', () => {
  joinPwField.classList.remove('input-error');
  joinPwError.style.display = 'none';
});

createPlayerNameField.addEventListener('input', () => {
  createPlayerNameField.classList.remove('input-error');
  createPlayerNameError.style.display = 'none';
});
createIdField.addEventListener('input', () => {
  createIdField.classList.remove('input-error');
  createIdError.style.display = 'none';
});
createPwField.addEventListener('input', () => {
  createPwField.classList.remove('input-error');
  createPwError.style.display = 'none';
});

function checkInput(field, error) {
  if (field.value == '') {
    field.classList.add('input-error');
    error.style.display = 'block';
    error.textContent = 'Can\'t be emtpy'
    return false;
  }
  return field.value;
}

const playersEl = document.querySelector('.players');
async function renderGame(id) {
  socket.emit('get-players', id, (players) => {
    playersEl.innerHTML = '';
    for (let i in players) {
      playersEl.innerHTML += '<div class="player">' + players[i] + '</div>';
    }
  });
}