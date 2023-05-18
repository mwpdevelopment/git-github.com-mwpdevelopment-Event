
//Funcion de carga de usuario. En caso de ser ""  lo redireciona a index
function Load(){
    const cookies = document.cookie.split('; ');
        let name = '';
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split('=');
            if (cookie[0] === 'EVENTUSER') {
                name = cookie[1];
                break;
            }
        }
        
        var user = encodeURIComponent(name);
        if (user==''){
            window.location.replace('index.html');
        }
}

function checkrequiredField(namefield) {
    const fieldText = document.getElementById(namefield).value;
    const errorText = document.getElementById('error_'+namefield);

    if (fieldText != '') {
        errorText.classList.add('d-none');  // Oculta el mensaje de error
    } else {
        errorText.classList.remove('d-none');  // Muestra el mensaje de error
    }
}