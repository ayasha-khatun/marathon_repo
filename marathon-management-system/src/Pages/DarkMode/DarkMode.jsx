import React from "react";
import Moon from '../../assets/Moon.svg'
import Sun from '../../assets/Sun.svg'


import "./DarkMode.css";

const DarkMode = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data_theme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data_theme", "light");
  };

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
      />
        <label className="dark_mode_label text-center" htmlFor="darkmode-toggle">
        <div className="flex gap-4">
            <img src={Sun} alt="Sun" className="sun_icon w-4 h-4" />
            <img src={Moon} alt="Moon" className="moon_icon w-4 h-4" />
        </div>
        </label>

    </div>
  );
};

export default DarkMode;
