import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

const iconMap = {
  success: <FaCheckCircle className="text-green-500 text-xl" />,
  error: <FaExclamationCircle className="text-red-500 text-xl" />,
  info: <FaInfoCircle className="text-blue-500 text-xl" />,
};

export default function ToastNotification({ visible, message, type, onClose }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: "spring", damping: 25 }}
      className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg max-w-md ${
        type === "success"
          ? "bg-green-100 border border-green-200"
          : type === "error"
          ? "bg-red-100 border border-red-200"
          : "bg-blue-100 border border-blue-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="pt-0.5">{iconMap[type]}</div>
        <div className="flex-1">
          <p className="font-medium text-gray-800">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close notification"
        >
          <FaTimes />
        </button>
      </div>
    </motion.div>
  );
}
