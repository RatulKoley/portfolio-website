import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { portfolio } from "../data/portfolio";
import Button from "./Button";
import Container from "./Container";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const { pathname } = useLocation();
  const onShop = pathname.startsWith("/shop");

  const anchorNav = portfolio.navigation.slice(1, -1);
  const linkCls = ({ isActive }) =>
    `text-sm transition-colors ${isActive ? "text-white" : "text-zinc-400 hover:text-white"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink/90 backdrop-blur-xl">
      <Container className="flex h-17 items-center justify-between">
        <Link to="/" aria-label={`${portfolio.name} home`} className="flex items-center gap-3" onClick={closeMenu}>
          <span className="text-sm font-semibold tracking-tight text-white">{portfolio.name}</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
          {onShop ? (
            <NavLink to="/shop" end className={linkCls}>Shop</NavLink>
          ) : (
            <>
              {anchorNav.map((item) => (
                <a key={item.href} href={item.href} className="text-sm text-zinc-400 transition-colors hover:text-white">{item.label}</a>
              ))}
              <NavLink to="/shop" className={linkCls}>Shop</NavLink>
            </>
          )}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <ThemeToggle />
          <Button href={portfolio.resume} download className="px-3.5 py-2"><Download className="size-3.5" /> Resume</Button>
        </div>
        <button type="button" className="grid size-10 place-items-center rounded-lg border border-line text-zinc-300 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-white/[0.06] bg-ink lg:hidden">
            <Container className="flex flex-col py-4">
              {onShop ? (
                <Link to="/" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm text-zinc-300 hover:bg-white/[0.04]">← Portfolio home</Link>
              ) : (
                anchorNav.map((item) => (
                  <a key={item.href} href={item.href} onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm text-zinc-300 hover:bg-white/[0.04]">{item.label}</a>
                ))
              )}
              <Link to="/shop" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm font-medium text-white hover:bg-white/[0.04]">Shop</Link>
              <Button href={portfolio.resume} download className="mt-3 w-full"><Download className="size-4" /> Download Resume</Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
