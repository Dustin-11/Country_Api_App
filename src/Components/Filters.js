import { useState, useEffect } from "react";

const Filters = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [region, setRegion] = useState("");
    const changeRegion = (e) => {
        setRegion(e.target.value);
    }
    const updateTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <>
        <div className="mt-20 bg-white shadow-lg rounded-md pl-4 pt-1 pb-1 flex item-center w-full text-m text-darkGray">
            <span className="pr-4">
                <i className="material-icons pt-1">search</i>
            </span>
            <input className="pl-2 w-full text-xs" placeholder="Search for a country..." onChange={updateTerm}></input>
        </div>
        <div className="text-darkGray text-sm">
            {/* <label htmlFor="regions">Filter by Region</label> */}
            <select id="regions" name="regions" value={region} onChange={changeRegion}
            className="mt-5 mb-5 p-2 rounded-md shadow-lg text-xs ">
                <option value="" disabled hidden >Filter by Region</option>
                <option value="All">All</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
        </div>
        </>
    );
}

export default Filters;