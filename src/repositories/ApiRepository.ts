import { ApiClient } from "./clients/ApiClient"
/* Types & Schemas */
import type { SignUp } from "@/types/api/auth/signup";

//* APIs
const LOGIN = '/api/auth/login'
const SIGNUP = '/api/auth/register'

const ApiRepository = {
  async haseSessionActive() {
    const response = await ApiClient.get(LOGIN);
    return response.data;
  },
  async initLogin(payload: SignUp) {
    const response = await ApiClient.post(LOGIN, payload)
    return response.data
  },
  async signUp(payload: SignUp) {
    const response = await ApiClient.post(SIGNUP, payload)
    return response
  },
  // async testConection() {
  //   const response = await ApiClient.post(TEST)
  //   return response.data
  // }
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
