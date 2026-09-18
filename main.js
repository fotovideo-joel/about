document.addEventListener("DOMContentLoaded", function () {
  // 1. Datos actualizados: Arreglos de imágenes y posición focal
  const menuData = [
    {
      title: "ACABADOS",
      desc: "Texto descriptivo sobre los acabados. La burbuja se expande hacia abajo suavemente.",
      // Agregas varias imágenes aquí:
      bgImages: [
        "https://picsum.photos/id/1015/1920/1080",
        "./files/image1.jpg",
        "https://picsum.photos/id/1016/1920/1080",
      ],
      // position: "center", "right", "left", o porcentajes "70% 50%"
      bgPosition: "left center",
    },
    {
      title: "SISTEMA DE REGISTRO",
      desc: "Detalles sobre el sistema de registro de datos de salud integrados.",
      bgImages: [
        "https://picsum.photos/id/1018/1920/1080",
        "https://picsum.photos/id/1019/1920/1080",
        "https://picsum.photos/id/1020/1920/1080",
      ],
      bgPosition: "center",
    },
    {
      title: "REDES SOCIALES",
      desc: "Conecta conmigo en mis redes o revisa mis proyectos en GitHub.",
      bgImages: ["https://picsum.photos/id/1025/1920/1080", "https://picsum.photos/id/1026/1920/1080"],
      bgPosition: "bottom right",
    },
  ];

  const section = document.getElementById("apple-section");
  const menuContainer = document.getElementById("menu-container");

  let currentIndex = 0;
  let carouselInterval; // Variable para controlar el temporizador del carrusel
  let currentImageIndex = 0; // Índice de la imagen actual dentro del carrusel

  // 2. Renderizar el HTML (Igual que antes)
  function renderMenu() {
    const htmlString = menuData
      .map((item, index) => {
        const isActive = index === 0 ? "active" : "";
        return `
            <div class="menu-item ${isActive}" data-index="${index}">
              <h3 class="item-title">${item.title}</h3>
              <div class="item-desc">
                <p>${item.desc}</p>
              </div>
            </div>
          `;
      })
      .join("");
    menuContainer.innerHTML = htmlString;
  }

  // 3. Función actualizada con Carrusel y Encuadre
  function updateView(index) {
    const items = document.querySelectorAll(".menu-item");
    if (index < 0 || index >= items.length) return;

    currentIndex = index;
    const currentData = menuData[currentIndex];

    // Actualizar clases activas del menú
    items.forEach((item) => item.classList.remove("active"));
    items[currentIndex].classList.add("active");

    // Resetear el carrusel al cambiar de tarjeta
    clearInterval(carouselInterval);
    currentImageIndex = 0;

    // Aplicar primera imagen y el encuadre (posición) específico de esta sección
    section.style.backgroundImage = `url('${currentData.bgImages[0]}')`;
    section.style.backgroundPosition = currentData.bgPosition;

    // Si hay más de una imagen, iniciar el temporizador
    if (currentData.bgImages.length > 1) {
      carouselInterval = setInterval(() => {
        // Avanzar a la siguiente imagen, y si llega al final, volver a 0
        currentImageIndex = (currentImageIndex + 1) % currentData.bgImages.length;
        section.style.backgroundImage = `url('${currentData.bgImages[currentImageIndex]}')`;
      }, 4000); // 4000 milisegundos = cambia cada 4 segundos
    }
  }

  // 4. Inicializar
  renderMenu();
  updateView(0);

  // 5. Asignar clics
  const generatedItems = document.querySelectorAll(".menu-item");
  generatedItems.forEach((item) => {
    item.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      // Solo actualizar si el usuario hizo clic en una tarjeta distinta
      if (index !== currentIndex) {
        updateView(index);
      }
    });
  });
});
