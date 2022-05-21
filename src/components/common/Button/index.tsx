import "./button.css";
import React from "react";
import classNames from "classnames";

interface ButtonProps {
  children: string;
  primary?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  warning?: boolean;
  handleOnClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  primary = false,
  secondary = false,
  disabled = false,
  warning = false,

  handleOnClick,
}) => {
  const classes = classNames("btn", {
    "btn-primary": primary,
    "btn-secondary": secondary,
    "btn-warning": warning,

    "btn-disabled": disabled,
  });

  return (
    <button type="button" className={classes} onClick={handleOnClick}>
      {children}
    </button>
  );
};

export default Button;
