export async function getItems(link) {
  return await fetch(link).then((response) => response.json());
}

let i = 0;

export function isValidUrl(_string) {
  const matchpattern =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return matchpattern.test(_string);
}

export function crearTabla(ths) {
  let html = "";
  for (let th of Object.keys(ths)) {
    html += `
            <th>${th}</tr>
        `;
  }
  html += `
    <th>Acciones</th>
    `;
  document.querySelector(".table-tr").innerHTML = html;
}

export function Listar(db) {
  let html = `
    <tr>
    
  `;
  let id = "";
  db.forEach((element) => {
    for (var key in element) {
      if (element.hasOwnProperty(key)) {
        if (key == "id") {
          id = element[key];
        }
        if (typeof element[key] == "object") {
          let x = element[key];
          html += `
                <td>
            `;

          for (var key in x) {
            let y = x[key];
            if (typeof y == "object") {
              for (var key in y) {
                html += `
                        <span class="right badge badge-default">${key}</span> : ${y[key]}
                        `;
              }
            } else {
              html += `
                    <span class="right badge badge-default">${key}</span> : ${x[key]}
                `;
            }
          }

          html += `
                
                </td>
            `;
        } else {
          if (JSON.stringify(element[key]).includes("avatar")) {
            html += `
                    <td><img class="image-avatar" src="${element[key]}" /></td>
                `;
          } else if (JSON.stringify(element[key]).includes("@")) {
            html += `
                    <td><a href="mailto:${element[key]}">${element[key]}</a></td>
                `;
          } else if (isValidUrl(JSON.stringify(element[key]))) {
            html += `
                    <td><a href="${element[key]}">${element[key]}</a></td>
                `;
          } else {
            html += `
                    <td>${element[key]}</td>
                `;
          }
        }
      }
    }
    html += `
        <td>
            <button data-id="${id}" data-actionType="edit" class="btn btn-default"><i class="fas fa-pen"></i></button>
            <button data-id="${id}" data-actionType="delete" class="btn btn-danger"><i class="fas fa-trash"></i></button>
        </td>
    </tr>`;
  });

  document.querySelector("#table-body").innerHTML = html;
}

export function crearJson(db) {
  let jsonWithKeys = [];
  // let jsonWithKeys = {};
  let i = 0;
  db.forEach((element) => {
    if (i < 1) {
      for (let key in element) {
        if (element.hasOwnProperty(key)) {
          jsonWithKeys.push(`${key},${typeof element[key]}`);
        }
      }
      i++;
    }
  });
  return jsonWithKeys;
}

export function createJson(db) {
  let jsonWithKeys2 = {};
  db.forEach((element) => {
    if (i < 1) {
      for (let key in element) {
        jsonWithKeys2[key] = "";
      }
      i++;
    }
  });
  return jsonWithKeys2;
}
