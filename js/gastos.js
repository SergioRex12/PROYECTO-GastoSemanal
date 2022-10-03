

//CLases
export class Gastos {
    constructor() {}

    CrearGasto(e) {
        e.preventDefault();

        const gastoDom = document.querySelector('#gasto');
        const CantidadDom = document.querySelector('#cantidad');
        const dineroRestante = document.querySelector('#restante');

        //Comprobaciones
        if (gastoDom.value == "") {
            console.log("Introduce un nombre para el gasto")
            this.alerta('error','Introduce un nombre para el gasto');

            return;
        }
        if ((isNaN(CantidadDom.value)) || (CantidadDom.value <= 0) || (CantidadDom.value === "")) {
            console.log("Introduce un numero valido");
            this.alerta('error','Introduce un numero valido');

            return;
        }

        //Revisamos si podemos con el gasto
        if (CantidadDom.value > parseInt(dineroRestante.textContent)) {
            console.log("No tienes tanto dinero");
            this.alerta('error','No hay tanto presupuesto');

            return;    
        }
        const resultado = {
            nombre: gastoDom.value,
            cantidad: CantidadDom.value,
            restante: dineroRestante.textContent 
        }

        this.InsertarGasto(resultado);
    }

    InsertarGasto(items) {

        const {nombre, cantidad, restante} = items;
        const zonaGastos = document.querySelector('#gastos ul');

        // Crear un LI
        const nuevoGasto = document.createElement('li');
        nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';


        // Insertar el gasto
        nuevoGasto.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
        `;

        // boton borrar gasto.
        const btnBorrar = document.createElement('button');
        btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
        btnBorrar.textContent = 'Borrar';
        nuevoGasto.appendChild(btnBorrar);
        btnBorrar.addEventListener('click',this.BorrarGasto.bind(new Gastos));

        // Insertar al HTML
        zonaGastos.appendChild(nuevoGasto);

        this.alerta('exito','Gasto añadido correctamente');
       
        const presupuesto = restante - cantidad;
        document.querySelector('#restante').textContent = (restante - cantidad);

        this.CalculoPorcentaje(presupuesto);

        document.querySelector('#agregar-gasto').reset();
    }

    CalculoPorcentaje(presupuesto) {

        /*
            Cambiamos el color
            Si es menor a 20% o igual se pone rojo
            Si es menor a 50% se pone amarillo

            Si no se queda en azul
        */
        //Quitamos el dinero

        const zonaTexto = document.querySelector('#presupuesto .restante');
        const presupuestoTotal = parseInt(document.querySelector('#total').textContent);
       
        //Revisamos el 20 %
        if (presupuesto < (presupuestoTotal * 20 / 100)) {
            zonaTexto.classList.remove('alert', 'alert-success');
            zonaTexto.classList.add('alert', 'alert-danger');

            this.alerta('aviso','El presupuesto esta por debajo de 20%');
        } else if (presupuesto < (presupuestoTotal * 50 / 100)) {

            zonaTexto.classList.remove('alert', 'alert-success', 'alert-danger');
            zonaTexto.classList.add('alert', 'alert-warning');
            this.alerta('aviso','El presupuesto esta por debajo de 50%');
        } else {
            zonaTexto.classList.remove('alert', 'alert-warning','alert-danger');
            zonaTexto.classList.add('alert', 'alert-success');
        }
    }

    BorrarGasto(e) {
        const zonaBorar = e.target.parentElement;
        const precioSumar = parseInt(zonaBorar.firstElementChild.textContent.split('$ ')[1])
        const dineroActual = parseInt(document.querySelector('#restante').textContent);

        //Borramos el dom
        zonaBorar.remove();
        this.CalculoPorcentaje(dineroActual + precioSumar);

        document.querySelector('#restante').textContent = (dineroActual + precioSumar);
    }

    alerta(tipo, mensaje) {

        if (document.querySelectorAll('.contenido .alerta').length > 3) return;

        const zona = document.querySelector('.contenido h2');
        const item = document.createElement('p');

        item.classList.add('text-center','alert', 'font-weight-bold');
        switch (tipo) {
            case 'exito':
                item.classList.add("alert-success","alerta");
                break;
        
            case 'error':
                item.classList.add("alert-danger","alerta");
                break;
            case 'aviso':
                item.classList.add('alert-warning','alerta');
            break;
            default:

                break;
        }

        item.textContent = mensaje;
        zona.appendChild(item);

        setTimeout(() => {
            item.remove();
        }, 3000);
    }
}
