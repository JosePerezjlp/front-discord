fetch('http://127.0.0.1:5000/servers/data', {
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
    document.getElementById('dataFetch').textContent = 'hola'
    
 
  })
  .catch((error) => {
    console.error('Error:', error);
    // resultadosContainer.innerHTML = 'Hubo un error al cargar los datos.';
  });