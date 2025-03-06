import { fetchData } from "./fech.js";

// Creo el Select dinamicamente
async function createSelectCategory() {

const categorias = await fetchData('https://api.euskadi.eus/culture/events/v1.0/eventType');
console.log(categorias)


// [
//     { "id": "1", "nameEs": "Concierto" },
//     { "id": "2", "nameEs": "Teatro" },
//     { "id": "3", "nameEs": "Exposición" },
//     { "id": "4", "nameEs": "Danza" },
//     { "id": "6", "nameEs": "Conferencia" },
//     { "id": "7", "nameEs": "Bertsolarismo" },
//     { "id": "8", "nameEs": "Feria" },
//     { "id": "9", "nameEs": "Cine y audiovisuales" },
//     { "id": "10", "nameEs": "Eventos/jornadas" },
//     { "id": "11", "nameEs": "Formación" },
//     { "id": "12", "nameEs": "Concurso" },
//     { "id": "13", "nameEs": "Festival" },
//     { "id": "14", "nameEs": "Actividad Infantil" },
//     { "id": "15", "nameEs": "Otro" },
//     { "id": "16", "nameEs": "Fiestas" }
//   ];
  
  const selectCategorias = document.getElementById("categorias");
  
  // Agregar la opción "Todos" manualmente
  const defaultOption = document.createElement("option");
  defaultOption.value = "0";
  defaultOption.textContent = "Todos";
  selectCategorias.appendChild(defaultOption);
  
  // Generar opciones dinámicamente
  categorias.forEach(categoria => {
      const option = document.createElement("option");
      option.value = categoria.id;
      option.textContent = categoria.nameEs;
      selectCategorias.appendChild(option);
  });

}

export { createSelectCategory }

