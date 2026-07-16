import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Compass, TrendingUp, Sparkles, ListChecks, LineChart, MessageSquare,
  Search, Info, LayoutDashboard, ArrowRight,
} from "lucide-react";

const ROUTES = [
  { to: "/", label: "Home", icon: Search, keywords: "home landing" },
  { to: "/colleges", label: "College Explorer", icon: Compass, keywords: "colleges explore search filter" },
  { to: "/rank-predictor", label: "Rank Predictor", icon: TrendingUp, keywords: "rank predict cutoff estimate" },
  { to: "/counselling", label: "AI Counselling", icon: Sparkles, keywords: "counsel recommend dream target safe ai" },
  { to: "/choice-filling", label: "Choice Filling", icon: ListChecks, keywords: "choice fill preference list order" },
  { to: "/cutoffs", label: "Cutoff Explorer", icon: LineChart, keywords: "cutoff history chart trend year" },
  { to: "/ai-chat", label: "AI Assistant", icon: MessageSquare, keywords: "chat ask question assistant help" },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, keywords: "dashboard saved workspace" },
  { to: "/about", label: "About", icon: Info, keywords: "about mission team" },
] as const;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const filtered = ROUTES.filter((r) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      r.label.toLowerCase().includes(q) ||
      r.keywords.includes(q)
    );
  });

  // Reset selection when query changes
  useEffect(() => { setSelectedIndex(0); }, [query]);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = useCallback(
    (to: string) => {
      setOpen(false);
      setQuery("");
      navigate({ to });
    },
    [navigate]
  );

  // Arrow key navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex].to);
      }
    },
    [filtered, selectedIndex, handleSelect]
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
          />

          {/* Palette */}
          <motion.div
            className="fixed left-1/2 top-[15%] z-50 w-full max-w-lg -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="overflow-hidden rounded-xl border border-border/60 bg-popover shadow-2xl">
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-border/60 px-4">
                <Search className="size-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search pages, tools, features..."
                  className="flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground/60"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border/80 bg-muted/50 px-1.5 text-[10px] font-mono font-medium text-muted-foreground">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[320px] overflow-y-auto p-1.5">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    No results found
                  </div>
                ) : (
                  filtered.map((route, i) => {
                    const Icon = route.icon;
                    const isActive = i === selectedIndex;
                    return (
                      <button
                        key={route.to}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          isActive
                            ? "bg-primary/8 text-foreground"
                            : "text-foreground/80 hover:bg-muted/60"
                        }`}
                        onClick={() => handleSelect(route.to)}
                        onMouseEnter={() => setSelectedIndex(i)}
                      >
                        <div
                          className={`grid size-8 place-items-center rounded-lg shrink-0 ${
                            isActive
                              ? "bg-primary/12 text-primary"
                              : "bg-muted/60 text-muted-foreground"
                          }`}
                        >
                          <Icon className="size-4" />
                        </div>
                        <span className="flex-1 font-medium">{route.label}</span>
                        {isActive && (
                          <ArrowRight className="size-3.5 text-muted-foreground" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer hint */}
              <div className="border-t border-border/60 px-4 py-2 flex items-center gap-4 text-[10px] text-muted-foreground/60">
                <span className="flex items-center gap-1">
                  <kbd className="inline-flex h-4 items-center rounded border border-border/60 bg-muted/30 px-1 font-mono">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="inline-flex h-4 items-center rounded border border-border/60 bg-muted/30 px-1 font-mono">↵</kbd>
                  open
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="inline-flex h-4 items-center rounded border border-border/60 bg-muted/30 px-1 font-mono">esc</kbd>
                  close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
