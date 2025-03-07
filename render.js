import { showEventsType, showEvents, showEventsProvince, showEventsProAndType } from "./eventos.js";

function renderEvents(events) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = ""; // Limpiar la lista antes de mostrar nuevos eventos
    const defaultImage = './public/istockphoto-508030340-612x612.jpg';

    // Obtener los favoritos guardados en localStorage
    const favoriteEvents = JSON.parse(localStorage.getItem('favoriteEvents')) || [];

    events.forEach(event => {
        const eventItem = document.createElement('li');

        const eventTitle = document.createElement('h3');
        eventTitle.textContent = event.nameEs;

        const eventImage = document.createElement('img');
        eventImage.src = (event.images && event.images.length > 0) ? event.images[0].imageUrl : defaultImage;

        const eventDate = document.createElement('p');
        eventDate.textContent = `Fecha: ${event.startDate}`;

        const eventLocation = document.createElement('p');
        eventLocation.textContent = `Lugar: ${event.municipalityEs || "No especificado"}`;

        const price = document.createElement('p');
        price.textContent = `Precio: ${event.priceEs || "Gratis / No disponible"}`;

        // Crear botón de favoritos
        const favoritesButton = document.createElement('button');
        favoritesButton.textContent = 'Agregar a favoritos';
        favoritesButton.style.backgroundColor = 'green';

        // Crear boton de mas info
        const masInfo = document.createElement('button');
        masInfo.textContent = 'Mas info';

        
        // Verificar si el evento ya está en favoritos
        const isFavorite = favoriteEvents.some(favEvent => favEvent.id === event.id);
        if (isFavorite) {
            favoritesButton.textContent = 'Borrar de favoritos';
            favoritesButton.style.backgroundColor = 'red';
        }
        
        // Evento para agregar/quitar de favoritos
        favoritesButton.addEventListener('click', () => {
            let updatedFavorites = JSON.parse(localStorage.getItem('favoriteEvents')) || [];
            const eventIndex = updatedFavorites.findIndex(e => e.id === event.id);
            
            if (eventIndex !== -1) {
                // Si ya está en favoritos, eliminarlo
                updatedFavorites.splice(eventIndex, 1);
                localStorage.setItem('favoriteEvents', JSON.stringify(updatedFavorites));
                favoritesButton.textContent = 'Agregar a favoritos';
                favoritesButton.style.backgroundColor = 'green';
                alert('Evento eliminado de favoritos');
            } else {
                // Si no está en favoritos, agregarlo
                updatedFavorites.push(event);
                localStorage.setItem('favoriteEvents', JSON.stringify(updatedFavorites));
                favoritesButton.textContent = 'Borrar de favoritos';
                favoritesButton.style.backgroundColor = 'red';
                alert('Evento agregado a favoritos');
            }
        });
        
        
        // Agregar los elementos creados al evento
        eventItem.appendChild(eventTitle);
        eventItem.appendChild(eventImage);
        eventItem.appendChild(eventDate);
        eventItem.appendChild(eventLocation);
        eventItem.appendChild(price);
        eventItem.appendChild(favoritesButton);
        eventItem.appendChild(masInfo);
        eventList.appendChild(eventItem);
        
        
        
        // Evento para abrir modal con más información
        masInfo.addEventListener("click", () => openModal(event));
        eventList.appendChild(eventItem);
    });
}

// Función para abrir el modal con los datos del evento
function openModal(event) {
    document.getElementById("modal-title").textContent = event.nameEs;
    document.getElementById("modal-image").src = (event.images && event.images.length > 0) ? event.images[0].imageUrl : './public/istockphoto-508030340-612x612.jpg';
    document.getElementById("modal-date").textContent = `Fecha: ${event.startDate}`;
    document.getElementById("modal-location").textContent = `Lugar: ${event.municipalityEs || "No especificado"}`;
    document.getElementById("modal-price").textContent = `Precio: ${event.priceEs || "Gratis / No disponible"}`;
    document.getElementById("modal-description").textContent = event.sourceUrlEs || "No hay descripción disponible.";
    document.getElementById("event-modal").style.display = "flex"; // Mostrar modal
}
export { renderEvents, openModal };
