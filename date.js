function formatDate(dateStr) {
    // Esta regex captura 3 grupos:
    //   grupo 1: 4 dígitos para el año
    //   grupo 2: 2 dígitos para el mes
    //   grupo 3: 2 dígitos para el día
    const regex = /(\d{4})-(\d{2})-(\d{2})/;
    const match = dateStr.match(regex);
    if (match) {
      // Reordenamos para mostrar la fecha en formato dd/mm/yyyy
      return `${match[1]}/${match[2]}/${match[3]}`;
    }
    // Si no hay coincidencia, devolvemos la fecha original
    return dateStr;
  }

  export { formatDate };