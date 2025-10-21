import * as React from "react";
import { ICONS } from "@/components/Icons";
import type { IconProps } from "@/types/components/icon";

const Icon = React.forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 24, width, height, title, className, strokeWidth = 1.5, ...rest },
  ref
) {
  // Los íconos SVG se importan como componentes de React (SVGR).
  // Forzamos el tipo a un FC con props de SVG para mantener tipado estricto.
  const Svg = ICONS[name] as React.FC<React.SVGProps<SVGSVGElement>>;

  const computedWidth = size ?? width;
  const computedHeight = size ?? height;

  // Accesibilidad:
  // - Si hay `title`, el ícono es "informativo" (role="img") y NO va aria-hidden.
  // - Si NO hay `title`, se marca como decorativo (aria-hidden) para lectores de pantalla.
  const ariaHidden = title ? undefined : true;
  const role = title ? "img" : "presentation";

  return (
    <Svg
      ref={ref}
      width={computedWidth}
      height={computedHeight}
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden={ariaHidden}
      role={role}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
    </Svg>
  );
});

Icon.displayName = "Icon";

export default React.memo(Icon);