document.addEventListener("DOMContentLoaded", () => {
    
  const section = document.getElementById("apple-section");
  const menuContainer = document.getElementById("menu-container");
  
  let menuData = []; // Empezamos con la lista vacía
  let currentIndex = 0;
  let carouselInterval;
  let currentImageIndex = 0;

  // 1. FUNCIÓN PARA CARGAR EL JSON
  async function cargarDatos() {
      try {
          // Vamos a buscar el archivo
          const respuesta = await fetch('./data.json');
          menuData = await respuesta.json(); // Lo convertimos a formato JS
          
          // Una vez cargados, inicializamos todo
          preloadImages();
          renderMenu();
          updateView(0);
          asignarEventosClic();
      } catch (error) {
          console.error("Error al cargar data.json:", error);
      }
  }

  function preloadImages() {
      menuData.forEach(item => {
          item.bgImages.forEach(imgUrl => {
              const img = new Image();
              img.src = imgUrl;
          });
      });
  }

  function renderMenu() {
      const hoy = new Date(); // Obtenemos la fecha exacta de hoy

      const htmlString = menuData.map((item, index) => {
          const isActive = index === 0 ? "active" : "";
          
          // --- LÓGICA DEL BADGE ---
          let badgeHTML = "";
          if (item.expiraEl) {
              const fechaExpiracion = new Date(item.expiraEl);
              // Si la fecha de hoy es menor o igual a la expiración, mostramos el badge
              if (hoy <= fechaExpiracion) {
                  badgeHTML = `<span class="badge">NUEVO</span>`;
              }
          }

          let buttonsHTML = "";
          if (item.links && item.links.length > 0) {
              buttonsHTML = `<div class="action-buttons">`;
              item.links.forEach(link => {
                  buttonsHTML += `
                    <a href="${link.url}" target="_blank" class="dynamic-btn">
                       ${link.icon} ${link.text}
                    </a>`;
              });
              buttonsHTML += `</div>`;
          }

          return `
            <div class="menu-item ${isActive}" data-index="${index}">
              <h3 class="item-title">⊕ ${item.title} ${badgeHTML}</h3>
              <div class="item-desc">
                <p>${item.desc}</p>
                ${buttonsHTML}
              </div>
            </div>
          `;
      }).join("");
      
      menuContainer.innerHTML = htmlString;
  }

  function updateView(index) {
      const items = document.querySelectorAll(".menu-item");
      if (index < 0 || index >= items.length) return;
      
      currentIndex = index;
      const currentData = menuData[currentIndex];

      items.forEach(item => item.classList.remove("active"));
      items[currentIndex].classList.add("active");

      clearInterval(carouselInterval);
      currentImageIndex = 0;

      section.style.backgroundImage = `url('${currentData.bgImages[0]}')`;
      section.style.backgroundPosition = currentData.bgPosition;

      if (currentData.bgImages.length > 1) {
          carouselInterval = setInterval(() => {
              currentImageIndex = (currentImageIndex + 1) % currentData.bgImages.length;
              section.style.backgroundImage = `url('${currentData.bgImages[currentImageIndex]}')`;
          }, 4000);
      }
  }

  function asignarEventosClic() {
      const generatedItems = document.querySelectorAll(".menu-item");
      generatedItems.forEach((item) => {
          item.addEventListener("click", function () {
              const index = parseInt(this.getAttribute("data-index"));
              if (index !== currentIndex) {
                  updateView(index);
              }
          });
      });
  }

  // ¡ARRANCAMOS EL PROGRAMA!
  cargarDatos(); 
});