
const btnMostrarModal = document.getElementById('mostrarModal');
const modal = document.getElementById('miModal');
const btnCerrarModal = document.getElementById('cerrarModal');
const passwordForm = document.getElementById('passwordForm');
const mensajeError = document.getElementById('mensajeError');
const formUpdate = document.getElementById('formUpdate')

   
let pw = ''

btnMostrarModal.addEventListener('click', () => {
    modal.style.display = 'block';
});

btnCerrarModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (evento) => {
    if (evento.target === modal) {
        modal.style.display = 'none';
    }
});

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
    console.log(data)
    document.getElementById('email').value = data.email;
    document.getElementById('country').value = data.country;
    document.getElementById('phone').value = data.phone;
    document.getElementById('birthdate').value = data.birthdate;
    pw = data.password_username;
 
  })
  .catch((error) => {
    console.error('Error:', error);
    // resultadosContainer.innerHTML = 'Hubo un error al cargar los datos.';
  });
formUpdate.addEventListener("submit",(e)=>{
    e.preventDefault()
    newEmail = document.getElementById('email').value
    newCountry = document.getElementById('country').value
    newPhone = document.getElementById('phone').value
    newBirthdate = document.getElementById('birthdate').value
            fetch("http://127.0.0.1:5000/auth/profile", {
        method: "PUT",
        body: JSON.stringify({ email:newEmail,country:newCountry,phone:newPhone,birthdate:newBirthdate }), 
        headers: {
          "Content-Type": "application/json"
        },
        credentials:'include'
      })
      .then(response => response.json())
      .then(data => {
        window.location.reload()     
      })
      .catch(error => {
        console.log(error)
      });
})  
passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let password = document.getElementById('password').value.toLowerCase();
  let password1 = document.getElementById('passwordNew').value.toLowerCase();
  let password2 = document.getElementById('passwordConfirm').value.toLowerCase();
  const pwIncorrectElement = document.getElementById('pwIncorrect');
  const mensajeErrorElement = document.getElementById('mensajeError');
  const pwChangeElement = document.getElementById('pwChange');

  if (password !== pw) {
      pwIncorrectElement.textContent = 'Contraseña incorrecta';
      mensajeErrorElement.textContent = '';
      pwChangeElement.textContent = '';
  } else if (password1 !== password2) {
      pwIncorrectElement.textContent = '';
      mensajeErrorElement.textContent = 'Las contraseñas no coinciden';
      pwChangeElement.textContent = '';
  } else {
      pwIncorrectElement.textContent = '';
      mensajeErrorElement.textContent = '';
      
      fetch("http://127.0.0.1:5000/auth/profile", {
          method: "PUT",
          body: JSON.stringify({ password_username: password1 }),
          headers: {
              "Content-Type": "application/json"
          },
          credentials: 'include'
      })
          .then(response => response.json())
          .then(data => {
              console.log(data);
              if (data.message === 'Los datos del usuario riki fueron modificados con exito') {
                  pwChangeElement.textContent = 'Contraseña cambiada con éxito!';
              }
          })
          .catch(error => {
              console.log(error);
          });
  }
});