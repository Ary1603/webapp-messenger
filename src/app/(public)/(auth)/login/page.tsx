"use client";
import { useI18n } from "@/components/language/LanguageProvider";
import { useRouter } from "next/navigation";
// Stores
import { useSessionStore } from "@/stores/session/sessionStore";
// Components
import MessengerButton from "@/components/buttons/MessengerButton";
import MessengerInput from "@/components/inputs/MessengerInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import ParagraphNLink from "@/components/links/ParagraphNLink";
import { errorHandler, type ApiError } from "@/utils/error/errorHandler";

export default function LoginPage() {
  const router = useRouter();

  const initLogin = useSessionStore((state) => state.initLogin);
  const setLoading = useSessionStore((state) => state.setLoading);

  const { messages } = useI18n();

  if (!messages) return null;

  const handleLogin = async (formData: FormData) => {
    setLoading(true);
    try {
      const payload = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };
      await initLogin(payload);
      router.push("/chats");
    } catch (error) {
      errorHandler(error as ApiError);
    } finally {
      setLoading(false)
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
          formAction={handleLogin}
          label={messages.login}
          size="md"
          className="mt-5 w-full"
        />
      </form>
      <div className="mt-8">
        <ParagraphNLink
          preText={messages.hasnt_account_link.pre_text}
          linkText={messages.hasnt_account_link.text_link}
          href="/register"
          // targetBlank // <- actívalo si necesitas abrir en otra pestaña
          className="text-center"
          linkClassName="ms-1"
        />
      </div>
    </>
  );
}
