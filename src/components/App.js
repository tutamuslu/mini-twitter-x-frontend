import { Link } from 'react-router-dom';
import '../styles/app.css';
import { useState } from 'react';
import { Button, Input } from 'reactstrap';
import MainLeftLinks from './main/main-left-links';
import { MainLeftProfile } from './main/main-left-profile';

function App() {
  const [tweets, setTweets] = useState([]);

  console.log(tweets);

  return (
    <div className='main main-area'>
      <div className='main-left'>
        <div className='main-left-content'>
          <img src="images/twitter-logo.png" height={25} width={25} alt="logo" />
          <MainLeftLinks />
          <Button>Tweet</Button>
          <MainLeftProfile />
        </div>
      </div>
      <div className='main-center'>
        <div className='main-center-top'>
          Anasayfa
        </div>
        <div className='main-center-tweet'>
          <div className='user-input-area'>
            <img src='images/profile-empty.png' width={50} height={50} alt='profile' />
            <Input type='text' id='tweet' placeholder='Neler Oluyor?' />
          </div>
          <div className='icon-area'>

          </div>
        </div>
      </div>
      <div className='main-right'>
        c
      </div>
    </div>
  );
}

export default App;
