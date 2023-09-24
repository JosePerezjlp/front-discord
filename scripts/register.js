const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Obtén los valores de los inputs
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    const country = document.getElementById("country").value;
    const phone = document.getElementById("phone").value;
    const birthdate = document.getElementById("birthdate").value;

    fetch("http://127.0.0.1:5000/app/register", {
        method: "POST",
        body: JSON.stringify({ 
        username: username,
        password_username:password,
        email:email,
        country:country,
        phone:phone,
        birthdate: birthdate
     }), 
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.message === 'Cuenta creada con exito'){
            window.location.href = 'http://127.0.0.1:5500/template/profile.html'
        }
  
      })
      .catch(error => {
        console.log(error)
      });

});