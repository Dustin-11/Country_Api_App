import { useState, useEffect } from 'react';

const CountryCard = () => {
    const [country, setCountry] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await fetch('https://restcountries.com/v3.1/all');

                if(!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                const result = await response.json();
                const firstCountry = Object.keys(result)[0];
                setCountry(result[firstCountry]);
            }
         catch(err) {
            console.error('Error fetching data:', err);
            setError('Error fethcing data. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    fetchData();
}, []);

return(
    <>
    <p>{country.name.common}</p>
    </>
)
}

export default CountryCard;