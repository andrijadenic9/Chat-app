let textareas = document.querySelectorAll('textarea');
let mainArea = document.querySelector('.main-area');
let area1 = document.querySelector('#player1-area');
let area2 = document.querySelector('#player2-area');
let currentPlayerName = '';
let chatName = '';
let directions = ['start', 'end'];
let borderRadius = ['left', 'right'];
let borders = ['#ff1177', '#228dff'];
let badWords = ["shit", "monster", 'pizza'];
let flexBool = true;

let inputPlayer1 = document.querySelector('[data-id="input-player1"]');
let inputPlayer2 = document.querySelector('[data-id="input-player2"]');
let playerName1 = document.querySelector('.player1');
let playerName2 = document.querySelector('.player2');

playerName1.style.display = 'none';
playerName2.style.display = 'none';

inputPlayer1.focus();

textareas.forEach(area => area.addEventListener('keyup', placeMessage));
inputPlayer1.addEventListener('keyup', setName1);
inputPlayer2.addEventListener('keyup', setName2);

// ? setting player 1 nickname
function setName1(e) {
    if (e) {
        if (e.key === 'Enter') {
            playerName1.innerHTML = this.value;
            playerName1.style.display = 'block';
            inputPlayer1.style.display = 'none';
            inputPlayer2.focus();
        }
    }
    return playerName1.innerHTML;
}

// ? setting player 2 nickname
function setName2(e) {
    if (e) {
        if (e.key === 'Enter') {
            playerName2.innerHTML = this.value;
            playerName2.style.display = 'block';
            inputPlayer2.style.display = 'none';
        }
    }
    return playerName2.innerHTML;
}

// ? displaying message
function placeMessage(e) {
    if (e.key === "Enter") {
        let message = this.value;

        // ? transforming bad words into has with regular expression
        badWords.forEach(word => {
            let gg = new RegExp(word, "gi");
            message = message.replace(gg, "*****");
        });

        let playerName = this.id.split('-')[0];
        let playerNameID = this.id.split('-')[0];

        // ? setting up players names
        if (playerName === 'player1') {
            playerName = setName1();
        } else if (playerName === 'player2') {
            playerName = setName2();
        }

        // ? setting boolean variable
        (playerNameID === 'player1') ? flexBool = false : flexBool = true;

        // ? checkih witch player typed message
        if (playerName !== currentPlayerName) {
            currentPlayerName = playerName;
            chatName = playerName;
        } else {
            chatName = '';
        }

        // ? showing message according on previuos varibles
        mainArea.innerHTML += `
        <div class="row" style="justify-content: ${directions[+flexBool]}">
        <div class="card">
        <p>${chatName}</p>
        <p style="border: 2px solid ${borders[+flexBool]}; border-top-${borderRadius[+flexBool]}-radius: 0px; margin-top: 5px;">${message}</p>
        </div>
        </div>
        `.trim();

        // ? when message area is too long for reading, set the lates message at the bottom of the message area
        mainArea.scrollTop = mainArea.scrollHeight;

        // ? clearing textarea when message is sent
        this.value = ""
    }
}