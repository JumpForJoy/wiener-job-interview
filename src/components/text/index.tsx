import { ReactNode } from "react";
import { NumberField, TextFieldComponent as TextField } from "@refinedev/mui";
import Typography from "@mui/material/Typography";

import { ListLinks, TListLinks } from "../listLinks";

export type TText = {
  type?: "title" | "text" | "list";
  value?: string | number;
  links?: TListLinks;
  children?: ReactNode;
};

export const Text: React.FC<TText> = ({
  type = "text",
  value,
  links,
  children,
}) => {
  switch (type) {
    case "title":
      return (
        <Typography variant="body1" fontWeight="bold" color="primary">
          {children || value}
        </Typography>
      );
    case "list":
      return links ? <ListLinks {...links} /> : null;
    default:
      return Number(value) ? (
        <NumberField value={value ?? ""} />
      ) : (
        <TextField value={value ?? ""} />
      );
  }
};
