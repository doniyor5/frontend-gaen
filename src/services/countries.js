import axios from 'axios';

const Countries = {
    async Getcountries() {
        try {
            const response = await axios.get('https://api.gaen.uz/api/v1/article/user/countries/');
            return response.data;
        } catch (error) {
            console.error('Error fetching countries:', error);
            // Handle error, e.g., return a default list of countries or display an error message
            return []; // Or return a suitable default value
        }
    },
};

export default Countries;