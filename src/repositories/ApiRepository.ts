import { ApiClient } from "@/lib/ApiClient";

//* APIs
const TEST = '/api/auth/login'

const ApiRepository = {
  // Inicia sesión
  startLogin: async () => {
    const response = await ApiClient.post(TEST)

    return response.data
  },

  // Cierra sesión
  logout: async () => {

  },

  // Ejemplo: obtener perfil del usuario
  getProfile: async () => {

  },
};

export default ApiRepository;
