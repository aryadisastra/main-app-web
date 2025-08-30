import { InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string };
export default function Input({ label, className = "", ...rest }: Props) {
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
      <input className={`w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-brand/30 focus:border-brand ${className}`} {...rest} />
    </label>
  );
}