import { FC } from "react";
import styled, { css, useTheme } from "styled-components";

import { Icon, IconName } from "./Icon";
import { Text } from "./Text";

export interface MaterialTagProps {
  /**
   * Optional component class name
   */
  className?: string;
  /**
   * Id of the Icon component on the left of the tag
   */
  icon: IconName;
  /**
   * Text inside the tag;
   */
  label: string;
  /**
   * Background color
   */
  color: string;
  /**
   * Enable border and shadow around the tag
   */
  border?: boolean;
  onClick?: () => void;
  testId?: string;
}

const TagLabel = styled(Text)`
  text-transform: uppercase;
  margin-left: 9px;
`;

const TagRoot = styled.div<Pick<MaterialTagProps, "color" | "border">>`
  font-family: ${(props) => props.theme.font.family};
  font-weight: bold;
  border: 0;
  border-radius: ${(props) => props.theme.button.borderRadius};
  line-height: 1;
  transition: all 0.2s ease-out;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  padding: 0px 14px 0px 10px;
  height: 30px;
  align-items: center;
  background-color: ${(props) => props.color};

  ${(props) =>
    props.border &&
    css`
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
      border: 1px solid ${(props) => props.theme.color.white};
    `}
`;

export const MaterialTag: FC<MaterialTagProps> = ({ label, icon, testId, ...props }) => {
  const theme = useTheme();
  return (
    <TagRoot data-testid={testId} {...props}>
      <Icon name={icon} color={theme.color.white} size="xs" />
      <TagLabel color="light" size="sm">
        {label}
      </TagLabel>
    </TagRoot>
  );
};