import { fetchData } from "./fech.js"; 
import { renderEvents } from "./render.js";

let ano = new Date().getFullYear();
ano = ano-1;
console.log(ano);
async function showEvents() {
    const url = `https://api.euskadi.eus/culture/events/v1.0/events?_elements=20&_page=1&year=${ano}`; 
    const data = await fetchData(url);
    console.log(data)
    if (!data || !data.items) return [];
    
    return data.items; // Ahora devuelve los datos en lugar de renderizarlos directamente
}

async function showEventsType(tipo) {
    const url = `https://api.euskadi.eus/culture/events/v1.0/events/byType/${tipo}?_elements=20&_page=1`;
    const data = await fetchData(url);
    if (!data || !data.items) return [];

    return data.items;
}

async function showEventsProvince(provincia) {
    const url = `https://api.euskadi.eus/culture/events/v1.0/events?_elements=20&_page=1&provinceNoraCode=${provincia}`;
    const data = await fetchData(url);
    if (!data || !data.items) return [];

    return data.items;
}

async function showEventsProAndType(tipo, provincia) {
    const url = `https://api.euskadi.eus/culture/events/v1.0/events?_elements=20&_page=1&provinceNoraCode=${provincia}&type=${tipo}`;
    const data = await fetchData(url);
    if (!data || !data.items) return [];

    return data.items;
}

export { showEventsType, showEvents, showEventsProvince, showEventsProAndType };


// VERSION OPTIMIZADA

// import { fetchData } from "./fech.js"; 

// // Función genérica para obtener eventos con filtros opcionales
// async function fetchEvents({ tipo = null, provincia = null } = {}) {
//     let url = "https://api.euskadi.eus/culture/events/v1.0/events?_elements=20&_page=1";

//     if (tipo) url += `&type=${tipo}`;
//     if (provincia) url += `&provinceNoraCode=${provincia}`;

//     const data = await fetchData(url);
//     return (data && data.items) ? data.items : [];
// }

// // Funciones específicas que reutilizan `fetchEvents`
// const showEvents = () => fetchEvents();
// const showEventsType = (tipo) => fetchEvents({ tipo });
// const showEventsProvince = (provincia) => fetchEvents({ provincia });
// const showEventsProAndType = (tipo, provincia) => fetchEvents({ tipo, provincia });

// export { showEvents, showEventsType, showEventsProvince, showEventsProAndType };
