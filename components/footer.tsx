export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} Nigel Goh
        </p>
      </div>
    </footer>
  );
}
