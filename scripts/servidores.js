const btnLogout = document.getElementById('btnLogout')
const agregarServ = document.getElementById("agregarServ");
const contenedorPadre = agregarServ.parentElement;
const botonesContainer = document.getElementById("botonesContainer");
const informacionContainer = document.getElementById("informacionContainer");
fetch('http://127.0.0.1:5000/auth/profile', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials:'include'
})
  .then((response) => {
    
    if (!response.ok) {
      throw new Error('La solicitud no fue exitosa');
      
    }
    return response.json();
  })
  .then((data) => {    
 
  })
  .catch((error) => {
    console.error('Error:', error);
    // resultadosContainer.innerHTML = 'Hubo un error al cargar los datos.';
  });
  document.addEventListener("DOMContentLoaded", function() {
     fetch('http://127.0.0.1:5000/servers/data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    })
    .then((data) => {

      data.data.forEach((elemento) => {
      
        const boton = document.createElement("button");
        boton.textContent = elemento.creation_date;
        boton.setAttribute("data-id", elemento.description_server);
        
        boton.addEventListener("click", function() {
          // Obtener el ID del botón cuando se hace clic
          const id = this.getAttribute("data-id");
          fetch(`http://127.0.0.1:5000/servers/get/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials:'include'
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
              }
              return response.json();
            })
            .then((data) => {
             console.log(data)
             data.data.forEach((dat)=>{
              informacionContainer.textContent = dat.chaneel_name;
             })
          
            })
            .catch((error) => {
              console.error('Error:', error);
              // resultadosContainer.innerHTML = 'Hubo un error al cargar los datos.';
            });
          
          // Aquí puedes realizar acciones adicionales con el ID
        });
        botonesContainer.appendChild(boton)
      });
  
      document.getElementById('dataFetch').textContent = 'hola';
    })
    .catch((error) => {
      console.error('Error:', error);
      // resultadosContainer.innerHTML = 'Hubo un error al cargar los datos.';
    });
  });

  

  btnLogout.addEventListener('click',(e)=>{
    e.preventDefault()
    fetch("http://127.0.0.1:5000/auth/logout", {
      method: "GET",   
      headers: {
          "Content-Type": "application/json"
      },
      credentials: 'include'
  })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          if (data.message === 'Sesion cerrada') {
              window.location.href = 'login.html'
          }
      })
      .catch(error => {
          console.log(error);
      });
  })
 


// Función para crear y agregar botones dinámicamente arriba de agregarServ
function agregarBoton(texto, informacion) {
  const boton = document.createElement("button");
  boton.textContent = texto;

  // Agregar un event listener al botón para mostrar la información
  boton.addEventListener("click", () => {
    informacionContainer.textContent = informacion;
  });

  // Insertar el botón antes de agregarServ
  botonesContainer.insertBefore(boton, agregarServ);
}