import * as Icons from "lucide-react";
import { FC } from "react";
import { LucideIcon as LucideIconType } from "lucide-react";
import { IconProps } from "@/types/components/icon";

const DEFAULT_SIZE = 24;
const DEFAULT_COLOR = "currentColor";

const Icon: FC<IconProps> = ({
  name,
  size = DEFAULT_SIZE,
  width,
  height,
  color = DEFAULT_COLOR,
  ...rest
}) => {
  const LucideIcon = Icons[name] as LucideIconType;

  if (!LucideIcon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Icon "${name}" no existe en lucide-react`);
    }
    return null;
  }

  return (
    <LucideIcon
      width={width ?? size}
      height={height ?? size}
      color={color}
      {...rest}
    />
  );
};

export default Icon;