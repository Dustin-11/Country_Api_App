import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SingleCountry = ({sharedData}) => {
    
    const [country, setCountry] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/name/${sharedData}`);

                if(!response.ok) {
                    throw new Error(`HTTP Error! Status ${response.status}`);
                }
                const result = await response.json();
                setCountry(result[0]);
            }
            catch (err) {
                console.error('Error fetching data:', err);
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
                    <div className="text-darkBlue lg:px-4 xl:px-16">
                <Link to="/Country_Api_App">
                <button className="mt-24 flex justify-center align-center pt-2 pb-0 px-8 gap-2 bg-white shadow-lg rounded">
                    <span><i className="material-icons">arrow_back</i></span>
                    <span>Back</span>   
                </button>
                </Link>
                <div className="flex flex-col justify-center gap-y-2 md:flex-row md:gap-x-20">
                    <img className="mt-14 w-4/5 mx-auto lg:ml-0 lg:mr-0 xl:w-1/2" src={country.flags?.png}></img>
                    <div className="w-4/5 mx-auto md:mt-14 lg:flex lg:justify-around lg:ml-0 lg:mr-0">
                        <div className="text-sm sm:text-lg lg:text-xl lg:pt-4">
                            <h1 className="font-extrabold mt-4 mb-2 sm:text-2xl lg:text-3xl">{country.name?.common}</h1>
                            {country.nativeName && 
                            <p><span className="font-bold">Native Name:</span>
                                { new Intl.ListFormat(undefined, {
                                style: "long",
                                type: "conjunction",
                                }).format(
                                Object.values(country.nativeName).map((c) => c[0])
                                )}
                            </p>}
                            <p><span className="font-bold">Population:</span>&nbsp;&nbsp;{country.population?.toLocaleString()}</p>
                            <p><span className="font-bold">Region:</span>&nbsp;&nbsp;{country.region}</p>
                            <p><span className="font-bold">Sub Region:</span>&nbsp;&nbsp;{country.subregion}</p>
                            <p><span className="font-bold">Capital:</span>&nbsp;&nbsp;{country.capital}</p>
                        </div>
                        <div className="lg:mx-4 lg:pt-[51px] text-sm sm:text-lg lg:text-xl">
                            <p className="mt-6"><span className="font-bold">Top Level Domain:</span>&nbsp;&nbsp;{country.tld}</p>
                            {country.languages && <p><span className="font-bold">Languages:</span>&nbsp;&nbsp;{ new Intl.ListFormat(undefined, {
                                style: "long",
                                type: "conjunction",
                            }).format(
                                Object.values(country.languages).map((c) => c)
                            )}
                            </p>}
                            {country.currencies && <p><span className="font-bold">Currencies:</span>&nbsp;&nbsp;{ new Intl.ListFormat(undefined, {
                                style: "long",
                                type: "conjunction",
                            }).format(
                                Object.values(country.currencies).map((c) => c.name)
                            )}
                            </p>}
                            {/* <h3>Border Countries:&nbsp;&nbsp;</h3> */}
                            {/* {country.borders && 
                                Object.values(country.borders).map(async (item, index) => {
                                    (async () => {
                                    const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${item}`);
                                    const result = await response.json();
                                    // console.log(result);
                                    // const promises = Promise.all(result);
                                    setBorderCountries(result);
                                    // console.log(borderCountries[0]);
                                    }
                                    )()
                                return (<div key={index}>{borderCountries.name?.common}</div>);
                                })}; */}
                        </div>
                    </div>
                </div>
                </div>
            </>)}
        </>
    );
};

export default SingleCountry;