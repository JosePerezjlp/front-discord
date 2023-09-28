const btnLogout = document.getElementById('btnLogout')

const botonesContainer = document.getElementById("botonesContainer");
botonesContainer.style.display = "none"
const textServ = document.getElementById('textServ');
textServ.style.display = "block"; 
const informacionContainer = document.getElementById("informacionContainer");
informacionContainer.style.display = "none";
const valor = localStorage.getItem('userData');
const objeto = JSON.parse(valor)
let id_user =objeto.id_user

  document.addEventListener("DOMContentLoaded", function() {
    const btnCrear = document.getElementById('btnCrear');
  const modal = document.getElementById('myModal');
  const closeModal = document.getElementById('closeModal');
      // Muestra el modal cuando se hace clic en el botón
  btnCrear.addEventListener('click', (e) =>{
    
    modal.style.display = 'block';
  });
  
  // Cierra el modal cuando se hace clic en el botón de cierre
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Cierra el modal si el usuario hace clic fuera de él
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
     fetch('http://127.0.0.1:5000/servers/data', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa aca');
      }
      return response.json();
    })
    .then((data) => {
      if(data.message === "funciona" && data.data.length > 0){
        textServ.style.display = "none";
        botonesContainer.style.display = "block";
      data.data.forEach((elemento) => {
      
        const boton = document.createElement("button");
        boton.textContent = elemento.creation_date;
        boton.setAttribute("data-id", elemento.description_server);
        
        boton.addEventListener("click", function() {
        
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
              const boton = document.createElement("button");
              boton.textContent = dat.chaneel_name;
              boton.setAttribute("data-id", dat.id_channel);
              informacionContainer.appendChild(boton)
              boton.addEventListener("click", function() {
        
                const id = this.getAttribute("data-id");
                
                fetch(`http://127.0.0.1:5000/messages/${id}`, {
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
                
                  })
                  .catch((error) => {
                    console.error('Error:', error);
                  
                  });
                
              
              });
             })
             informacionContainer.style.display = "flex"; 
             informacionContainer.style.flexDirection = "column"; 
             informacionContainer.style.right = "0";
            })
            .catch((error) => {
              console.error('Error:', error);
            
            });
          
        
        });
        botonesContainer.appendChild(boton)
      })
     
  
      
    }else{
      botonesContainer.style.display = "none";
      dataServ.textContent = 'Aún no te has unido a un servidor Intenta buscar uno o crea uno propio'
    }
  }
    )
    .catch((error) => {
      console.error('Error:', error);

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
 


