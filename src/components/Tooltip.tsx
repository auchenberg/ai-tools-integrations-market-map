import { ReactNode } from "react";

interface TooltipProps {
  content?: string;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  if (!content) return <>{children}</>;

  return (
    <div className="group relative flex">
      {children}
      <div
        className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[300px] 
                  opacity-0 transition-opacity group-hover:opacity-100 z-50"
        role="tooltip"
      >
        <div className="bg-gray-900/90 text-white text-sm rounded-lg p-3 relative">
          {content}
          <div
            className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 border-4 
                        border-transparent border-t-gray-900/90"
          />
        </div>
      </div>
    </div>
  );
}
