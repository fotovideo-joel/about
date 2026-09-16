console.log("se cargo el js correctamente");
document.addEventListener("DOMContentLoaded", function () {
    
  // 1. Configuramos los datos (Fondo e Imagen para cada item)
  const seccionData = [
      { bg: "#f5f5f7", img: "https://picsum.photos/id/1015/600/400" }, // Item 1 (Gris claro)
      { bg: "#e6e6e6", img: "https://picsum.photos/id/1018/600/400" }, // Item 2 (Gris más oscuro)
      { bg: "#d1d5db", img: "https://picsum.photos/id/1025/600/400" }  // Item 3 (Gris azulado)
  ];

  // 2. Seleccionamos los elementos del HTML
  const section = document.getElementById("apple-section");
  const items = document.querySelectorAll(".menu-item");
  const displayImg = document.getElementById("display-image");
  const btnUp = document.getElementById("btn-up");
  const btnDown = document.getElementById("btn-down");

  let currentIndex = 0; // Guardamos cuál está activo actualmente

  // 3. Función principal que actualiza toda la vista
  function updateView(index) {
      // Evitar salir de los límites (menos de 0 o más del total de items)
      if (index < 0 || index >= items.length) return;
      currentIndex = index;

      // Quitar la clase "active" de todos y ponérsela solo al seleccionado
      items.forEach(item => item.classList.remove("active"));
      items[currentIndex].classList.add("active");

      // Cambiar fondo de la sección
      section.style.backgroundColor = seccionData[currentIndex].bg;

      // Cambiar imagen (con un pequeño efecto de parpadeo suave)
      displayImg.style.opacity = 0.5;
      setTimeout(() => {
          displayImg.src = seccionData[currentIndex].img;
          displayImg.style.opacity = 1;
      }, 150);
  }

  // 4. Agregar eventos click a cada elemento del menú
  items.forEach((item) => {
      item.addEventListener("click", function () {
          // Leer el atributo "data-index" del HTML y convertirlo a número
          const index = parseInt(this.getAttribute("data-index"));
          updateView(index);
      });
  });

  // 5. Agregar eventos a las flechas opcionales
  if (btnUp && btnDown) {
      btnUp.addEventListener("click", () => updateView(currentIndex - 1));
      btnDown.addEventListener("click", () => updateView(currentIndex + 1));
  }
});