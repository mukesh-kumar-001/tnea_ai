import { Link, useRouterState } from "@tanstack/react-router";
import { GraduationCap, Menu, X, Moon, Sun, Search } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FloatingChat } from "@/components/floating-chat";
import { CommandPalette } from "@/components/command-palette";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/colleges", label: "Colleges" },
  { to: "/compare", label: "Compare" },
  { to: "/rank-predictor", label: "Rank Predictor" },
  { to: "/counselling", label: "Counselling" },
  { to: "/choice-filling", label: "Choice Filling" },
  { to: "/cutoffs", label: "Cutoffs" },
  { to: "/ai-chat", label: "Assistant" },
  { to: "/about", label: "About" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const isDark =
      typeof window !== "undefined" &&
      document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const openCommandPalette = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true })
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      {/* ── Header ── */}
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-200 print:hidden",
          scrolled
            ? "border-border/60 glass shadow-xs"
            : "border-transparent bg-background/60 backdrop-blur-md"
        )}
      >
        <div className="container-page flex h-14 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
              <GraduationCap className="size-4" />
            </div>
            <span className="text-base font-bold tracking-tight">
              TNEA<span className="text-primary">.ai</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV.map((item) => {
              const active =
                pathname === item.to ||
                (item.to !== "/" && pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors duration-150",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-2 -bottom-[9px] h-[2px] rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Search trigger */}
            <Button
              variant="ghost"
              size="sm"
              onClick={openCommandPalette}
              className="hidden sm:inline-flex h-8 gap-2 text-muted-foreground hover:text-foreground px-2.5 rounded-lg"
            >
              <Search className="size-3.5" />
              <span className="text-xs">Search</span>
              <kbd className="hidden md:inline-flex h-5 items-center rounded border border-border/60 bg-muted/40 px-1 text-[10px] font-mono text-muted-foreground/60">
                ⌘K
              </kbd>
            </Button>

            {/* Dark mode */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              className="size-8 rounded-lg"
            >
              <motion.div
                key={dark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {dark ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </motion.div>
            </Button>

            {/* CTA */}
            <Link to="/counselling" className="hidden sm:block">
              <Button
                size="sm"
                className="h-8 rounded-lg text-xs px-3.5 shadow-sm"
              >
                Get Started
              </Button>
            </Link>

            {/* Mobile menu */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden size-8 rounded-lg"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden border-t border-border/60"
            >
              <div className="container-page py-3 grid gap-0.5">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.2 }}
                  >
                    <Link
                      to={item.to}
                      className="px-3 py-2.5 text-sm font-medium rounded-lg text-foreground hover:bg-muted/60 block transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Main ── */}
      <main className="flex-1">{children}</main>

      {/* ── Footer ── */}
      <footer className="mt-20 border-t border-border/60 bg-surface-muted/30 blueprint-dots print:hidden">
        <div className="container-page py-12 grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">
                <GraduationCap className="size-3.5" />
              </div>
              <span className="text-sm font-bold">
                TNEA<span className="text-primary">.ai</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-md leading-relaxed">
              An independent, data-driven assistant for Tamil Nadu Engineering
              Admissions. Not affiliated with the official DoTE Tamil Nadu
              portal.
            </p>
          </div>
          <div>
            <h4 className="technical-label mb-3">Tools</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <Link
                  to="/colleges"
                  className="transition-colors hover:text-primary"
                >
                  Search Colleges
                </Link>
              </li>
              <li>
                <Link
                  to="/rank-predictor"
                  className="transition-colors hover:text-primary"
                >
                  Rank Predictor
                </Link>
              </li>
              <li>
                <Link
                  to="/cutoffs"
                  className="transition-colors hover:text-primary"
                >
                  Cutoffs
                </Link>
              </li>
              <li>
                <Link
                  to="/choice-filling"
                  className="transition-colors hover:text-primary"
                >
                  Choice Filling
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="technical-label mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/ai-chat"
                  className="transition-colors hover:text-primary"
                >
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="transition-colors hover:text-primary"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40">
          <div className="container-page py-4 flex flex-wrap gap-2 justify-between text-[11px] text-muted-foreground/60">
            <span>
              © {new Date().getFullYear()} TNEA.ai — Independent Admissions
              Intelligence
            </span>
            <span className="font-mono text-[10px]">v2.0</span>
          </div>
        </div>
      </footer>

      <div className="print:hidden">
        <FloatingChat />
        <CommandPalette />
      </div>
    </div>
  );
}
