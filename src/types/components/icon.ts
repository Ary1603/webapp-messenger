import { LucideProps } from "lucide-react";

export interface IconProps extends Omit<LucideProps, "size"> {
  /** Nombre del icono de lucide-react */
  name: keyof typeof import("lucide-react");

  /** Tamaño general (fallback si no hay width/height) */
  size?: number;

  /** Ancho específico */
  width?: number;

  /** Alto específico */
  height?: number;

  /** Color del icono */
  color?: string;
}