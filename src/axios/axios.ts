import axios, { AxiosInstance } from "axios";

// Crea una instancia de Axios con la configuración base
const api: AxiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/api', // URL base de la API
  baseURL: "https://db-api-mygarden-llc.onrender.com/api", // URL base de la API
  headers: {
    "Content-Type": "application/json", // Asegúrate de que todas las peticiones sean JSON
  },
  timeout: 20000, // Tiempo máximo de espera para una petición (opcional)
});

// Interceptor de respuestas (opcional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores
    console.error("Error en la respuesta:", error);
    return Promise.reject(error);
  },
);

export default api;
