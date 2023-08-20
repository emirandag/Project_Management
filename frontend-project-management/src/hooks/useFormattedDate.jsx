export const useFormattedDate = () => {

    const formattedDate = (publishedDate) => {
        const parsedDate = new Date(publishedDate);
        const day = parsedDate.getUTCDate();
        const month = parsedDate.getUTCMonth() + 1; // Le agregamos 1 porque los meses van del 0 a 11
        const year = parsedDate.getUTCFullYear();
        const hour = parsedDate.getUTCHours() + 2;
        const min = parsedDate.getUTCMinutes();
    
        // Ponemos la fecha en el formato escogido "d/m/aaaa h:m"
        const newFormattedDate = `${day}/${month}/${year} ${hour}:${min}`;
        return newFormattedDate
    }
    
    return { formattedDate }
}

