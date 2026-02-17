import { LinkHTMLAttributes } from "react";

export type ParagraphNLinkProps = Omit<
  LinkHTMLAttributes<HTMLLinkElement>,
  "type"
> & {
  paragraph: string;
  linkParagraph: string;
  link: string;
};
