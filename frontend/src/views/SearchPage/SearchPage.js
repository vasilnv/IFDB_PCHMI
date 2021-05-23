import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import StarFill from 'assets/star-fill.svg';
import userService from 'services/userService';

import './SearchPage.scss';

const restaurants = [{ name: 'Batkoviq', stars: 4 }, { name: 'Putkava Torta', stars: 4 }, { name: 'Batkoviq', stars: 4 }, { name: 'Batkoviq', stars: 4 }, { name: 'Batkoviq', stars: 4 }, { name: 'Batkoviq', stars: 4 }, { name: 'Batkoviq', stars: 4 }, { name: 'Batkoviq', stars: 4 }, { name: 'Batkoviq', stars: 4 }, { name: 'Batkoviq', stars: 4 }, { name: 'Batkoviq', stars: 4 }, { name: 'Dedoviq', stars: 4 }, { name: 'Batkoviq', stars: 4 }, { name: 'Batkoviq', stars: 4 },];

const SearchPage = ({

}) => {
    const { search } = useParams();
    const [results, setResult] = useState([]);

    const getRestaurants = async () => {return await userService.getRestaurants()};

    useState(() => {
        userService.getRestaurants().then(x => setResult(x));
    }, [])

    const filterOutput = () => {
        
    };

    return (
        <div className="search-page-wrapper">
            <h1 className="header-title"> {`Ти потърси: ${search}`} </h1>
            <div className="header-second-title">
                Ресторанти които отговарят на търсенето:
            </div>
            <div className="content-wrapper">
                {
                    results.map((x, index) => {

                        console.log(x);
                        return (
                            <div>
                            </div>
                        )

                        return (
                            <div key={index} className="restaurant-wrapper" onClick={() => alert(x.name)}>
                                <div>
                                    {x.name}
                                </div>
                                <div>
                                    {
                                        Array.from(Array(x.stars).keys()).map(x => {
                                            return <img src={StarFill} alt="restaurant" />
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default SearchPage;
