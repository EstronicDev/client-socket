const logoutButton = document.getElementById('logout');
const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const device = localStorage.getItem("deviceSelecionado")
let ip = getCookie('ip');

document.getElementById('username_value').textContent = username;
document.getElementById('device_value').textContent = device;
document.getElementById('server_value').textContent = ip;

console.log("IP server: ", ip);
const socket = io(ip);

socket.on('message', async (data) => {console.log(data);});

socket.emit('select_device', { username, device });

socket.on('mqtt_message', async (data) => {

    console.log(data);
    const acoesString = JSON.stringify(data.acoes);
    const propString = JSON.stringify(data.propriedades);

    const messagesElement = document.getElementById('messages');

    const newMessageElement = document.createElement('div');
    newMessageElement.classList.add('new_message');

    const messageContentElement = document.createElement('span');
    messageContentElement.textContent = `name: ${data.tipo}, ações: ${acoesString}, propriedades: ${propString}, endpoint: ${data.endpoint}`;
    messageContentElement.classList.add('message_content');

    newMessageElement.appendChild(messageContentElement);
    messagesElement.appendChild(newMessageElement);


});

logoutButton.addEventListener('click', () => {
    window.location.href = 'index.html';
    localStorage.clear();
});

document.addEventListener('DOMContentLoaded', function () {
    const clearMessagesButton = document.getElementById('clearMessages');
    const messagesElement = document.getElementById('messages');

    clearMessagesButton.addEventListener('click', function () {
        messagesElement.innerHTML = '';
    });
});

// Cookies
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

