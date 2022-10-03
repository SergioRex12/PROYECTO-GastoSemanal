
import { Gastos } from "./gastos.js";

//clases
class app {

    cargar() {
        //DOM
        document.addEventListener('DOMContentLoaded', () => {
            const gastos = new Gastos();

            const presupuestoUsuario = prompt('¿Cual es el presupuesto?');
            if (!presupuestoUsuario) window.location.reload();

            document.querySelector('#total').textContent = presupuestoUsuario;
            document.querySelector('#restante').textContent = presupuestoUsuario;
            
            document.querySelector('#agregar-gasto button').addEventListener('click', gastos.CrearGasto.bind(gastos));
        
        });
    }
}
//Cargamos lo principal
new app().cargar();
