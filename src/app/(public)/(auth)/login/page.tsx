import { email } from "zod";
//import { login, signup } from "./actions"
import { useSessionStore } from '@/stores/session/sessionStore'

export default function LoginPage() {
  const initLogin = useSessionStore((state) => state.initLogin);
  const setLoading = useSessionStore((state) => state.setLoading);

  const handleLogin = async (formData: FormData) => {
    setLoading(true)
    try {
      const payload = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
      }
      initLogin(payload)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={handleLogin}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}