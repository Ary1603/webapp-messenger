import { ButtonHTMLAttributes } from "react";
import type { GeneralSizes } from "../const/general-size";

export type MessengerButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> & {
  label: string;
  size?: GeneralSizes;
};
