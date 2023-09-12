
import '../styles/app.css';
import { useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';
import { TweetIconArea } from './main/center/tweet-icon-area';
import MainLeft from './main/left/main-left';
import Tweet from './main/center/tweet';
import { useTwitterContext } from '../context/tweet-context';
import axios from 'axios';
import { toast } from 'react-toastify';

function App() {
  const [tweets, setTweets] = useState([]);
  const { token, user } = useTwitterContext();
  const [tweet, setTweet] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:9000/tweet/', { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        console.log(response)
        setTweets(response.data)

      })
      .catch((error) => {
        toast('Hata oluştu :' + error);
      });
  }, []);

  console.log(tweets);

  const onTweetSend = () => {

    const input = {
      userId: user.id,
      content: tweet,
      tweetDate: new Date()
    };

    axios
      .post('http://localhost:9000/tweet/', input, { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        if (response.data.success) {
          toast("Tweet eklendi!")
          setTweets([response.data.tweet, ...tweets])
          setTweet('');
        } else {
          toast("Hata Oluştu : " + response.data.errorMessage);
        }
      })
      .catch((error) => {
        toast('Hata oluştu :' + error);
      });
  }

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
            <Input type='text' id='tweet' placeholder='Neler Oluyor?' value={tweet} onChange={(e) => { setTweet(e.target.value) }} />
          </div>
          <div className='tweet-icon-row'>
            <TweetIconArea />
            <Button onClick={onTweetSend}>Tweet</Button>
          </div>

        </div>
        {
          tweets?.map(tweet => (
            <Tweet tweet={tweet} />
          ))
        }
      </div>
      <div className='main-right'>
        c
      </div>
    </div>
  );
}

export default App;
