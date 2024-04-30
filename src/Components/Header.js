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
        <header className="h-16 flex bg-white justify-between items-center font-custom text-darkBlue shadow-md fixed w-full top-0 left-0">
            <h1 className="font-extrabold text-sm md:text-lg lg:text-2xl ml-4">Where in the World?</h1>
            <div className="flex-col justify-end items-center mr-4 fixed top-4 right-1">
                {/* <p className=" fixed right-5 text-xs md:text-base">{display}</p> */}
                {/* <button className="fixed w-12 bg-black rounded-full border-black border-2 h-4 right-6 top-9 md:top-10 md:right-9" onClick={themeToggle}>
                    <div className="w-4 h-full bg-blue rounded-full border-black border-2 translate-x-7"></div>
                </button> */}
            </div>
        </header>
    </>
);}

export default Header;