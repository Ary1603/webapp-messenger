import { ApiClient } from "./clients/ApiClient"

//* APIs
const TEST = '/api/auth/login'

const ApiRepository = {
  async testConection() {
    const response = await ApiClient.post(TEST)

    console.log("ApiRepository.ts ", response)
    return response.data
  }
}

export default ApiRepository
// const ApiRepository = {
//   // Inicia sesión
//   startLogin: async () => {
//     const response = await ApiClient.post(TEST)

//     return response.data
//   },

//   // Cierra sesión
//   logout: async () => {

//   },

//   // Ejemplo: obtener perfil del usuario
//   getProfile: async () => {

//   },
// };

// export default ApiRepository;
