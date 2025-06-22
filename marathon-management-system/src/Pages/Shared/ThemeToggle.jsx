import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdOutlineNightlight } from "react-icons/md";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? <MdOutlineNightlight className="w-6 h-6"></MdOutlineNightlight> : <CiLight className="text-black w-6 h-6 font-semibold"></CiLight>}
    </button>
  );
};

export default ThemeToggle;
