/* Proyecto implementando emascript6 */

// Constructor para seguro
class Seguro{

    constructor(marca,year,tipo){
        this.marca=marca;
        this.year=year;
        this.tipo=tipo;
    }

cotizarSeguro(){
    /*
          1 = americano 1.15,
          2 = asiatico 1.05
          3 = europeo 1.35
    */
    
    let cantidad;
    const base = 2000;  //valor del seguro base

    switch (this.marca) {
          case '1':
                cantidad = base *1.15;
                break;
    
          case '2':
                cantidad = base * 1.05;
                 break;

          case '3':
                cantidad = base * 1.35;
                break;

          default:
                break;
    }

    //leer año 
    const diferencia = new Date().getFullYear() - this.year;
    // cada año de diferencia hay que reducir 3% el valor del seguro

    cantidad -=((diferencia * 3) * cantidad) / 100;
 

    /* 
          Si el seguro es basico se multiplican 30% mas 
          Si el seguro es completo 50% mas
    */

          if(this.tipo === 'basico'){
                cantidad *= 1.30;
          }else{
                cantidad *=1.50;
          }

    return cantidad; 

}

}



//Todo lo que  se muestra
class Interfaz{
    //Mensaje que se imprime en el html
    mostrarMensaje(mensaje,tipo){
        const div = document.createElement('div');

        if(tipo==='error'){
              div.classList.add('mensaje','error');
        }else{
              div.classList.add('mensaje','correcto');
        }

        div.innerHTML=`${mensaje}`;
        form.insertBefore(div, document.querySelector('.form-group'));
        setTimeout(function(){
              document.querySelector('.mensaje').remove();
        },3000);

  }

      //imprime el resultado de la cotizacion
      mostrarResultado(seguro, total){
        const resultado = document.getElementById('resultado');
        let marca;

            switch(seguro.marca){
                case '1':
                        marca = 'Americano';
                        break;
                
                case '2':
                        marca = 'Asiatico';
                        break;

                case '3':
                        marca = 'Europeo';
                        break;

            }
        //crear un div
        const div= document.createElement('div');
              div.innerHTML=`
                    <p class='header'>Tu Resumen: </p>
                    <p>Marca: ${marca} </p>
                    <p>Año: ${seguro.year} </p>  
                    <p>Tipo: ${seguro.tipo} </p>    
                    <p>Total: ${total}</p>
              `;

              const spinner = document.querySelector('#cargando img');
              spinner.style.display = 'block';
              setTimeout(function(){
                    spinner.style.display ='none';
                    resultado.appendChild(div);
              },3000);

    } 


}




// Event listerners
const form=document.getElementById('cotizar-seguro');
    form.addEventListener('submit',formulario);

function formulario(e){
    e.preventDefault();

    /*Obtenemos el valor seleccionado de el campo marca */
    const marcaSeleccionada = document.getElementById('marca').value;

    // Leer el año seleccionado del select
    const yearSelect =  document.getElementById('anio').value;
    //Leer el valor del radio button 
    const tipo = document.querySelector('input[name="tipo"]').value;

    //Crear instancia de interfaz

    const interfaz= new Interfaz();

    // Revisamos que los campos no esten vacios
    if(marcaSeleccionada==='' || yearSelect==='' || tipo==='' ){
          //Interfaz imprimiendo un error
         
          interfaz.mostrarMensaje('Faltan datos, revisa el formulario y prueba de nuevo','error');

    }else{
          //Limpiar resultados anteriores
          const resultados = document.querySelector('#resultado div');

          if(resultados !==null){
                resultados.remove();

          }

          //Instanciar seguro y mostrar interfaz
          const seguro = new Seguro(marcaSeleccionada, yearSelect, tipo); 
          
          const cantidad =seguro.cotizarSeguro();

          //Mostrar el resultado
          interfaz.mostrarResultado(seguro, cantidad);
          interfaz.mostrarMensaje('Cotizando....');
    }

}      


const max = new Date().getFullYear(),// maximo año para asegurar un auto
    min = max-20; //año minimo para asegurar un auto

  
const selectYears = document.getElementById('anio');     

for (let i=max; i >= min; i--) {
       let option = document.createElement('option');   
       option.value = i;
       option.innerHTML=i;
       selectYears.appendChild(option);
}


// video numero 6