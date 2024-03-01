let adress = getCookie('ip');
const dropbox = document.getElementById("bdropbox");

const apiUrl = `http://${adress}/mqttdevices`;

await getData();

async function getData() {

    if (adress) {
        axios.get(apiUrl)
        .then(function (response) {
            const data = response.data;
            for (let i = 0; i < data.length; i++) {
                const option = document.createElement("option");
                option.text = data[i].value;
                option.value = data[i].value;
                dropbox.add(option);
            }
        })
        .catch(function (error) {
            console.log('Erro ao buscar dados da API:', error);
        });
    }
    else {
        console.log('IP não encontrado');
    }    
}

dropbox.addEventListener("change", function() {
    const valorSelecionado = dropbox.value;
    
    localStorage.setItem("deviceSelecionado", valorSelecionado);
});

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