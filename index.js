//#region declaraciones (elementos del DOM)
const inputForm = document.getElementById("inputForm");
const postWhat = document.getElementById("postWhatSelect");
let btnSubir;

const getWhat = document.getElementById("getWhatSelect");
const lblSearchTxt = document.getElementById("lblSearchTxt");
const inputSearchTxt = document.getElementById("inputSearchTxt");
const btnTraer = document.getElementById("traer");
const lista = document.getElementById("lista1");
//#endregion

//#region requests a vercel
function get(tipo, searchTxt, applyToDOM) {
  // tipo = canciones, albumes, artistas
  // searchTxt = * si es todos o un nombre de uno de los objetos (ej "Orbitando Jupyter", "La Base de los Datos", "Jero")
  // applyToDom: si es true, actualiza la lista de traerDatos. Si no, devuelve los datos recibidos.
  try {
    const url = `http://spoticfy.vercel.app/${tipo}/${searchTxt}`;
    fetch(url)
      .then((response) => response.json())
      .then((items) => {
        console.log("fetcheé esto:", items);
        if (applyToDOM === false) {
          return items;
        } else {
          let datos = items;
          if (datos.length === 0) {
            alert("No se encontró ningún resultado.");
          } else {
            datos.forEach((item) => {
              const newli = document.createElement("li");
              const img = document.createElement("img");
              img.src = "song.jpg";
              img.size;

              switch (tipo) {
                case "canciones":
                  newli.innerText = `(ID: ${item.id}) ${item.nombre} - ${item.artista} - ${item.album} - (duración: ${item.duracion}) - (reproducciones: ${item.reproducciones})`;
                  break;
                case "albumes":
                  newli.innerText = `(ID: ${item.id}) ${item.nombre} - ${item.artista}`;
                  break;
                case "artistas":
                  newli.innerText = `(ID: ${item.id}) ${item.nombre}`;
                  break;
              }
              newli.className = "item-lista";
              lista.appendChild(newli);
              newli.appendChild(img);
              return "get(): Se agregaron los datos obtenidos al DOM. Si no querés esto, pasá false como 3er parámetro.";
            });
          }
        }
      });
  } catch (ex) {
    alert(ex);
    console.error(ex);
  }
}

function post(obj) {
  alert("post!!");
  try {
    switch (obj.tipo) {
      case "cancion":
        sng = {
          album: obj.relID,
          duracion: obj.duracion,
          nombre: obj.nombre,
        };
        fetch(`http://spoticfy.vercel.app/canciones`, {
          method: "POST",
          body: JSON.stringify(sng),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then((response) => response.json())
          .then((salida) => {
            console.log(salida);
          });
      case "album":
        alb = {
          nombre: obj.nombre,
          artista: obj.relID,
        };
        fetch(`http://spoticfy.vercel.app/albumes`, {
          method: "POST",
          body: JSON.stringify(alb),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then((response) => response.json())
          .then((salida) => {
            console.log(salida);
          });
      case "artista":
        art = {
          nombre: obj.nombre,
        };
        fetch(`http://spoticfy.vercel.app/artistas`, {
          method: "POST",
          body: JSON.stringify(art),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then((response) => response.json())
          .then((salida) => {
            console.log(salida);
          });
    }
  } catch (ex) {
    console.error(ex);
  }
}
//#endregion

//#region interacciones DOM
function toggleSearchTxt(bool) {
  if (bool === true) {
    lblSearchTxt.style.display = "block";
    inputSearchTxt.style.display = "block";
  } else {
    lblSearchTxt.style.display = "none";
    inputSearchTxt.style.display = "none";
  }
}

function changeInputForm(tipo) {
  inputForm.innerHTML = "";
  switch (tipo) {
    case "cancion":
      inputForm.innerHTML = `
      <label for="iNombre">Nombre de la canción:</label>
      <input type="text" id="iNombre" name="iNombre" required /><br><br>

      <label for="relID">ID del álbum:</label>
      <input input type="number" min = 1 max = 9223372036854775807 step = "1" id="idAlbum" name="idAlbum" required /><br><br>

      <label for="iDuracion">Duración (s):</label>
      <input type="number" min = 1 max = 2147483647 step ="0.01" id = "iDuracion" name="iDuracion" required /><br><br>
      <button id="guardar"> GUARDAR </button>`;
      break;
    case "album":
      inputForm.innerHTML = `
      <label for="nombre">Nombre del álbum:</label>
      <input type="text" id="nombre" name="nombre"><br><br>
      
      <label for="relID">ID de la canción:</label>
      <input input type="number" min = 1 max = 9223372036854775807 step = "1" id="idAlbum" name="idAlbum"><br><br>
      
      <button id="guardar"> GUARDAR </button>`;
      break;
    case "artista":
      inputForm.innerHTML = `
      <label for="nombre">Nombre del artista:</label>
      <input type="text" id = "nombre" name="nombre"><br><br>
      <button type = "button" id="guardar" onclick="alert("hola")"> GUARDAR </button>`;
      break;
    default:
      alert(`${tipo} no es un tipo válido para changeInputForm!!`);
      console.error(`${tipo} no es un tipo válido para changeInputForm!!`);
  }
  let btnSubir = document.getElementById("guardar");
  btnSubir.addEventListener("click", () => {
    let obj = {
      tipo: postWhat.value,
      nombre: document.getElementById("iNombre").value,
      relID: document.getElementById("relID").value,
      duracion: document.getElementById("iDuracion").value,
    };
    post(obj);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  changeInputForm("cancion");
  toggleSearchTxt(false);
});

postWhat.addEventListener("change", () => {
  changeInputForm(postWhat.value);
});

getWhat.addEventListener("change", () => {
  if (getWhat.value.slice(0, 3) === "all") {
    toggleSearchTxt(false);
  } else {
    toggleSearchTxt(true);
  }
});

btnTraer.addEventListener("click", () => {
  btnTraer.innerText = "Cargando...";
  lista.innerHTML = "";
  switch (getWhat.value) {
    case "allAlbumes":
      get("albumes", "*", true);
      break;

    case "allArtistas":
      get("artistas", "*", true);
      break;

    case "allCanciones":
      get("canciones", "*", true);
      break;

    case "cancionEsp":
      get("canciones", `${inputSearchTxt.value}`, true);
      break;

    case "artistaEsp":
      get("artistas", `${inputSearchTxt.value}`, true);
      break;

    case "albumEsp":
      get("albumes", `${inputSearchTxt.value}`, true);
      break;
  }
  btnTraer.innerText = "Traer";
});
//#endregion
