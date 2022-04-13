import { getItems, Listar, crearJson, createJson, crearTabla } from "../src/assets/scripts/listar.js";
import { crearModal, createNewUserItem, inicializarAñadir } from "../src/assets/scripts/añadir.js";
import { inicializarEditar, editar } from "../src/assets/scripts/editar.js";
import { eliminar, inicializarEliminar } from "../src/assets/scripts/eliminar.js";

document.addEventListener("DOMContentLoaded", () => {
  iniciarApp();
});

let dataLocal = {};

const iniciarApp = async () => {
    let location = window.location.pathname;
  try {
      //Verificar el HREF del usuario para ver que link de la Api consumir.
    if(location.includes('usuarios')) {
        const data = await getItems("https://my-json-server.typicode.com/joseluisgs/APIRESTFake/users");
        dataLocal = data;
    } else if (location.includes('posts')) {
        const data = await getItems("https://my-json-server.typicode.com/joseluisgs/APIRESTFake/posts");
        dataLocal = data;
    } else if (location.includes('imagenes')) {
        const data = await getItems("https://my-json-server.typicode.com/joseluisgs/APIRESTFake/photos");
        dataLocal = data;
        
    }

    //Crar json con los datos de la api
    let jsonWithKeysAndTypes = crearJson(dataLocal);
    let jsonWithKeys2 = createJson(dataLocal);

    //Crear la tabla dependiendo de las KEYS del Json de la Api.
    crearTabla(jsonWithKeys2);
    Listar(dataLocal);


    //Añadir 
    inicializarAñadir(dataLocal);
    document.querySelector(".modal-button").addEventListener("click", function () {
      crearModal(jsonWithKeysAndTypes, 'card-modal-body', 'submitHandler');
      createNewUserItem(jsonWithKeys2);
    });

    //Editar
    inicializarEditar(dataLocal, jsonWithKeys2, jsonWithKeysAndTypes);
    document.querySelectorAll(`[data-actionType="edit"]`).forEach(element => element.addEventListener('click', function() {
        $('#editarModal').modal('show');
        editar(element.getAttribute('data-id'));
    }))

    //Eliminar
    inicializarEliminar(dataLocal);
    document.querySelectorAll(`[data-actionType="delete"]`).forEach(element => element.addEventListener('click', function() {
        eliminar(element.getAttribute('data-id'))
    }))
    
  } catch (error) {
    console.log(error);
  }
};
