import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Filters from "./Filters";



const CountryCard = ({countrySelection}) => {
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [region, setRegion] = useState("");
    const handleSelection = (CountryID) => {
        countrySelection(CountryID);
    }
    const handleRegionSelection = (regionSel) => {
        setRegion(regionSel);
        console.log(region);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');

                if(!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                const result = await response.json();
                setCountry(result);
            }
         catch(err) {
            console.error('Error fetching data:', err);
            setError('Error fetching data. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    fetchData();
}, []);

    useEffect(() => {
        const fetchRegion = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
                if(!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCountry([]);
                setCountry(data);
            }
            catch(err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data. Please try again.')
            }
            finally {
                setLoading(false);
            }
        };
        fetchRegion();
    }, [region])

return(
    <>
        <Filters regionSelection={handleRegionSelection}/>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {country && (
            <ul className="text-sm text-darkBlue flex flex-col sm:flex-wrap sm:flex-row justify-center sm:justify-between w-full px-6">
                {country.map((item, index) => (
                    
                    <div key={index} className="mx-auto bg-white mb-12 pb-12 rounded-md shadow-lg w-4/5 sm:w-5/12 lg:w-[30%] xl:w-[22%]">
                        <Link to="/SingleCountry" onClick={() => handleSelection(item.name?.common)}>
                        <li className="flex flex-col h-full">
                            
                            <img src={item.flags.png} className="rounded-t-md h-1/2"></img>
                            <h1 className="text-lg my-4 pl-6 font-extrabold w-4/5">{item.name?.common}</h1>
                            <p className="pl-6"><span className="font-bold">Population:</span>&nbsp;&nbsp;{item.population.toLocaleString()}</p>
                            <p className="pl-6 mt-2"><span className="font-bold">Region:</span>&nbsp;&nbsp;{item.region}</p>
                            <p className="pl-6 mt-2"><span className="font-bold">Capitol:</span>&nbsp;&nbsp;{item.capital}</p>
                        </li>
                        </Link>
                    </div>
                    
                ))}
                
            </ul>
        )}
    </>
    );
};

export default CountryCard;