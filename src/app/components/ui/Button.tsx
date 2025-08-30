import { ButtonHTMLAttributes } from "react";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean };
export default function Button({ loading, className = "", children, ...rest }: Props) {
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-brand text-white hover:bg-brand-hover ${className}`}
    >
      {loading ? "..." : children}
    </button>
  );
}