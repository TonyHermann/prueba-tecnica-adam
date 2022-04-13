import { editar } from "../scripts/editar.js"
import { Listar } from "../scripts/listar.js";
import { eliminar } from "../scripts/eliminar.js"

let user = {};
let users = {};

export function inicializarAñadir(db) {
  users = db;
}

export function createNewUserItem(items) {

  user = {...items};


  for(let item of Object.keys(items)) {
    createEventListener(item);
  }
  return user;
}

function createEventListener(item) {
  let input = document.querySelector(`#${item}Input`);
  input.addEventListener('change', function(event){
    user[item] = event.target.value;
  })
  
}

export function crearModal(array, modalClass, typeModal) {
  let html = "";

  for (let key in array) {
    let splitted = array[key].split(",");
    let type = "";
    if (splitted[1] === "object" || "array") {
      type = "text";
    }
    if (splitted[0] === "email") {
      type = "email";
    } else if (splitted[1] === "number") {
      type = "number";
    } else if (splitted[1] === "phone") {
      type = "number";
    } else {
      type = "text";
    }

    if( typeModal == "edit") {
      html += `
      <div class="form-group">
        <label for="${splitted[0]}InputEdit">${splitted[0]}</label>
        <input
          type="${type}"
          class="form-control"
          id="${splitted[0]}InputEdit"
          placeholder="Enter ${splitted[0]}"
          required
        />
      </div>
       `;
    } else {

      html += `
        <div class="form-group">
          <label for="${splitted[0]}Input">${splitted[0]}</label>
          <input
            type="${type}"
            class="form-control"
            id="${splitted[0]}Input"
            placeholder="Enter ${splitted[0]}"
            required
          />
        </div>
         `;
    }
  }


  document.querySelector(`.${modalClass}`).innerHTML = html;
  document.querySelector("#form").addEventListener('submit', submitHandler);
}

export function submitHandler(event) {
  event.preventDefault();
  users.push(user);
  Listar(users);
  //evento para edit button
  document.querySelectorAll(`[data-actionType="edit"]`).forEach(element => element.addEventListener('click', function() {
    $('#editarModal').modal('show');
    editar(element.getAttribute('data-id'));
  }));
  document.querySelectorAll(`[data-actionType="delete"]`).forEach(element => element.addEventListener('click', function() {
    eliminar(element.getAttribute('data-id'))
}))
  $('#exampleModal').modal('hide')
}
