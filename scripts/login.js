const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password')
const formulario = document.getElementById("formulario")
let use = ''
let pw = ''
usernameInput.addEventListener('input', (e) => {
     use = e.target.value;
  
});
passwordInput.addEventListener('input', (e) => {
    pw = e.target.value;
   
  });


formulario.addEventListener("submit",(e)=>{
    e.preventDefault()
    fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        body: JSON.stringify({ username:use,password_username:pw }), 
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.data)
       if (data.message ==='Sesion iniciada'){
        localStorage.setItem("userData", JSON.stringify(data.data));
        window.location.href = "nueva_pagina.html"
    }
      })
      .catch(error => {
        console.log(error)
      });
})