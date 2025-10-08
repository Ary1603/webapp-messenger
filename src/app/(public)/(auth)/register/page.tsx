import { signUpSchema, type SignUp } from "@/schemas/api/auth/signup";
//import { login, signup } from "./actions"
import { useSessionStore } from "@/stores/session/sessionStore";

export default function LoginPage() {
  const initLogin = useSessionStore((state) => state.initLogin);
  const setLoading = useSessionStore((state) => state.setLoading);

  const handleSignup = async (formData: FormData) => {
    setLoading(true);
    try {
      const payload: SignUp = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      const result = signUpSchema.safeParse(payload);

      if (!result.success) {
        console.error(result.error.format());
        alert("Datos inválidos. Revisa tu correo o contraseña.");
        setLoading(false);
        return;
      }
      initLogin(payload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={handleSignup}>Sign up</button>
    </form>
  );
}
