"use client";

import { useTypewriter } from "@/hooks/use-typewriter";

function Cursor({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <span
      className="inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle animate-pulse"
      aria-hidden="true"
    />
  );
}

export function Hero() {
  const comment     = useTypewriter({ text: "// ENTITY_PROFILE",                startDelay: 80,   typeSpeed: 14 });
  const name        = useTypewriter({ text: "Nigel Goh",                         startDelay: 320,  typeSpeed: 28 });
  const tag         = useTypewriter({ text: "# MANIFESTO",                       startDelay: 680,  typeSpeed: 14 });
  const manifesto   = useTypewriter({ text: '"Game systems engineer & AI developer."', startDelay: 860, typeSpeed: 12 });
  const sysTag      = useTypewriter({ text: "## SYSTEM_DESCRIPTION",             startDelay: 1380, typeSpeed: 12 });
  const description = useTypewriter({ text: "I build things that run fast, think smart, and feel good to play. CS student at Digipen Singapore — working across game engines, machine learning, and developer tooling.", startDelay: 1580, typeSpeed: 7 });
  const stack       = useTypewriter({ text: "C++ · Python · Unreal · LLM tooling · gRPC", startDelay: 3100, typeSpeed: 10 });

  return (
    <div className="max-w-3xl">
      <div className="mb-2">
        <span className="text-sm font-mono text-muted-foreground">
          {comment.displayed}<Cursor visible={comment.showCursor} />
        </span>
      </div>

      <div className="font-serif text-6xl md:text-7xl lg:text-8xl text-foreground leading-[0.9] tracking-tight mb-16 min-h-[1em]">
        {name.displayed}<Cursor visible={name.showCursor} />
      </div>

      <div className="mb-4">
        <span className="text-sm font-mono text-primary">
          {tag.displayed}<Cursor visible={tag.showCursor} />
        </span>
      </div>

      <div className="font-serif text-2xl md:text-3xl italic text-foreground/90 mb-16 min-h-[1.2em]">
        {manifesto.displayed}<Cursor visible={manifesto.showCursor} />
      </div>

      <div className="mb-4">
        <span className="text-sm font-mono text-muted-foreground">
          {sysTag.displayed}<Cursor visible={sysTag.showCursor} />
        </span>
      </div>

      <div className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl min-h-[2em]">
        {description.displayed}<Cursor visible={description.showCursor} />
      </div>

      <div className="mb-16 min-h-[1.2em]">
        <span className="text-xs font-mono text-muted-foreground/60 tracking-wider">
          {stack.displayed}<Cursor visible={stack.showCursor} />
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground/30 select-none">
        <span>scroll to continue</span>
        <span className="animate-bounce">↓</span>
      </div>
    </div>
  );
}
