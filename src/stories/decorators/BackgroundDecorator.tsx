import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

type Props = {
  background?: "primary" | "light" | "dark";
  maxWidth?: number;
};

const StyledBg = styled.div<Props>`
  padding: 1rem;
  height: 100vh;
  background-color: ${({ background, theme }) => {
    switch (background) {
      case "primary":
        return theme.color.primary;
      case "dark":
        return theme.color.black;
      case "light":
        return theme.color.lightGray;
    }
  }};
`;

export const BackgroundDecorator: FC<PropsWithChildren<Props>> = ({
  children,
  maxWidth = 300,
  ...props
}) => {
  return (
    <StyledBg {...props}>
      <div style={{ maxWidth }}>{children}</div>
    </StyledBg>
  );
};
