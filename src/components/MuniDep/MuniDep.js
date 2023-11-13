// fetchData.js
const axios = require('axios');

async function fetchData() {
    try {
        const response = await axios.get('https://www.datos.gov.co/resource/xdk5-pm3f.json');
        return response.data;

    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        throw error;
    }
}

module.exports = fetchData;
