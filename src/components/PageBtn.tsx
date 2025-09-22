import type { ReactNode, ButtonHTMLAttributes } from "react";

type PageBtnProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  onClick?: () => void;  
  active?: boolean;       
};

function PageBtn({ children, onClick, active, className, ...rest }: PageBtnProps) {
  const base = "min-w-9 rounded-lg border px-3 py-2 transition";
  const normal = "border-gray-300 bg-white text-gray-700 hover:bg-gray-50";
  const current = "border-gray-800 bg-gray-900 text-white";

  return (
    <button
      {...rest}                          
      onClick={onClick}
      disabled={rest.disabled || !!active}
      aria-current={active ? "page" : undefined}
      className={[base, active ? current : normal, className ?? ""].join(" ")}
    >
      {children}
    </button>
  );
}

export default PageBtn