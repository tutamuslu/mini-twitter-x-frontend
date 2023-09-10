
import '../styles/app.css';
import { useState } from 'react';
import { Button, Input } from 'reactstrap';
import { TweetIconArea } from './main/center/tweet-icon-area';
import MainLeft from './main/left/main-left';
import Tweet from './main/center/tweet';

function App() {
  const [tweets, setTweets] = useState([]);

  console.log(tweets);

  return (
    <div className='main main-area'>
      <MainLeft />
      <div className='main-center'>
        <div className='main-center-top'>
          Anasayfa
        </div>
        <div className='main-center-tweet'>
          <div className='user-input-area'>
            <img src='images/profile-empty.png' width={50} height={50} alt='profile' />
            <Input type='text' id='tweet' placeholder='Neler Oluyor?' />
          </div>
          <div className='tweet-icon-row'>
            <TweetIconArea />
            <Button>Tweet</Button>
          </div>

        </div>
        <Tweet/>
        <Tweet/>
        <Tweet/>
        <Tweet/>
      </div>
      <div className='main-right'>
        c
      </div>
    </div>
  );
}

export default App;
