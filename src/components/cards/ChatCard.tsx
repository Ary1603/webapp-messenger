import Image from "next/image";
import React, { forwardRef, Ref, useMemo } from "react";

type NativeButtonProps = React.ComponentPropsWithoutRef<"button">;

export type ChatCardProps = {
  title: string;
  lastMessage?: string;
  timestamp?: string | Date | number;
  avatarUrl?: string | null;
  avatarAlt?: string;
  unreadCount?: number;
  selected?: boolean;
  locale?: string;
  timeFormatOptions?: Intl.DateTimeFormatOptions;
  className?: string;
  style?: React.CSSProperties;
} & Omit<NativeButtonProps, "children">;

function formatTimestamp(
  ts: ChatCardProps["timestamp"],
  locale = "es-ES",
  options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" },
): string | undefined {
  if (!ts) return undefined;

  try {
    const date = ts instanceof Date ? ts : new Date(ts);

    if (Number.isNaN(date.getTime())) return undefined;

    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch {
    return undefined;
  }
}

function getInitials(name?: string | null): string {
  if (!name) return "";

  const words = name.trim().split(/\s+/);
  const first = words[0]?.[0] ?? "";
  const second = words.length > 1 ? (words[1]?.[0] ?? "") : "";

  return (first + second).toUpperCase();
}

/**
 * ChatCard
 * Accesible, escalable y con forwardRef.
 * Renderiza como <button> para facilitar interacción en listas.
 */
export const ChatCard = forwardRef(function ChatCard(
  {
    title,
    lastMessage,
    timestamp,
    avatarUrl,
    avatarAlt,
    unreadCount = 0,
    selected = false,
    locale = "es-ES",
    timeFormatOptions,
    className,
    style,
    disabled,
    ...buttonProps
  }: ChatCardProps,
  ref: Ref<HTMLButtonElement>,
) {
  const timeText = useMemo(
    () => formatTimestamp(timestamp, locale, timeFormatOptions),
    [timestamp, locale, timeFormatOptions],
  );

  const ariaLabel = `${title}${unreadCount ? `, ${unreadCount} sin leer` : ""}${
    timeText ? `, ${timeText}` : ""
  }${lastMessage ? `, ${lastMessage}` : ""}`;

  return (
    <button
      type="button"
      ref={ref}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={selected ? "true" : undefined}
      className={[
        // Base layout
        "chatcard",
        // Permite que quien consuma el componente controle estilos con utilidades/CSS
        "flex items-center gap-3 w-full",
        "px-3 py-2 rounded-md",
        // Estados interactivos
        "text-left transition-shadow",
        disabled
          ? "opacity-60 cursor-not-allowed"
          : "hover:shadow-sm focus:shadow-outline",
        selected ? "bg-[rgba(0,0,0,0.04)]" : "",
        className ?? "",
      ]
        .join(" ")
        .trim()}
      style={style}
      {...buttonProps}
    >
      {/* Avatar */}
      <div
        className="shrink-0"
        style={{ width: 44, height: 44, position: "relative" }}
        aria-hidden
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={avatarAlt ?? `Avatar de ${title}`}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "9999px",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            title={title}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "9999px",
              background: "rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              userSelect: "none",
            }}
          >
            {getInitials(title)}
          </div>
        )}

        {unreadCount > 0 && (
          <span
            aria-label={`${unreadCount} mensajes sin leer`}
            style={{
              position: "absolute",
              right: -2,
              top: -2,
              minWidth: 18,
              height: 18,
              borderRadius: 9999,
              background: "#FF4D4F",
              color: "white",
              fontSize: 11,
              lineHeight: "18px",
              textAlign: "center",
              padding: "0 4px",
              boxShadow: "0 0 0 2px white",
            }}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </div>

      {/* Centro: título y último mensaje */}
      <div className="min-w-0 grow">
        <div
          className="font-medium"
          style={{
            fontWeight: 600,
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={title}
        >
          {title}
        </div>
        {lastMessage != null && lastMessage !== "" && (
          <div
            className="text-[color:var(--muted-foreground,#666)]"
            style={{
              fontSize: 14,
              lineHeight: 1.3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={lastMessage}
          >
            {lastMessage}
          </div>
        )}
      </div>

      {/* Derecha: hora */}
      <div
        className="shrink-0"
        style={{
          marginLeft: 8,
          fontSize: 12,
          color: "var(--muted-foreground,#666)",
          lineHeight: 1.2,
          textAlign: "right",
          minWidth: 52,
        }}
        aria-hidden={!timeText}
        title={timeText}
      >
        {timeText}
      </div>
    </button>
  );
});

export default ChatCard;
