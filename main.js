import { createSelectCategory } from "./categorias.js";
import { showEvents, showEventsType, showEventsProvince, showEventsProAndType } from "./eventos.js";
import { renderEvents } from "./render.js";

// Cargar categorías dinámicamente
createSelectCategory();

// Cargar eventos iniciales
document.addEventListener("DOMContentLoaded", async () => {
    const initialEvents = await showEvents();
    renderEvents(initialEvents);
});

// Manejar filtros de eventos
document.getElementById("boton").addEventListener("click", async () => {
    const selectedCategory = document.getElementById("categorias").value;
    const selectedProvince = document.getElementById("provincias").value;

    let filteredEvents = [];

    if (selectedCategory === "0" && selectedProvince === "0") {
        filteredEvents = await showEvents();
    } else if (selectedCategory === "0") {
        filteredEvents = await showEventsProvince(selectedProvince);
    } else if (selectedProvince === "0") {
        filteredEvents = await showEventsType(selectedCategory);
    } else {
        filteredEvents = await showEventsProAndType(selectedCategory, selectedProvince);
    }

    renderEvents(filteredEvents);
});

// Cerrar modal al hacer clic en la "X"
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("event-modal").style.display = "none";
});

// Cerrar modal si el usuario hace clic fuera del contenido
window.addEventListener("click", (event) => {
    const modal = document.getElementById("event-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Ocultar el modal al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("event-modal").style.display = "none";
});

// Función para mostrar solo los eventos favoritos
function showFavorites(fav) {
    const favoriteEvents = JSON.parse(localStorage.getItem('favoriteEvents')) || [];
    renderEvents(favoriteEvents, showfavorites); // Renderizar solo los eventos guardados en favoritos
}

// Evento para mostrar favoritos cuando se haga clic en el botón "Favoritos"
const botonFav = document.getElementById("boton_fav");
let showfavorites = false;
botonFav.addEventListener("click", async() => {
    if (!showfavorites){
        showfavorites = true;
        showFavorites(showfavorites);
        botonFav.textContent = 'Volver';
    }
    else{
        const initialEvents = await showEvents();
        renderEvents(initialEvents);
        botonFav.textContent = 'Favoritos';
        showfavorites = false;
    }
})
