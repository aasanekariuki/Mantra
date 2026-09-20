import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { label: string; to: string }[];
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 flex flex-col bg-ink pt-28 md:hidden"
        >
          <nav className="container-mantra flex flex-1 flex-col justify-center gap-2">
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={link.to} onClick={onClose} className="block py-3 font-display text-4xl text-paper">
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + links.length * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/get-involved" onClick={onClose} className="mt-6 inline-flex items-center rounded-full border border-ember/50 px-6 py-3 text-ember">
                Get Involved
              </Link>
            </motion.div>
          </nav>
          <div className="container-mantra flex justify-between border-t border-line py-6 text-xs text-mist">
            <span>MANTRA</span>
            <span>Nairobi, Kenya</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
