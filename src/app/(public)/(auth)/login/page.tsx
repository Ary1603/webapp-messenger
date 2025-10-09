'use client'
//import { login, signup } from "./actions"
import { useSessionStore } from '@/stores/session/sessionStore'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const initLogin = useSessionStore((state) => state.initLogin);
  const setLoading = useSessionStore((state) => state.setLoading);
  const router = useRouter();                 

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

    const redirectToSignup = () => {
    console.log("Entre");
    router.push('/register')
  }


  return (
    <>
    <form>
      <span>Esto es login</span>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={handleLogin}>Log in</button>
      <button onClick={redirectToSignup}>Sign up</button>
    </form>
    </>
  )
}