"use client";
import { signUpSchema, type SignUp } from "@/schemas/api/auth/signup";
import { useRouter } from "next/navigation";
//import { login, signup } from "./actions"
import { toast } from "sonner";
import { useSessionStore } from "@/stores/session/sessionStore";
import {
  errorHandler,
  type ApiError,
  //type ErrorHandlerFn,
} from "@/utils/error/errorHandler";

import { useI18n } from "@/components/language/LanguageProvider";


export default function LoginPage() {
  
  // const initLogin = useSessionStore((state) => state.initLogin);
  const setLoading = useSessionStore((state) => state.setLoading);
  const signUp = useSessionStore((state) => state.signUp);
  const router = useRouter();

  const { messages, locale, setLocale } = useI18n();

  if (!messages) return null;

  const redirectToLogin = () => {
    router.push("/login");
  };

  const handlers = {
    "error-AUTH-1000": async (error: ApiError) => {
      // Lógica para cuando hay un error de autenticación
      console.error("Error AUTH-1000:", error);
      toast.error("Hubo un problema con la autenticación.");
    },
    // "CORE-1003": async (error: ApiError) => {
    //   // Lógica para errores generales del core
    //   console.error("Error CORE-1003 juas juas:", error);
    //   //toast.error("Error interno. Intenta más tarde.");
    // },
  };

  const handleSignup = async (formData: FormData) => {
    setLoading(true);
    try {
      const payload: SignUp = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const result = signUpSchema.safeParse(payload);

      if (!result.success) {
        console.log("Aqui es el error");
        console.error(result.error.format());
        return;
      }
      console.log("Llegue aqui");
      await signUp(payload);
    } catch (error) {
      console.error("Error en signup: ", error);
      errorHandler(error as ApiError, handlers);
    } finally {
      setLoading(false);
    }
  };

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
    <>
    <h3>{messages.register_page.title}</h3>
    <button disabled={locale === 'es'} onClick={() => setLocale('es')}>ES</button>
        <button disabled={locale === 'en'} onClick={() => setLocale('en')}>EN</button>
    
    <span>{messages.test}</span>
    <form>
      <label htmlFor="email">{messages.register_page.email}</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">{messages.register_page.password}</label>
      <input id="password" name="password" type="password" required />
      <button type="button" onClick={redirectToLogin}>
        {messages.login}
      </button>
      <button formAction={handleSignup}>{messages.register}</button>
    </form>
    </>
  );
}
