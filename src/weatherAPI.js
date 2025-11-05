export class WeatherAPI {

    static async getWeatherData(location) {
        const startDate = "next7days";
        const include = "days";
        const contentType = "json";
        const unitGroup = "metric";
        const key = "JVPA3DTUBH89G6V3TDH73NM69";
        const iconSet = "icons2";
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}?unitGroup=${unitGroup}&include=${include}&contentType=${contentType}&iconSet=${iconSet}&key=${key}`

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const weatherData = await response.json();
            return weatherData;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
        
    }
}