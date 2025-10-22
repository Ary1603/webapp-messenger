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
import MessengerCalendar from "@/components/calendars/MessengerCalendar";
import { toast } from "sonner";
import { useState } from "react";
import { CreateUserRequest } from "@/types/api/user/user";

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
      const payload: CreateUserRequest = {
        name: formData.get("name") as string,
        username: null,
        last_name_father: formData.get("last_name_father") as string,
        last_name_mother: formData.get("last_name_mother") as string ?? null,
        birthday: formData.get("birthday") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      console.log("Este es el payload: ", payload);
      const result = signUpSchema.safeParse(payload);
      if (!result.success) {
        const { fieldErrors } = result.error.flatten();
        setEmailError(fieldErrors.email?.[0] ?? "");
        setPasswordError(fieldErrors.password?.[0] ?? "");
        return;
      }

      await signUp(payload);
      //toast.success(messages.account_created_success);
      //router.push("/login");
    } catch (error) {
      errorHandler(error as ApiError, handlers);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md sm:max-w-2xl px-4">
      <div className="rounded-2xl bg-white/70 p-6 shadow-sm ring-1 ring-gray-200 backdrop-blur dark:bg-zinc-900/60 dark:ring-zinc-800">
        <form className="space-y-6" noValidate>
          {/* Personal Data Block */}
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {messages.signup_form_titles.user_info}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <MessengerInput
              id="name"
              name="name"
              align="left"
              label={messages.name}
              placeholder={messages.name_placeholder}
            />
            <MessengerInput
              id="last_name_father" /* id único para evitar colisiones */
              name="last_name_father" /* mantenemos name para no alterar lógica externa */
              align="left"
              label={messages.last_name_father}
              placeholder={messages.last_name_father_placeholder}
            />
            <MessengerInput
              id="last_name_mother"
              name="last_name_mother"
              align="left"
              label={messages.last_name_mother}
              placeholder={messages.last_name_mother_placeholder}
            />
            <div className="sm:max-w-sm">
              <MessengerCalendar
                id="birthday"
                name="birthday"
                label={messages.birthday}
                placeholder={messages.date_input}
              />
            </div>
          </div>
          <hr className="my-2 border-gray-200 dark:border-gray-800" />

          {/* Login Credentials Block */}
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {messages.signup_form_titles.credentials }
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:max-w-sm">
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
              className="mt-1"
              align="left"
              label={messages.password}
              errorSpan={passwordError}
              placeholder={messages.password_placeholder}
              required
            />
          </div>

          {/* Región accesible para anuncios de error/success */}
          <div
            aria-live="polite"
            className="min-h-[1rem] text-sm text-rose-600 dark:text-rose-400"
          />

          <MessengerButton
            formAction={handleSignup}
            label={messages.btn_register}
            disabled={isLoading}
            size="md"
            className="mt-2 w-full transition disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </form>

        <div className="mt-8 text-center">
          <ParagraphNLink
            preText={messages.has_account_link.pre_text}
            linkText={messages.has_account_link.text_link}
            href="/login"
            className="text-center"
            linkClassName="ms-1"
          />
        </div>
      </div>
    </div>
  );
}
