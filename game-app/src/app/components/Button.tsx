type ButtonVariant = "primary";

interface ButtonProps {
  text: string;
  variant?: ButtonVariant;
}

const Button = (props: ButtonProps) => {
  const { variant = "primary" } = props;
  return (
    <button className="hover:bg-blue-700 rounded-full border border-green-600 bg-neon px-4 py-2 font-adieu text-xs font-bold uppercase leading-4 text-black hover:bg-green-600">
      {props.text}
    </button>
  );
};

export default Button;
