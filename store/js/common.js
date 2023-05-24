
//Funcion de carga de usuario. En caso de ser ""  lo redireciona a index
function Load(){
    // comprobamos si la variable de session contiene el usuario, si no es así debemos enviarle de nuevo al index porque no está logueado.
    var user = sessionStorage.getItem("USER");
  user="USER1";
    if (user=='' || user==null){
        window.location.replace('index.html');
    }


    const htmluser = "<a href='profile.html?"+user+"' id='nombreusuario'>"+user+"</a>";
    document.getElementById("nombreusuario").href="profile.html?"+user;
    document.getElementById("nombreusuario").innerHTML=user;
   
    if(window.location.href.includes("miseventos.html"))
    {
        var today = moment("01/01/00").format('YYYY/MM/DD');
        GetEvents(1,today,user);
    }else{
        if(window.location.href.includes("registradoeventos.html"))
        {
            var today = moment("01/01/00").format('YYYY/MM/DD');
            GetEvents(2,today,user);
        }else{
            if(window.location.href.includes("eventos.html"))
            {
                var today = moment().format('YYYY/MM/DD');
                GetEvents(0,today,user);
            }
        }
    }
}

  
function checkrequiredField(namefield) {
    // se comprueba que el campo requerido tenga valor, si no es así mostramos un mensaje de error.    
    const fieldText = document.getElementById(namefield).value;
    const errorText = document.getElementById('error_'+namefield);

    if (fieldText != '') {
        errorText.classList.add('d-none');  // Oculta el mensaje de error
    } else {
        errorText.classList.remove('d-none');  // Muestra el mensaje de error
    }
}

async function GetEvents(tipo, fecha,user) {
    try {         
        // Realizar la llamada a la API para obtener los datos        
        const url = `https://apievent.azurewebsites.net/api/GetEvents?fecha=${encodeURIComponent(fecha)}&tipo=${encodeURIComponent(tipo)}&user=${encodeURIComponent(user)}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            
        });

        // Manejar la respuesta de la API
        if (response.ok) {            
            const datos = await response.json();
            console.log("Inicio bucle");
            console.log(datos);
            datos.forEach(data => {
                var imagen="default.jpg";
                if(data.imagenes.length>0){
                    imagen=data.imagenes[0].rutaImagen;
                }
                const html = "<!-- TARJETA EVENTO -->"+
                "<div class='col-lg-4 col-md-6 col-sm-12'>"+
                "	<div class='card mb-4' transparente>"+
                "		<a href='verevento.html?"+data.id+"'>"+
                "			<img src='https://imagenesevent.blob.core.windows.net/event/"+imagen+"' class='card-img-top' alt='"+data.nombre+"'>"+
                "		</a>"+
                "		<div class='card-body'>"+
                "			<a href='verevento.html?"+data.id+"'>"+
                "				<h5 class='card-title'>"+data.nombre+"</h5>"+
                "			</a>"+
                "			<p class='card-text'>"+
                "				"+data.descripcion+
                "			</p>"+
                "			<p class='card-text'>"+data.fechaEvento+"'</p>"+
                "			<button class='btn btn-primary'>Apuntarse</button>"+
                "		</div>"+
                "	</div>"+
                "</div>"+
                "<!-- FIN TARJETA EVENTO -->";

                document.getElementById("tarjetasevento").innerHTML+=html;
            });
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Error en la solicitud. Por favor, intenta nuevamente.');
    }

}