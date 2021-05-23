import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';

import StarFill from 'assets/star-fill.svg';
import userService from 'services/userService';

import './SearchPage.scss';

const SearchPage = ({

}) => {
    const { search } = useParams();
    const [results, setResult] = useState([]);

    let history = useHistory();
    useState(() => {
        userService.getRestaurants().then(x => setResult(x));
    }, [search])

    const filterOutput = (data) => {
        const result = data.filter(x => {
            const isWithThisName = x.name === search;
            const haveFood = x.foods.includes(search);

            return isWithThisName || haveFood;
        })

        return result;
    };

    return (
        <div className="search-page-wrapper">
            <h1 className="header-title"> {`Ти потърси: ${search}`} </h1>
            <div className="header-second-title">
                Ресторанти които отговарят на търсенето:
            </div>
            <div className="content-wrapper">
                {
                    filterOutput(results).map((x, index) => {

                        return (
                            <div key={x.id} className="restaurant-wrapper" onClick={() => history.push(`/restaurant/${x.name}`)}>
                                <div>
                                    {x.name}
                                </div>
                                <div>
                                    {
                                        Array.from(Array(4).keys()).map((x, innerIndex) => {
                                            return <img key={innerIndex} src={StarFill} alt="restaurant" />
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
