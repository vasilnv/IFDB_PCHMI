import React, { useEffect } from 'react';

import { useAuth } from '../../contexts/AuthContext';

const Home = ({

}) => {

  useEffect(() => {
    //requester(api.getChat('newChat')).get();
  }, [])

  const { currentUser } = useAuth();

  return (
    <div className="Home">
      <header className="Home-header">
      </header>
    </div>
  );
}

export default Home;
