import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SingleCountry = ({sharedData}) => {
    
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch('https://restcountries.com/v3.1/all');
                const response = await fetch(`https://restcountries.com/v3.1/name/${sharedData}`);
// `https://restcountries.com/v3.1/name/${sharedData}`
                if(!response.ok) {
                    throw new Error(`HTTP Error! Status ${response.status}`);
                }
                const result = await response.json();
                setCountry(result[0]);
                // console.log(country.name.common);
            }
            catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data. Please try again.')
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [sharedData]);
    return (
        <>
            {loading && <p>Loading...</p>}
            {country &&
                (
                    <>
                <Link to="/Country_Api_App">
                <button className="mt-20 flex justify-center align-center pt-2 pb-0 px-8 gap-2 bg-white shadow-lg rounded">
                    <span><i className="material-icons">arrow_back</i></span>
                    <span>Back</span>   
                </button>
                </Link>
                <div>
                    <img src={country.flags?.png}></img>
                    <h1>{country.name?.common}</h1>
                    {country.nativeName && <p>Native Name: { new Intl.ListFormat(undefined, {
                        style: "long",
                        type: "conjunction",
                    }).format(
                        Object.values(country.nativeName).map((c) => c[0])
                    )}
                    </p>}
                    <p>Population:&nbsp;&nbsp;{country.population}</p>
                    <p>Region:&nbsp;&nbsp;{country.region}</p>
                    <p>Sub Region:&nbsp;&nbsp;{country.subregion}</p>
                    <p>Capital:&nbsp;&nbsp;{country.capital}</p>
                    <p>Top Level Domain:&nbsp;&nbsp;{country.tld}</p>
                    {country.languages && <p>Languages:&nbsp;&nbsp;{ new Intl.ListFormat(undefined, {
                        style: "long",
                        type: "conjunction",
                    }).format(
                        Object.values(country.languages).map((c) => c)
                    )}
                    </p>}
                    {country.currencies && <p>Currencies:&nbsp;&nbsp;{ new Intl.ListFormat(undefined, {
                        style: "long",
                        type: "conjunction",
                    }).format(
                        Object.values(country.currencies).map((c) => c.name)
                    )}
                    </p>}
                    <h3>Border Countries:&nbsp;&nbsp;</h3>
                    {console.log(country.borders)}
                    {country.borders && Object.values(country.borders).map((item, idex) => {
                        const fetchData = async () => {
                            const result = await fetch(`https://restcountries.com/v3.1/alpha?codes=${item}`);
                            const data = await result.json();
                        }
                        fetchData();
                        <div key={idex}>{Object.values[data[0].names.common]}</div> 
                    })}
                </div>
                </>)}
        </>
    );
};

export default SingleCountry;