document.addEventListener("DOMContentLoaded", function () {
  // 1. Configuramos las imágenes de fondo para cada opción
  // (Usa resoluciones grandes para que cubran bien toda la pantalla)
  const seccionData = [
    { bgImage: "https://picsum.photos/id/1015/1920/1080" },
    { bgImage: "https://picsum.photos/id/1018/1920/1080" },
    { bgImage: "https://picsum.photos/id/1025/1920/1080" },
  ];

  const section = document.getElementById("apple-section");
  const items = document.querySelectorAll(".menu-item");

  let currentIndex = 0;

  function updateView(index) {
    if (index < 0 || index >= items.length) return;
    currentIndex = index;

    // Actualizar clases activas
    items.forEach((item) => item.classList.remove("active"));
    items[currentIndex].classList.add("active");

    // Cambiar la imagen de fondo de toda la sección
    section.style.backgroundImage = `url('${seccionData[currentIndex].bgImage}')`;
  }

  // Cargar la imagen inicial
  updateView(0);

  items.forEach((item) => {
    item.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      updateView(index);
    });
  });
});