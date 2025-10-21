"use client";
import { signUpSchema, type SignUp } from "@/types/api/auth/signup";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/stores/session/sessionStore";
import { errorHandler, type ApiError } from "@/utils/error/errorHandler";
import { useI18n } from "@/components/language/LanguageProvider";
import MessengerInput from "@/components/inputs/MessengerInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import MessengerButton from "@/components/buttons/MessengerButton";
import ParagraphNLink from "@/components/links/ParagraphNLink";
import { toast } from "sonner";
import { useState } from "react";

export default function LoginPage() {
  // State
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // Store
  const isLoading = useSessionStore((state) => state.isLoading);
  const setLoading = useSessionStore((state) => state.setLoading);
  const signUp = useSessionStore((state) => state.signUp);

  const router = useRouter();
  const { messages } = useI18n();
  if (!messages) return null;

  const handlers = {
    "AUTH-1077": async () => {
      router.push("/login");
      toast.warning(messages.user_aready_exists);
    },
  };

  const handleSignup = async (formData: FormData) => {
    setLoading(true);
    setEmailError("");
    setPasswordError("");

    try {
      const payload: SignUp = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      const result = signUpSchema.safeParse(payload);
      if (!result.success) {
        const { fieldErrors } = result.error.flatten();
        setEmailError(fieldErrors.email?.[0] ?? "");
        setPasswordError(fieldErrors.password?.[0] ?? "");
        return;
      }

      await signUp(payload);
      toast.success(messages.account_created_success);
      router.push("/login");
    } catch (error) {
      errorHandler(error as ApiError, handlers);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[330px]">
      <form>
        <MessengerInput
          id="email"
          name="email"
          align="left"
          label={messages.email}
          errorSpan={emailError}
          placeholder={messages.email_placeholder}
        />
        <PasswordInput
          id="password"
          name="password"
          className="mt-4"
          align="left"
          label={messages.password}
          errorSpan={passwordError}
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
          className="text-center"
          linkClassName="ms-1"
        />
      </div>
    </div>
  );
}
