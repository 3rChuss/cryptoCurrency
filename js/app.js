const cotizador = new API('0f75e83e517abb1e8d83bf1d613983e38691c730faeae9a30a060fe4dec02c24')
const ui = new Interfaz();
cotizador.obtenerMonedasAPI();

//LLER EL FORMULARIO
const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', (e) => {
     e.preventDefault();
     //leer la moneda seleccionada
     const monedaSelect = document.querySelector('#moneda');
     const moneda = monedaSelect.options[monedaSelect.selectedIndex].value;
     //leer la cryptomodena seleccionada
     const cryptoSelect = document.querySelector('#criptomoneda');
     const crypto = cryptoSelect.options[cryptoSelect.selectedIndex].value;
     //comprobar que los selects tengan algo seleccionado
     if(moneda === '' || crypto === '') {
         //mostrar error
          ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
     }else{
          //consultar la api
          cotizador.obtenerValores(moneda, crypto)
               .then(data => {                    
                    ui.mostrarResultado(data.resultado.RAW, moneda, crypto);
               })
     }


});