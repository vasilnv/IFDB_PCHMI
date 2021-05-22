import React, { useEffect } from 'react';

import { useAuth } from '../../contexts/AuthContext';

import './Home.scss';

const Home = ({

}) => {

    useEffect(() => {
        //requester(api.getChat('newChat')).get();
    }, [])

    const { currentUser } = useAuth();

    return (
        <div className="home-page">
            <div className="home-page-content">
                <div className="content-title">
                    Добре дошли в IFDb
                </div>
                <div className="content">
                    IFDb е революционна платформа, където потребителите могат да оценяват храната по нов и необикновен начин.
                    Целта на IFDb е да предоставя информация за ресторанти и ястия по територията на България. Полезен е както и на местните 
                    жители на даден град, така и на туристите и ценителите на ястията и атмосферата която носи храната.
                 </div>
            </div>
        </div>
    );
}

export default Home;
