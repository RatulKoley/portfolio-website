import { motion } from "framer-motion";

const Button = ({ children, href, variant = "primary", className = "", ...props }) => {
  const styles = {
    primary: "border border-brand bg-brand text-white shadow-[0_8px_24px_rgba(37,99,235,0.22)] hover:bg-blue-500",
    secondary: "border border-line bg-white/[0.03] text-white hover:border-zinc-500 hover:bg-white/[0.06]",
    ghost: "text-zinc-300 hover:text-white",
  };

  const content = <>{children}</>;
  const shared = {
    className: `inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${styles[variant]} ${className}`,
    ...props,
  };

  if (href) {
    return <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} href={href} {...shared}>{content}</motion.a>;
  }

  return (
    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} {...shared}>{content}</motion.button>
  );
};

export default Button;
