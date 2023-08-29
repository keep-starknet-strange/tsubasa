import type { FC, PropsWithChildren } from "react";

type ButtonVariant = "primary";

interface ButtonProps {
  variant?: ButtonVariant;
  onClick?: () => Promise<void>;
  className?: string;
}

const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { onClick, className, children } = props;
  return (
    <button
      onClick={onClick}
      className={`${className} hover:bg-blue-700 rounded-full border border-green-600 bg-neon px-6 py-4 font-adieu text-xs font-bold uppercase leading-4 text-black outline-0 hover:bg-green-600`}
    >
      {children}
    </button>
  );
};

export default Button;
