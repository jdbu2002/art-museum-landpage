/**
 * Función que se ejecutará cuando la página cargue completamente.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Se obtiene el mapa con su id
  const map = document.getElementById("map");

  // Creo un objeto con las coordenadas donde me encuentro en
  // el scroll del mapa y donde se encuetra el mouse.
  let pos = { top: 0, left: 0, x: 0, y: 0 };

  function mouseDownHandler(e) {
    // Coloco el cursor en apariencia "agarrando".
    map.style.cursor = "grabbing";

    // Desactivo la selección del usuario para que
    // no pueda tomar la imagen del mapa.
    map.style.userSelect = "none";

    pos = {
      // Obtengo la posición del scroll del map.
      left: map.scrollLeft,
      top: map.scrollTop,
      // Obtengo la posición del mouse.
      x: e.clientX,
      y: e.clientY,
    };

    // Añado los eventos para cuando se mueva el mouse y
    // cuando se suelte el clic.
    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  }

  function mouseMoveHandler(e) {
    // Calculo cuanto se ha movido el mouse
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Hago scroll en el mapa con los valores calculados
    map.scrollTop = pos.top - dy;
    map.scrollLeft = pos.left - dx;
  }

  function mouseUpHandler() {
    // Coloco el cursor en apariencia "agarrable".
    map.style.cursor = "grab";

    // Retorno la propiedad que quité cuando se oprimió el clic.
    map.style.removeProperty("user-select");

    // Quito los eventos para cuando se mueva el mouse y
    // cuando se suelte el clic.
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);

    // Si no quito los eventos, el mapa se seguirá moviendo aunque
    // lo haya dejado de cliquear.
  }

  // Le añado el evento para cuando se oprima el clic en el mapa
  map.addEventListener("mousedown", mouseDownHandler);

  // Cierro el poup cuando se levante el mouse del mapa.
  map.addEventListener("mouseup", closePinInfo);
});

let pinSelected = null;

/**
 * Función que abre el pop-up que muestra la información en el mapa.
 * @param {string} pin - Nombre de pin que se oprimió.
 */
function openPinInfo(pin) {
  const wasSame = closePinInfo();

  if (wasSame) return;

  const pinElement = document.getElementsByClassName(pin)[0];
  const popUp = document.getElementById("mapPopUp").content.cloneNode(true);

  popUp.getElementById("popUpTitle").textContent = mapContents[pin].title;
  popUp.getElementById("popUpText").textContent = mapContents[pin].text;

  if (mapContents[pin].className)
    popUp.getElementById("mainPopUp").classList.add(mapContents[pin].className);

  popUp.getElementById("mainPopUp").id = `${pin}PopUp`;
  pinElement.appendChild(popUp);
  pinSelected = pin;
}

/**
 * Función que abre el pop-up que cierra la información en el mapa.
 * @param {string} pin - Nombre de pin que se oprimió.
 * @returns {boolean} Si el pin que se oprimió es el mismo que el que está
 *                    abierto.
 */
function closePinInfo(pin) {
  const wasSame = pinSelected === pin;

  if (pinSelected) {
    const pinElement = document.getElementById(`${pinSelected}PopUp`);
    pinElement.remove();
    pinSelected = null;
  }

  return wasSame;
}

const mapContents = {
  pasillo: {
    title: "Gran pasillo",
    text: "La entrada del museo, donde hay exhibiciones temporales.",
  },
  romano: {
    title: "Arte griego y romano",
    text: "Encuentra obras del periodo neolítico hasta el romano en el 312 A.C.",
  },
  africa: {
    title: "África, oceanía y américas",
    text: "Conoce la colección del Sahara africano, las islas pacíficas y norte, centro y sur américa.",
  },
  moderno: {
    title: "Arte moderno y contemporaneo",
    text: "Visualiza la obras modernas desde los años 1890 hasta el presente de la mano del departamento de arte moderno.",
  },
  robert: {
    title: "Colección de Robert Lehman",
    text: "La Colección Robert Lehman es una de las colecciones de arte reunidas de forma privada más distinguidas de los Estados Unidos.",
  },
  medieval: {
    title: "Arte medieval",
    text: "La colección de arte medieval y bizantino del museo se encuentra entre las más completas del mundo.",
  },
  america: {
    title: "Ala americana",
    text: 'En 1924 se inauguró un edificio separado "American Wing" para exhibir las artes domésticas del siglo XVII y principios del XIX.',
  },
  armaduras: {
    title: "Armas y armaduras",
    text: "Las armas y armaduras han sido una parte vital de prácticamente todas las culturas durante miles de años, fundamentales no sólo en la conquista y la defensa, sino también en el boato de la corte y los eventos ceremoniales.",
  },
  egipcios: {
    title: "Arte egipcio",
    text: "La colección Met de arte del antiguo Egipto consta de aproximadamente 26.000 objetos de importancia artística, histórica y cultural, que datan del Paleolítico al período romano.",
  },
  tienda: {
    title: "La Tienda MET",
    text: "Obsequios de bellas artes reproducidos de colecciones, libros, videos, impresiones de edición limitada y joyas.",
  },
  biblioteca: {
    title: "Biblioteca Thomas J. Watson",
    text: "La Biblioteca Thomas J. Watson es la biblioteca de investigación central del Museo Metropolitano de Arte. Su colección de libros y publicaciones periódicas relacionadas con la historia del arte es una de las más completas del mundo.",
  },
  galeria: {
    title: "Galeria 199",
    text: "Aquí hay exposiciones variadas y por tiempo limitado. ¡Visítala para ver que nuevo artista está exponiendo!",
  },
  cafe: {
    title: "Café Petrie Court",
    text: "Abierto los viernes y sábados por la noche para la cita nocturna, este café, ubicado en una espectacular galería de esculturas, ofrece bebidas y comidas ligeras, además de música en vivo.",
  },
  auditorio: {
    title: "Auditorio Grace Rainey Rogers",
    text: "Inaugurado en 1954 y actualizado con proyección de video, iluminación inteligente y audio digital de última generación, el Auditorio Grace Rainey Rogers del Museo alberga reuniones dinámicas, conferencias, proyecciones de películas, espectáculos musicales y de danza, y conciertos de ópera.",
  },
  templo: {
    title: "Templo de Dendur",
    text: "Aunque pequeño en comparación con la mayoría de los templos egipcios, el Templo de Dendur es un elegante ejemplo de un templo faraónico típico y es lo más destacado de cualquier visita al Met.",
    className: "templo",
  },
};
