"use client";

import { useRouter } from "next/navigation";
import { usePageTransition } from "@/components/page-transition-provider";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Drop-in replacement for <Link> or <a> that triggers the
 * typewriter backspace animation before navigating.
 */
export function TransitionLink({ href, children, className }: TransitionLinkProps) {
  const router = useRouter();
  const { startExit } = usePageTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Tell the current page to start deleting, then navigate when done
    startExit(() => router.push(href));
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
