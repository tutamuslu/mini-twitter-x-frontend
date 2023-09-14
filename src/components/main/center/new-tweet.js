import { Button, Input } from 'reactstrap';
import { TweetIconArea } from '../center/tweet-icon-area';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTwitterContext } from '../../../context/tweet-context';

export const NewTweet = (props) => {

    const { tweets, setTweets } = props;
    const { token, user } = useTwitterContext();
    const [newTweet, setNewTweet] = useState('');

    const onTweetSend = () => {
        const input = {
            userId: user.id,
            content: newTweet,
            tweetDate: new Date()
        };
        axios
            .post('http://localhost:9000/tweet/', input, { headers: { Authorization: "Bearer " + token } })
            .then((response) => {
                if (response.data.success) {
                    toast("Tweet eklendi!")
                    const newArray = [response.data.tweet, ...tweets]
                    setTweets([...newArray])
                    setNewTweet('');
                } else {
                    toast("Hata Oluştu : " + response.data.errorMessage);
                }
            })
            .catch((error) => {
                toast('Hata oluştu :' + error);
            });
    }

    return (
        <div className='main-center-tweet'>
            <div className='user-input-area'>
                <img src='images/profile-empty.png' width={50} height={50} alt='profile' />
                <Input type='text' id='tweet' placeholder='Neler Oluyor?' value={newTweet} onChange={(e) => { setNewTweet(e.target.value) }} />
            </div>
            <div className='tweet-icon-row'>
                <TweetIconArea />
                <Button onClick={onTweetSend}>Tweet</Button>
            </div>
        </div>
    )
}