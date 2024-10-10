"use client";
import { ActiveLinkProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({ url, children }: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = url === pathname;
  return (
    <Link
      href={url}
      className={`p-3 rounded-md flex items-center gap-3 dark:text-grayDark text-base transition-all font-medium text-slate-600 ${
        isActive
          ? "!text-primary bg-primary bg-opacity-10 svg-animate font-semibold"
          : "hover:!text-primary hover:!bg-primary hover:!bg-opacity-10"
      } `}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
