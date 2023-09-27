
const formulario = document.getElementById("formulario")



formulario.addEventListener("submit",(e)=>{
    e.preventDefault()
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value
    let mensajeErrorElement = document.getElementById('mensajeErrorLg');
    fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        body: JSON.stringify({ username:usernameInput,password_username:passwordInput }), 
        headers: {
          "Content-Type": "application/json"
        },
        credentials:'include'
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.message === "Usuario o contraseña incorrectos"){
          mensajeErrorElement.textContent = 'Usuario o contraseña incorrectos'
        }
       if (data.message ==='Sesion iniciada'){
        localStorage.setItem("userData", JSON.stringify(data.data));
        window.location.href = "http://127.0.0.1:5500/template/profile.html"
    }
      })
      .catch(error => {
        console.log(error)
      });
})