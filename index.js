//#region requests a vercel
function get(tipo, searchTxt) {
  try {
    let datos = [];
    const url = `http://spoticfy.vercel.app/${tipo}/${searchTxt}`;
    fetch(url)
      .then((response) => response.json())
      .then((items) => {
        console.log("fetcheé esto:", items);
        datos = items;
      });
    if (datos.length == []) {
      alert("No se encontró ningún resultado.");
    } else {
      datos.forEach((item) => {
        const newli = document.createElement("li");
        const img = document.createElement("img");
        img.src = "song.jpg";
        newli.appendChild(img);
        if (datos.length != 0) {
          switch (tipo) {
            case "canciones":
              newli.innerText = `${item.nombre} - ${item.artista} - ${item.album}`;
              break;
            case "albumes":
              newli.innerText = `${item.nombre} - ${item.artista}`;
              break;
            case "artistas":
              newli.innerText = `${item.nombre}`;
              break;
          }
        }
        newli.className = "item-lista";
        lista.appendChild(newli);
      });
    }
  } catch (ex) {
    alert(ex);
    console.error(ex);
  }
}
//#endregion

//#region interacciones DOM
const lblSearchTxt = document.getElementById("lblSearchTxt");
const inputSearchTxt = document.getElementById("inputSearchTxt");
document.addEventListener("DOMContentLoaded", () => {
  toggleSearchTxt(false);
});

function toggleSearchTxt(bool) {
  if (bool == true) {
    lblSearchTxt.style.display = "block";
    inputSearchTxt.style.display = "block";
  } else {
    lblSearchTxt.style.display = "none";
    inputSearchTxt.style.display = "none";
  }
}

const lista = document.getElementById("lista1");
const getWhat = document.getElementById("getWhatSelect");
getWhat.addEventListener("change", () => {
  if (getWhat.value.slice(0, 3) == "all") {
    toggleSearchTxt(false);
  } else {
    toggleSearchTxt(true);
  }
});
const btnTraer = document.getElementById("traer");
btnTraer.addEventListener("click", () => {
  btnTraer.innerText = "Cargando...";
  lista.innerHTML = "";
  alert(getWhat.value);
  switch (getWhat.value) {
    case "allAlbumes":
      get("albumes", "*");
      break;

    case "allArtistas":
      get("artistas", "*");
      break;

    case "allCanciones":
      get("canciones", "*");
      break;

    case "cancionEsp":
      get("canciones", `${inputSearchTxt.value}`);
      break;

    case "artistaEsp":
      get("artistas", `${inputSearchTxt.value}`);
      break;

    case "albumEsp":
      get("canciones", `${inputSearchTxt.value}`);
      break;
  }
  btnTraer.innerText = "Traer";
});
//#endregion
