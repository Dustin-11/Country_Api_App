import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Filters from "./Filters";



const CountryCard = ({countrySelection}) => {
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const handleSelection = (CountryID) => {
        countrySelection(CountryID);
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

return(
    <>
        <Filters />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {country && (
            <ul className="text-sm flex flex-col justify-center w-full px-6">
                {country.map((item, index) => (
                    
                    <div key={index} className="mx-auto bg-white mb-12 pb-12 rounded-md shadow-md">
                        <Link to="/SingleCountry" onClick={() => handleSelection(item.name?.common)}>
                        <li>
                            
                            <img src={item.flags.png} className="rounded-t-md"></img>
                            <h1 className="text-lg my-4 pl-6 font-extrabold">{item.name?.common}</h1>
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