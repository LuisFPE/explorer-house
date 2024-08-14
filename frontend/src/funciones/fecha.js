async function FormatearFecha(fecha) {
    const fechaHora = new Date(fecha);

    const year = fechaHora.getFullYear();
    const month = fechaHora.getMonth() + 1;
    const day = fechaHora.getDate();
    const hours = fechaHora.getHours();
    const minutes = fechaHora.getMinutes();
    const seconds = fechaHora.getSeconds();

    const nuevaFechaHora = `${year}-${(month < 10 ? '0' : '') + month}-${(day < 10 ? '0' : '') + day} ${hours}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}`;

    return nuevaFechaHora
}


export {
    FormatearFecha
}