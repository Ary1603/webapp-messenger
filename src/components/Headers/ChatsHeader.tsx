import React, { forwardRef } from "react";

/**
 * Icono base reutilizable con SVG inline (sin dependencias externas).
 * Permite tamaño y título accesible.
 */
type IconProps = {
  title?: string;
  size?: number;
  className?: string;
};

const PlusIcon: React.FC<IconProps> = ({
  title = "Nuevo",
  size = 20,
  className,
}) => (
  <svg
    aria-hidden={title ? undefined : true}
    role={title ? "img" : "presentation"}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
  >
    {title ? <title>{title}</title> : null}
    <path d="M11 11V5a1 1 0 1 1 2 0v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6z" />
  </svg>
);

const SearchIcon: React.FC<IconProps> = ({
  title = "Buscar",
  size = 20,
  className,
}) => (
  <svg
    aria-hidden={title ? undefined : true}
    role={title ? "img" : "presentation"}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
  >
    {title ? <title>{title}</title> : null}
    <path d="M10 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm11 17.59-4.7-4.7a9 9 0 1 0-1.41 1.41l4.7 4.7a1 1 0 0 0 1.41-1.41z" />
  </svg>
);

const FilterIcon: React.FC<IconProps> = ({
  title = "Filtrar",
  size = 20,
  className,
}) => (
  <svg
    aria-hidden={title ? undefined : true}
    role={title ? "img" : "presentation"}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
  >
    {title ? <title>{title}</title> : null}
    <path d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm3 6a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1zm3 6a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1z" />
  </svg>
);

/**
 * Props del Header. Mantenemos bajo acoplamiento y alta cohesión.
 */
export type ChatsHeaderProps = {
  /** Texto del “logo” (por defecto, 'Messenger') */
  title?: string;
  /** Maneja clic en “Nuevo chat” */
  onAddNewChat?: () => void;
  /** Maneja clic en “Buscar” */
  onSearchClick?: () => void;
  /** Maneja clic en “Filtrar” */
  onFilterClick?: () => void;
  /** Clase(s) para personalización */
  className?: string;
  /** Permite ocultar acciones (p.ej. en vistas compactas) */
  hideActions?: boolean;
  /** Permite inyectar acciones adicionales a la derecha */
  rightExtras?: React.ReactNode;
};

/**
 * Header de la webApp de chats.
 * - Accesible (roles/aria, etiquetas, hotspots de teclado)
 * - Escalable (props, composición, sin dependencia de estilos concretos)
 * - “forwardRef” para que el padre pueda manejar el contenedor (e.g., medir altura, focus trapping)
 */
export const ChatsHeader = forwardRef<HTMLDivElement, ChatsHeaderProps>(
  function ChatHeader(
    {
      title = "Messenger",
      onAddNewChat,
      onSearchClick,
      onFilterClick,
      className,
      hideActions = false,
      rightExtras,
    },
    ref
  ) {
    return (
      <header
        ref={ref}
        role="banner"
        className={[
          "chat-header",
          // Estilos por defecto (puedes mapear a tu sistema de diseño o Tailwind, etc.)
          // Layout
          "flex items-center justify-between",
          // Espaciado y dimensiones
          "px-4 py-3",
          // Borde/base
          "border-b",
          // Colores neutros por defecto (que tu tema sobrescriba)
          "bg-white text-neutral-900 border-neutral-200",
          // Soporte de modo oscuro si existiera
          "dark:bg-neutral-900 dark:text-neutral-50 dark:border-neutral-800",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* IZQUIERDA: Logo/Marca */}
        <div className="chat-header__logo flex items-center min-w-0">
          <span
            className="truncate font-semibold text-lg tracking-tight select-none"
            aria-label={`${title}, página principal`}
          >
            {title}
          </span>
        </div>

        {/* DERECHA: Acciones */}
        {!hideActions && (
          <div className="chat-header__actions flex items-center gap-1">
            <IconButton
              ariaLabel="Nuevo chat"
              title="Nuevo chat"
              onClick={onAddNewChat}
            >
              <PlusIcon />
            </IconButton>

            <IconButton
              ariaLabel="Buscar"
              title="Buscar"
              onClick={onSearchClick}
            >
              <SearchIcon />
            </IconButton>

            <IconButton
              ariaLabel="Filtrar"
              title="Filtrar"
              onClick={onFilterClick}
            >
              <FilterIcon />
            </IconButton>

            {rightExtras}
          </div>
        )}
      </header>
    );
  }
);

/**
 * Botón de ícono accesible y reutilizable.
 * - Aumenta la superficie de clic (tamaño táctil)
 * - Tiene ‘focus ring’ para teclado
 */
type IconButtonProps = {
  ariaLabel: string;
  title?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const IconButton: React.FC<IconButtonProps> = ({
  ariaLabel,
  title,
  onClick,
  children,
  className,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={title ?? ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={[
        "icon-button",
        "relative inline-flex items-center justify-center",
        "h-9 w-9 rounded-md",
        "hover:bg-neutral-100 active:bg-neutral-200",
        "dark:hover:bg-neutral-800 dark:active:bg-neutral-700",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Asegura que los SVG hereden color actual */}
      <span className="pointer-events-none text-current">{children}</span>
    </button>
  );
};

export default ChatsHeader;
