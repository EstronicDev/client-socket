const urlSearch = new URLSearchParams(window.location.search);
const submitCookie = document.getElementById('subcookie');

submitCookie.addEventListener('click', () => {

    const popupElement = document.getElementById('popup');
    const ip = document.getElementById("server-ip");

    if (ip.value) {
        setCookie('ip', ip.value, 1);
        window.location.href = 'index.html';
    } else {
        popupElement.innerText = "Por favor, preencha o campo IP antes de salvar.";
        popupElement.style.display = "block";
        setTimeout(() => {
            popupElement.style.display = "none";
        }, 3000);
    }
    
});

// Set cookies
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}