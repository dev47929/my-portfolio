import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle } from "lucide-react";

/**
 * ToastNotification
 * Floating animated notification that appears in the top-right corner.
 * @param {string|null} message - The message to display. Renders nothing when null.
 */
export default function ToastNotification({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-20 right-6 sm:right-12 z-50 bg-[#0c1017] border border-sky-500/40 p-3.5 rounded-xl shadow-2xl flex items-center gap-2.5 max-w-sm"
          id="toast-notification"
        >
          <CheckCircle className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="text-xs font-mono font-medium text-slate-200">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
