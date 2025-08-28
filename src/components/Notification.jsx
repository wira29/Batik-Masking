import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

const Notification = ({ notification }) => {
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          key={notification.message}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`fixed top-10 right-6 z-[999] px-6 py-4 rounded-lg shadow-lg border ${
            notification.type === "success"
              ? "bg-green-900 border-green-700 text-green-100"
              : "bg-red-900 border-red-700 text-red-100"
          }`}
        >
          <div className="flex items-center space-x-3">
            {notification.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;
