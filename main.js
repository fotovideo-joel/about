document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("apple-section");
    const menuContainer = document.getElementById("menu-container");
    let menuData = []; // Empezamos con la lista vacía
    let currentIndex = 0;
    let carouselInterval;
    let currentImageIndex = 0;
    const menuData_example = [
      {
        title: "ACABADOS",
        desc: "Texto descriptivo sobre los acabados de diseño.",
        bgImages: [
          "https://picsum.photos/id/1015/1920/1080",
          "https://picsum.photos/id/1016/1920/1080",
          "https://picsum.photos/id/1017/1920/1080",
        ],
        bgPosition: "right center",
        links: [], // Si una sección no tiene botones, lo dejamos vacío
      },
      {
        title: "OTROS",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aperiam ad repudiandae corporis aliquid. Inventore magnam dicta exercitationem debitis voluptate.",
        bgImages: ["https://picsum.photos/id/1018/1920/1080", "https://picsum.photos/id/1019/1920/1080"],
        bgPosition: "center",
        links: [],
      },
      {
        title: "REDES Y CONTACTO",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aperiam ad repudiandae corporis aliquid. Inventore magnam dicta exercitationem debitis voluptate.",
        bgImages: [
          "https://picsum.photos/id/1025/1920/1080",
          "https://picsum.photos/id/1026/1920/1080",
          "https://picsum.photos/id/1027/1920/1080",
          "https://picsum.photos/id/1028/1920/1080",
        ],
        bgPosition: "bottom right",
        // Aquí inyectamos los botones
        links: [
          { text: "Evento 1", url: "https://www.youtube.com/", icon: "./files/icoYoutube.png", expiraEl: "2026-09-22" },
          { text: "Evento 2", url: "https://www.youtube.com/", icon: "./files/icoYoutube.png", expiraEl: "2026-09-22" },
        ],
      },
    ];

    // 1. FUNCIÓN PARA CARGAR EL JSON
    async function cargarDatos() {
        try {
            // Vamos a buscar el archivo
            const respuesta = await fetch("./data.json");
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
        menuData.forEach((item) => {
            item.bgImages.forEach((imgUrl) => {
                const img = new Image();
                img.src = imgUrl;
            });
        });
    }

    function renderMenu() {
        const hoy = new Date(); // Obtenemos la fecha exacta de hoy
        
        const htmlString = menuData.map((item, index) => {
            const isActive = index === 0 ? "active" : "";
            
            let badgeHTML = "";
            let buttonsHTML = "";
            
            if (item.links && item.links.length > 0) {
                
                // 1. FILTRAR: Nos quedamos solo con los enlaces vigentes o permanentes
                const enlacesValidos = item.links.filter(link => {
                    if (!link.expiraEl) return true; // Si no tiene fecha, vive para siempre
                    
                    const fechaExpiracion = new Date(link.expiraEl);
                    return hoy <= fechaExpiracion; // Si tiene fecha, solo pasa si hoy es menor o igual
                });

                // 2. Si después de filtrar quedaron botones válidos, los renderizamos
                if (enlacesValidos.length > 0) {
                    
                    // ¿Alguno de estos enlaces válidos tiene fecha límite? Activamos el badge
                    const hayBotonActivo = enlacesValidos.some(link => link.expiraEl);
                    if (hayBotonActivo) {
                        badgeHTML = `<span class="badge"> LIVE </span>`;
                    }

                    // Construimos el HTML de los botones usando la lista ya filtrada
                    buttonsHTML = `<div class="action-buttons">`;
                    enlacesValidos.forEach((link) => {
                        let iconHTML = link.icon;
                        if (link.icon && (link.icon.includes('.png') || link.icon.includes('.svg') || link.icon.includes('.jpg'))) {
                            iconHTML = `<img src="${link.icon}" alt="ico">`;
                        }

                        buttonsHTML += `
                            <a href="${link.url}" target="_blank" class="dynamic-btn">
                            ${iconHTML} ${link.text}
                            </a>
                        `;
                    });
                    buttonsHTML += `</div>`;
                }
            }

            // Retornamos tu estructura exacta
            return `
                <div class="menu-item ${isActive}" data-index="${index}">
                <div class="item-title"><h3>${item.title} </h3> ${badgeHTML}</div>
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

        items.forEach((item) => item.classList.remove("active"));
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

    // startup
    cargarDatos();
});
