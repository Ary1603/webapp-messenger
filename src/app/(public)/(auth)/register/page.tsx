"use client";
import { signUpSchema, type SignUp } from "@/types/api/auth/signup";
import { useRouter } from "next/navigation";
//import { login, signup } from "./actions"
// import { toast } from "sonner";
import { useSessionStore } from "@/stores/session/sessionStore";
import {
  errorHandler,
  type ApiError,
  //type ErrorHandlerFn,
} from "@/utils/error/errorHandler";

import { useI18n } from "@/components/language/LanguageProvider";

// Components
import MessengerInput from "@/components/inputs/MessengerInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import MessengerButton from "@/components/buttons/MessengerButton";
import ParagraphNLink from "@/components/links/ParagraphNLink";
import { toast } from "sonner";

// const handlers = {

// }



export default function LoginPage() {
  // const initLogin = useSessionStore((state) => state.initLogin);
  const isLoading = useSessionStore((state) => state.isLoading);
  const setLoading = useSessionStore((state) => state.setLoading);
  const signUp = useSessionStore((state) => state.signUp);
  const router = useRouter();

  const { messages } = useI18n();

  if (!messages) return null;

  // const handlers = {
  //   "error-AUTH-1000": async (error: ApiError) => {
  //     // Lógica para cuando hay un error de autenticación
  //     console.error("Error AUTH-1000:", error);
  //     toast.error("Hubo un problema con la autenticación.");
  //   },
  //   // "CORE-1003": async (error: ApiError) => {
  //   //   // Lógica para errores generales del core
  //   //   console.error("Error CORE-1003 juas juas:", error);
  //   //   //toast.error("Error interno. Intenta más tarde.");
  //   // },
  // };
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
        return;
      }
      console.log("Llegue aqui");
      await signUp(payload);
      toast.success(messages.account_created_success)
      router.push("/login");
    } catch (error) {
      errorHandler(error as ApiError);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <form>
        <MessengerInput
          id="email"
          name="email"
          align="left"
          label={messages.email}
          placeholder={messages.email_placeholder}
        />
        <PasswordInput
          id="password"
          name="password"
          className="mt-4"
          align="left"
          label={messages.password}
          placeholder={messages.password_placeholder}
          required
        />
        <MessengerButton
          formAction={handleSignup}
          label={messages.btn_register}
          disabled={isLoading}
          size="md"
          className="mt-5 w-full"
        />
      </form>

      <div className="mt-8">
        <ParagraphNLink
          preText={messages.has_account_link.pre_text}
          linkText={messages.has_account_link.text_link}
          href="/login"
          // targetBlank // <- actívalo si necesitas abrir en otra pestaña
          className="text-center"
          linkClassName="ms-1"
        />
      </div>
    </>
  );
}