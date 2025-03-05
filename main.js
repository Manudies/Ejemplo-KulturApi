// Función genérica para hacer peticiones fetch
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

// Función para obtener y mostrar eventos de Kulturklik Euskadi (Todos los eventos)
async function showEvents() {
    const url = "https://api.euskadi.eus/culture/events/v1.0/events?_elements=20&_page=1"; // URL para obtener todos los eventos

    const data = await fetchData(url);
    console.log(data);
    if (!data || !data.items) return;

    renderEvents(data.items);
}

// Función para obtener eventos por tipo
async function showEventsType(tipo) {
    // Si el tipo es "0", mostramos todos los eventos y salimos
    if (tipo == 0) {
        showEvents();
        return;
    }

    const url = `https://api.euskadi.eus/culture/events/v1.0/events/byType/${tipo}?_elements=20&_page=1`;

    const data = await fetchData(url);
    if (!data || !data.items) return;

    renderEvents(data.items);
}

// Función para renderizar eventos en la lista
function renderEvents(events) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = ""; // Limpiar la lista antes de mostrar nuevos eventos
    const defaultImage = './public/istockphoto-508030340-612x612.jpg';

    events.forEach(event => {
        const eventItem = document.createElement('li');

        const eventTitle = document.createElement('h3');
        eventTitle.textContent = event.nameEs;

        const eventImage = document.createElement('img');
        eventImage.src = (event.images && event.images.length > 0) ? event.images[0].imageUrl : defaultImage;;

        const eventDate = document.createElement('p');
        eventDate.textContent = `Fecha: ${event.startDate}`;

        const eventLocation = document.createElement('p');
        eventLocation.textContent = `Lugar: ${event.municipalityEs || "No especificado"}`;

        const price = document.createElement('p');
        price.textContent = `Precio: ${event.priceEs || "Gratis / No disponible"}`;

        // Agregar los elementos creados al evento
        eventItem.appendChild(eventTitle);
        eventItem.appendChild(eventImage);
        eventItem.appendChild(eventDate);
        eventItem.appendChild(eventLocation);
        eventItem.appendChild(price);
        eventList.appendChild(eventItem);
    });
}

// Evento del botón para filtrar eventos según la categoría seleccionada
document.getElementById("boton").addEventListener("click", () => {
    const selectedCategory = document.getElementById("categorias").value;
    showEventsType(selectedCategory);
});

// Cargar eventos al inicio con la categoría por defecto (Todos)
showEventsType(0);
