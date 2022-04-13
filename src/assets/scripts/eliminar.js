import { Listar } from "../scripts/listar.js";
import { editar } from "../scripts/editar.js";

let items = {};

export function eliminar(id) {

    items.map((row)=> {
        if(row['id'] == id) {
            for( let i = 0; i < items.length; i++){ 
                console.log(items[i]['id'])
                if ( items[i]['id'] == id) { 
            
                    items.splice(i, 1); 
                    i--; 
                }
            }
        } else {
            return
        }
        Listar(items);
        //evento para edit button
        document.querySelectorAll(`[data-actionType="edit"]`).forEach(element => element.addEventListener('click', function() {
            $('#editarModal').modal('show');
            editar(element.getAttribute('data-id'));
        }));
        document.querySelectorAll(`[data-actionType="delete"]`).forEach(element => element.addEventListener('click', function() {
            eliminar(element.getAttribute('data-id'))
        }))
    })
}

export function inicializarEliminar(db) {
    items = db;
}