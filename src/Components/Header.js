import { useState } from "react";
import Filters from "./Filters";

const Header = () => {
    const [theme, setTheme] = useState(false);
    const [display, setDisplay] = useState("Light Mode");
    const themeToggle = () => {
        setTheme(!theme);
        setDisplay(theme ? "Dark Mode" : "Light Mode");
    }

return (
    <>
        <header className="h-16 flex bg-white justify-between items-center font-custom text-darkBlue shadow-md fixed w-full top-0 left-0">
            <h1 className="font-extrabold text-sm ml-4">Where in the World?</h1>
            <div className="flex-col justify-end items-center mr-4 fixed top-4 right-1">
                <p className="text-xs">{display}</p>
                <button className="inline-block w-12 bg-black rounded-full border-black border-2 h-4 ml-2" onClick={themeToggle}>
                    <div className="w-4 h-full bg-blue rounded-full border-black border-2 translate-x-7"></div>
                </button>
            </div>
        </header>
    </>
);}

export default Header;