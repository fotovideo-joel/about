document.addEventListener("DOMContentLoaded", function () {
    
  // 1. Tus datos (Esto podría venir de un JSON o una API en el futuro)
  const menuData = [
      { 
        title: "ACABADOS", 
        desc: "Texto descriptivo sobre los acabados. La burbuja se expande hacia abajo suavemente.", 
        bgImage: "https://picsum.photos/id/1015/1920/1080" 
      },
      { 
        title: "SISTEMA DE REGISTRO", 
        desc: "Detalles sobre el sistema de registro de datos de salud integrados.", 
        bgImage: "./files/image1.jpg" 
      },
      { 
        title: "REDES SOCIALES", 
        desc: `aaa`, 
        bgImage: "https://picsum.photos/id/1025/1920/1080" 
      }
  ];
  

// <a class="text-example-enlace" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/">Visita este sitio web</a>
// desc: `<div class="gp-img-socialmedia"> <img class="img-test" src="./files/image-ig.png"> </div>`, 
  const section = document.getElementById("apple-section");
  const menuContainer = document.getElementById("menu-container");
  let currentIndex = 0;

  // 2. Renderizar el HTML dinámicamente
  function renderMenu() {
      // Creamos un string con todo el HTML recorriendo el arreglo menuData
      const htmlString = menuData.map((item, index) => {
          // El primer elemento (index 0) empieza con la clase 'active'
          const isActive = index === 0 ? "active" : "";
          return `
            <div class="menu-item ${isActive}" data-index="${index}">
              <h3 class="item-title">${item.title}</h3>
              <div class="item-desc">
                <p>${item.desc}</p>
                <!-- Aquí puedes agregar tus botones de 'VER MÁS' si los necesitas -->
              </div>
            </div>
          `;
      }).join(""); // Unimos todos los elementos sin comas

      // Inyectamos el HTML en el contenedor
      menuContainer.innerHTML = htmlString;
  }

  // 3. Función para actualizar la vista (Fondo y clases activas)
  function updateView(index) {
      const items = document.querySelectorAll(".menu-item"); // Seleccionamos los items recién creados
      if (index < 0 || index >= items.length) return;
      
      currentIndex = index;

      // Actualizar clases activas
      items.forEach(item => item.classList.remove("active"));
      items[currentIndex].classList.add("active");

      // Cambiar imagen de fondo
      section.style.backgroundImage = `url('${menuData[currentIndex].bgImage}')`;
  }

  // 4. Inicializar todo
  renderMenu(); // Primero creamos los elementos en el HTML
  updateView(0); // Establecemos el primer fondo

  // 5. Asignar los eventos de clic a los items que acabamos de crear
  const generatedItems = document.querySelectorAll(".menu-item");
  generatedItems.forEach((item) => {
      item.addEventListener("click", function () {
          const index = parseInt(this.getAttribute("data-index"));
          updateView(index);
      });
  });

});