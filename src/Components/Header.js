import { useState } from "react";

const Header = () => {
    const [theme, setTheme] = useState(false);
    const [display, setDisplay] = useState("Light Mode");
    const themeToggle = () => {
        setTheme(!theme);
        setDisplay(theme ? "Dark Mode" : "Light Mode");
    }

return (
    <>
        <header className="flex justify-between items-center">
            <h1>What in the World?</h1>
            <div className="border-green-500 border-2 flex">
                <p>{display}</p>
                <button className="inline-block w-16 bg-black rounded-full border-black border-2" onClick={themeToggle}>
                    <div className="w-4 h-full bg-white rounded-full border-black border-2 translate-x-11"></div>
                </button>
            </div>
        </header>
    </>
);}

export default Header;