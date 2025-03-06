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
