import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Filters from "./Filters";



const CountryCard = ({countrySelection}) => {
    const [country, setCountry] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [region, setRegion] = useState("all");
    const [searching, setSearching] = useState("");
    const isFirstRender = useRef(true);
    const handleSelection = (CountryID) => {
        countrySelection(CountryID);
    }
    const handleRegionSelection = (regionSel) => {
        setRegion(regionSel);
    }
    const handleSearch = (typedSearch) => {
        setSearching(typedSearch);
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
                setAllCountries(result);
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
            let response;
            try {
                
                if(isFirstRender.current) {
                    isFirstRender.current = false;
                }
                else {
                    if(region.length > 3) {
                        response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
                    }
                    else {
                        response = await fetch('https://restcountries.com/v3.1/all');
                    }
                if(!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCountry([]);
                setAllCountries([]);
                setCountry(data);
                setAllCountries(data);
                } 
            }
            catch(err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data. Please try again.');
            }
            finally {
                setLoading(false);
            }
        };
        fetchRegion();
    }, [region]);
    
    useEffect(() => {
        const searchCountries = () => {
           const filtered = allCountries.filter(count => count.name?.common.toLowerCase().includes(searching.toLowerCase()));
           console.log(searching);
           setCountry(filtered);
        }
        searchCountries();
    }, [searching]);

return(
    <>
        <Filters regionSelection={handleRegionSelection} search={handleSearch}/>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {country && (
            <ul className="text-sm text-darkBlue flex flex-col sm:flex-wrap sm:flex-row justify-center m:justify-center lg:justify-start w-full px-6">
                {country.map((item, index) => (
                    
                    <div key={index} className="mx-auto bg-white mb-12 pb-12 rounded-md shadow-lg w-4/5 sm:w-5/12 lg:w-[30%] xl:w-[22%] lg:mx-0 lg:ml-7 xl:ml-9">
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