
import './styles/app.css';
import { useEffect, useState } from 'react';
import MainLeft from './components/main/left/main-left';
import Tweet from './components/main/center/tweet';
import { useTwitterContext } from './context/tweet-context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MainRight } from './components/main/right/main-right';
import { NewTweet } from './components/main/center/new-tweet';

function App() {
  const [tweets, setTweets] = useState([]);
  const { token, setToken } = useTwitterContext();
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

  return (
    <div className='main main-area'>
      <MainLeft />
      <div className='main-center'>
        <div className='main-center-top'>
          Anasayfa
        </div>
        <NewTweet tweets={tweets} setTweets={setTweets} />
        {
          tweets?.map(tweet => (
            <Tweet tweet={tweet} tweets={tweets} setTweets={setTweets} />
          ))
        }
      </div>
      <MainRight />
    </div>
  );
}

export default App;
