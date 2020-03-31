class Interfaz{

     constructor() {
          this.init();
     }
     init(){
          this.construirSelect();
     }

     construirSelect() {
          cotizador.obtenerMonedasAPI()
               .then(monedas => {
                    //seleccionamos el select
                    const selectCrypto = document.querySelector('#criptomoneda');
                    //recorremos el objeto
                    for ( const [key, value] of Object.entries(monedas.monedas.Data)) {
                         const option = document.createElement('option');
                         option.value = value.Symbol;
                         option.appendChild(document.createTextNode(value.CoinName));
                         selectCrypto.appendChild(option);
                    }
               })
     }

     mostrarMensaje(mensaje, clases){
          const div = document.createElement('div');
          div.className = clases;
          div.appendChild(document.createTextNode(mensaje));
          //mostrar error
          const divMensaje = document.querySelector('.mensajes');
          divMensaje.appendChild(div);

          setTimeout(() => {
               document.querySelector('.mensajes div').remove();
          }, 2000);
     }

     //imprime el resultado de la cotizacion
     mostrarResultado(resultado, moneda, crypto) {
          //si ya hubo un resultado, borrarlo
          const resultadoAnterior = document.querySelector('#resultado > div'); 
          if(resultadoAnterior) resultadoAnterior.remove();

         const datosMoneda = resultado[crypto][moneda];

         const lastupdate = new Date(datosMoneda.LASTUPDATE * 1000);

         //construimos el template
         let html = `
               <div class="card bg-warning">
                    <div class="card-body text-light">
                         <h2 class="card-title">Resultado:</h2>
                         <p>El precio de ${datosMoneda.FROMSYMBOL} a ${datosMoneda.TOSYMBOL} es de: ${datosMoneda.PRICE.toFixed(4)}</p>
                         <p>Variacion ùltimo día: ${datosMoneda.CHANGEPCTDAY.toFixed(5)} %</p>
                         <p>Última actualización: ${lastupdate}</p>
                    </div>
               </div>
         `;
         this.toggleSpinner('block');
         setTimeout(() => {
              this.toggleSpinner('none')
              document.querySelector('#resultado').innerHTML = html;
         }, 1000);
     }

     //simular spinner carga
     toggleSpinner(vista){
          const spinner = document.querySelector('.contenido-spinner');
          spinner.style.display = vista;
     }
}