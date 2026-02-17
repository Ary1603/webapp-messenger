import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ParagraphNLinkProps = {
  /** Texto previo al enlace, por ejemplo: "¿Ya tienes una cuenta?" */
  preText: string;
  /** Texto del enlace, por ejemplo: "Inicia sesión" */
  linkText: string;
  /** URL destino del enlace */
  href: string;
  /** Abrir en nueva pestaña con atributos de seguridad */
  targetBlank?: boolean;
  /** Clases adicionales para el <p> contenedor */
  className?: string;
  /** Clases adicionales para el <a> */
  linkClassName?: string;
  /** Para pruebas o automatización */
  testId?: string;
  /** Manejador opcional del click del enlace */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /** Atributo aria-label opcional si necesitas más contexto accesible */
  ariaLabel?: string;
  /** Atributo rel opcional (se fusiona con noopener/noreferrer si targetBlank=true) */
  rel?: string;
};

export const ParagraphNLink = forwardRef<HTMLAnchorElement, ParagraphNLinkProps>(
  (
    {
      preText,
      linkText,
      href,
      targetBlank = false,
      className,
      linkClassName,
      testId,
      onClick,
      ariaLabel,
      rel,
    },
    ref
  ) => {
    const computedRel = targetBlank
      ? cn("noopener", "noreferrer", rel)
      : rel ?? undefined;

    return (
      <p
        data-testid={testId}
        className={cn(
          // Tipografía y colores base
          "text-sm md:text-base text-gray-600 dark:text-gray-300",
          // Espaciado y flujo del texto
          "leading-relaxed",
          className
        )}
      >
        <span>{preText} </span>
        <a
          ref={ref}
          href={href}
          aria-label={ariaLabel}
          target={targetBlank ? "_blank" : undefined}
          rel={computedRel}
          onClick={onClick}
          className={cn(
            // Estilos del enlace con buen contraste y estados
            "font-medium underline-offset-2",
            "text-indigo-600 hover:text-indigo-500 dark:text-indigo-400",
            "hover:underline",
            // Accesibilidad de foco visible
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
            "rounded",
            linkClassName
          )}
        >
          {linkText}
        </a>
      </p>
    );
  }
);

ParagraphNLink.displayName = "ParagraphNLink";

export default ParagraphNLink;