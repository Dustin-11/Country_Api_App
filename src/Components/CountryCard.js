import { useState, useEffect } from 'react';

const CountryCard = () => {
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');

                if(!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                const result = await response.json();
                const firstCountry = result[0];
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
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {country && (
            <ul className="text-sm flex-col justify-center w-full">
                {country.map((item, index) => (
                    <li key={index}>
                        <img src={item.flags.png}></img>
                        <p>{item.name?.common}</p>
                    </li>
                ))}
                
            </ul>
        )}
    </>
    );
};

export default CountryCard;