import { FontSizesBody, FontSizesHeading } from "./fontSizes";

export * from "./hsd-theme";
export * from "./biesse-theme";

export interface BiesseTheme {
  name: string;
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  card: {
    borderRadius: string;
    boxShadow: string;
  };
  eventCard: {
    boxShadow: string;
  };
  button: {
    borderRadius: string;
  };
  input: {
    borderRadius: string;
    boxShadow: {
      dark: string;
      light: string;
    };
    borderColor: string;
  };
  color: {
    primary: string;
    secondary: string;
    white: string;
    black: string;
    lightGray: string;
    gray: string;

    material: {
      wood: string;
      metal: string;
      composite: string;
      glass: string;
      stone: string;
    };
  };
  font: {
    mobile: {
      body: Partial<FontSizesBody>;
      headings: Partial<FontSizesHeading>;
    };
    tablet: {
      body: Partial<FontSizesBody>;
      headings: Partial<FontSizesHeading>;
    };
    regular: {
      body: FontSizesBody;
      headings: FontSizesHeading;
    };
    weight: {
      book: number;
      regular: number;
      medium: number;
      bold: number;
    };
    family: string;
  };
  transition: string;
}
