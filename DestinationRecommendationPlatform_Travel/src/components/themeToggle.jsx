import { useUI } from "../../hooks/useUI";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useUI();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <FaSun className="text-yellow-400 text-lg" />
      ) : (
        <FaMoon className="text-gray-700 text-lg" />
      )}
    </button>
  );
}
