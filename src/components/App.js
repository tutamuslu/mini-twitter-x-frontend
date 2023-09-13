
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
import { MainRight } from './main/right/main-right';

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
      <MainRight />
    </div>
  );
}

export default App;
