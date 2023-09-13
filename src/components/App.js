
import '../styles/app.css';
import { useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';
import { TweetIconArea } from './main/center/tweet-icon-area';
import MainLeft from './main/left/main-left';
import Tweet from './main/center/tweet';
import { useTwitterContext } from '../context/tweet-context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function App() {
  const [tweets, setTweets] = useState([]);
  const { token, user, setToken } = useTwitterContext();
  const [tweet, setTweet] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:9000/tweet/', { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        console.log(response)
        // tweet tarihine göre sıralyalım
        const sortedTweets = response.data.sort(function (a, b) {
          return new Date(b.tweetDate) - new Date(a.tweetDate);
        });
        setTweets([...sortedTweets])

      })
      .catch((error) => {
        // yetki hatası alındıysa başa dönsün
        if (error.response.status === 401) {
          setToken(-1);
          navigate('/signin');
        }
        toast('Hata oluştu :' + error);
      });
  }, []);

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
          const newArray = [response.data.tweet, ...tweets]
          setTweets([...newArray])
          setTweet('');
        } else {
          toast("Hata Oluştu : " + response.data.errorMessage);
        }
      })
      .catch((error) => {
        toast('Hata oluştu :' + error);
      });
  }

  const onDeleteTweet = (id) => {
    axios.delete('http://localhost:9000/tweet/' + id, { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        if (response.data.success) {
          const newTweets = tweets?.filter(x => x.id !== id);
          setTweets([...newTweets])
          toast("Tweet Silindi!");
        } else {
          toast("Hata oluştu : " + response.data.errorMessage);
        }
      })
      .catch((error) => {
        toast('Hata oluştu :' + error);
      });
  }

  const onTweetUpdate = (id, newValue) => {
    const input = {
      userId: user.id,
      content: newValue,
      tweetDate: new Date()
    };
    axios.put('http://localhost:9000/tweet/' + id, input, { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        if (response.data.success) {
          const copyTweets = [...tweets];
          copyTweets.find(x => x.id === id).content = newValue;
          setTweets([...copyTweets])
          toast("Tweet Güncellendi.!");
        } else {
          toast("Hata oluştu : " + response.data.errorMessage);
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
            <Tweet tweet={tweet} onDeleteTweet={onDeleteTweet} onTweetUpdate={onTweetUpdate} />
          ))
        }
      </div>
      <div className='main-right'>
        <div className='search-box'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <mask id="mask0_11_1470" style={{"mask-type":"alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#C4C4C4" />
              </mask>
              <g mask="url(#mask0_11_1470)">
                <path d="M21.53 20.47L17.87 16.81C19.195 15.24 20 13.214 20 11C20 6.03 15.97 2 11 2C6.03 2 2 6.03 2 11C2 15.97 6.03 20 11 20C13.215 20 15.24 19.196 16.808 17.87L20.468 21.53C20.615 21.676 20.808 21.75 20.998 21.75C21.188 21.75 21.383 21.677 21.528 21.53C21.823 21.237 21.823 20.763 21.53 20.47ZM3.5 11C3.5 6.865 6.865 3.5 11 3.5C15.135 3.5 18.5 6.865 18.5 11C18.5 15.135 15.135 18.5 11 18.5C6.865 18.5 3.5 15.135 3.5 11Z" fill="#5C6C79" />
              </g>
            </svg>
          </div>
          <Input placeholder="Twitter'de Ara"></Input>
        </div>
        <div className='trends'>
          <h2>Senin için Trendler</h2>
          <div className='trend'>
            <span>Almanya'da Trend</span>
            <h3>Revolution</h3>
            <span>50.4K Tweet</span>
          </div>
          <div className='trend'>
            <span>Almanya'da Trend</span>
            <h3>Revolution</h3>
            <span>50.4K Tweet</span>
          </div>
          <div className='trend'>
            <span>Almanya'da Trend</span>
            <h3>Revolution</h3>
            <span>50.4K Tweet</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
