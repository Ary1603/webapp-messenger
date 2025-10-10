// src/lib/error-handler.ts
import { toast } from "sonner";

export interface ApiError<T = unknown> {
  messageCode?: string;
  data: T | null;
  status: number;
  message: string
}

export type ErrorHandlerFn = (error: ApiError) => void;

// Tipos de las entradas del diccionario de errores
type ErrorEntry =
  | string
  | {
      title?: string;
      description?: string;
      // Puedes extender con "variant" si quieres (info/success/warning/error)
    };

type ErrorDict = Record<string, ErrorEntry>;

/** Detecta el locale preferido (localStorage -> navigator -> 'es') */
function resolveLocale(): 'es' | 'en' {
  try {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('locale');
      if (saved === 'es' || saved === 'en') return saved as 'es' | 'en';

      const fromNav = navigator?.language?.slice(0, 2);
      if (fromNav === 'es' || fromNav === 'en') return fromNav as 'es' | 'en';
    }
  } catch {}
  return 'es';
}

/** Carga perezosa del diccionario de errores del locale */
async function loadErrorDict(locale: 'es' | 'en'): Promise<ErrorDict> {
  try {
    const mod = await import(`@/locales/errors/${locale}.json`);
    return (mod.default ?? mod) as ErrorDict;
  } catch {
    return {};
  }
}

/** Toast personalizado: busca messageCode en /locales/errors/<locale>.json */
export function showMappedToast(error: ApiError) {
  const code = error.messageCode;
  const locale = resolveLocale();

  // Sin code => fallback directo
  if (!code) {
    showDefaultToast(error);
    return;
  }

  // Import dinámico para no bloquear ni romper SSR; mostramos toast cuando cargue
  loadErrorDict(locale)
    .then((dict) => {
      const entry = dict[code] ?? dict['GENERIC'];

      if (!entry) {
        showDefaultToast(error);
        return;
      }

      let title: string | undefined;
      let description: string | undefined;

      if (typeof entry === 'string') {
        title = entry;
      } else {
        title = entry.title || code;
        description = entry.description;
      }

      // Usa el estilo que prefieras; aquí "error" por defecto
      if (description) {
        toast.error(description, { description: title }); // o al revés, según tu UI
      } else {
        //toast.error(entry as string)
        toast.error(title);
      }
    })
    .catch(() => {
      showDefaultToast(error);
    });
}

// Handlers globales (opcionales)
let globalHandlers: Record<string, ErrorHandlerFn> = {};
let globalDefaultHandler: ErrorHandlerFn | undefined;

/** Registra/mezcla handlers globales por código (ej: AUTH-1000) */
export function registerErrorHandlers(handlers: Record<string, ErrorHandlerFn>) {
  globalHandlers = { ...globalHandlers, ...handlers };
}

/** Define un handler global por defecto (fallback) */
export function registerDefaultErrorHandler(handler: ErrorHandlerFn) {
  globalDefaultHandler = handler;
}
/** Toast personalizado */
// function showMappedToast(error: ApiError) {
//   //const getMappedError = 
  
// }

/** Toast genérico por defecto */
function showDefaultToast(error: ApiError) {
  //const prefix = error.messageCode ? `messageCode: ${error.messageCode} ` : "";
  toast.error(JSON.stringify(error))
  // toast.error(`${prefix} \n description: ${error.message.message}`);
}

/**
 * Handler centralizado
 * - Busca handler local por código
 * - Luego global por código
 * - Luego handler local por defecto
 * - Luego handler global por defecto
 * - Finalmente, toast genérico
 */
export function errorHandler(
  error: ApiError,
  localHandlers?: Record<string, ErrorHandlerFn>,
  localDefault?: ErrorHandlerFn
) {
  const code = error.messageCode;

  console.log("errorHanlder -> code: ", code);
  console.log(localHandlers);
  if (code && localHandlers?.[code]) {
    localHandlers[code](error);
    return;
  }
  if (code && globalHandlers[code]) {
    globalHandlers[code](error);
    return;
  }
  if (localDefault) {
    localDefault(error);
    return;
  }
  if (globalDefaultHandler) {
    globalDefaultHandler(error);
    return;
  }
  showMappedToast(error);
}