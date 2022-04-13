import { Listar } from "../scripts/listar.js";
import { crearModal } from "../scripts/añadir.js";
import { eliminar } from "../scripts/eliminar.js"

let user = {};
let users = {};
let jsonWithKeys2X = {};

function createNewUserItem(items) {

    user = {...items};
  
    for(let item of Object.keys(items)) {
      createEventListener(item);
    }
    return user;
}
  
function createEventListener(item) {
    let input = document.querySelector(`#${item}InputEdit`);
    input.addEventListener('change', function(event){
      user[item] = event.target.value;
    })
    
}


function editHandler(e) {
    e.preventDefault();

    users.map((row)=>{
        if(row['id'] == user['id']) {
            
            row = user;
         
            Listar(users);
            //evento para edit button
            document.querySelectorAll(`[data-actionType="edit"]`).forEach(element => element.addEventListener('click', function() {
                $('#editarModal').modal('show');
                editar(element.getAttribute('data-id'));
            }));
            document.querySelectorAll(`[data-actionType="delete"]`).forEach(element => element.addEventListener('click', function() {
                eliminar(element.getAttribute('data-id'));
            }))
            $('#editarModal').modal('hide');
            for(let item of Object.keys(jsonWithKeys2X)) {
                let input = document.querySelector(`#${item}InputEdit`);
                input.value = '';
              }
        }
    })
}

function rellenarInputs(id) {
    users.map((row)=>{
        if(row['id'] == id) {
            user = row;
            for(let item of Object.keys(jsonWithKeys2X)) {
                let input = document.querySelector(`#${item}InputEdit`);
                input.value = `${row[item]}`
              }
        }
    })
}

export function editar(id) {

   
    rellenarInputs(id);

    document.querySelector("#form-edit").addEventListener('submit', editHandler);
}

export function inicializarEditar(db, jsonWithKeys2, jsonWithKeysAndTypes) {
    users = db;
    crearModal(jsonWithKeysAndTypes, 'editarModal-body', "edit");
    createNewUserItem(jsonWithKeys2);
    jsonWithKeys2X = jsonWithKeys2;
    
}

