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

  // Le añado el evento para cuando se oprima el click en el mapa
  map.addEventListener("mousedown", mouseDownHandler);
});

/**
 * Función que abre el pop-up que muestra la información en el mapa.
 * @param {string} pin - Nombre de pin que se oprimió.
 */
function abrirMapa(pin) {
  alert(`Se oprimió: ${pin}`);
}
