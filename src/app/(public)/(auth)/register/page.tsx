'use client'
import { signUpSchema, type SignUp } from "@/schemas/api/auth/signup";
import { useRouter } from 'next/navigation'
//import { login, signup } from "./actions"
import { useSessionStore } from "@/stores/session/sessionStore";

export default function LoginPage() {
  // const initLogin = useSessionStore((state) => state.initLogin);
  const setLoading = useSessionStore((state) => state.setLoading);
  const signUp = useSessionStore((state) => state.signUp);
  const router = useRouter();  

  const redirectToLogin = () => {
    router.push("/login")
  }

  const handleSignup = async (formData: FormData) => {
    setLoading(true);
    try {
      const payload: SignUp = {
        email: formData.get('email') as string,
        password: formData.get('password') as string
      }

      const result = signUpSchema.safeParse(payload)

      if(!result.success) {
        console.log("Aqui es el error");
        console.error(result.error.format())
        return
      }
      console.log("Llegue aqui");
      signUp(payload)
    } catch (error) {
      console.error("Error en signup: ", error)
    } finally {
      setLoading(false)
    }
  }

  // const handleSignup = async (formData: FormData) => {
  //   setLoading(true);
  //   try {
  //     const payload: SignUp = {
  //       email: formData.get("email") as string,
  //       password: formData.get("password") as string,
  //     };
  //     const result = signUpSchema.safeParse(payload);

  //     if (!result.success) {
  //       console.error(result.error.format());
  //       alert("Datos inválidos. Revisa tu correo o contraseña.");
  //       setLoading(false);
  //       return;
  //     }
      
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <form>
      <span>Esto es register</span>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button type="button" onClick={redirectToLogin}>Login</button>
      <button formAction={handleSignup}>Sign up</button>
    </form>
  );
}
