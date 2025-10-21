import type { IconName } from "@/components/Icons";

export type ImgLikeProps = React.ImgHTMLAttributes<HTMLImageElement> & React.AriaAttributes;

export type IconProps = React.SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  title?: string;
  strokeWidth?: number;
  className?: string;
};
