// Función para concatenar clases condicionalmente
export function cn(...classes: Array<string | undefined | false>): string {
  return classes.filter(Boolean).join(" ");
}