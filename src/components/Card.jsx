import { motion } from "framer-motion";

const Card = ({ children, className = "", hover = true }) => (
  <motion.div
    whileHover={hover ? { y: -4 } : undefined}
    className={`rounded-xl border border-line bg-panel ${className}`}
  >
    {children}
  </motion.div>
);

export default Card;
