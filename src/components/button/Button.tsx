import React, { MouseEventHandler } from "react";
import { ButtonType, StyledButton } from "./StyledButton";

interface ButtonProps {
  type?: "button" | "submit" | "reset"
  text: string;
  size: string;
  buttonType: ButtonType;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}
const Button = ({ text, size, buttonType, onClick, disabled, type = "button" }: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      size={size}
      buttonType={disabled ? ButtonType.DISABLED : buttonType}
      disabled={buttonType === "DISABLED" || (disabled ? disabled : false)}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
