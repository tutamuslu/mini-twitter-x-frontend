import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTwitterContext } from '../../../context/tweet-context';
import { useState } from 'react';
import { TweetActions } from './tweet-actions';

const Tweet = (props) => {
    const { token, user } = useTwitterContext();
    const { tweet, tweets, setTweets } = props;
    const [commentCount, setCommentCount] = useState(tweet?.commentCount)
    const [likeCount, setLikeCount] = useState(tweet?.likeCount)
    const [retweetCount, setRetweetCount] = useState(tweet?.retweetCount)
    const [commentsShow, setCommetsShow] = useState(false);

    const onLike = () => {
        const input = {
            "userId": user?.id
        }
        axios.post('http://localhost:9000/tweet/like/' + tweet.id, input, { headers: { Authorization: "Bearer " + token } })
            .then((response) => {
                if (response.data.success) {
                    toast("Gönderiyi beğendin!");
                    setLikeCount(likeCount + 1)
                } else {
                    toast("Hata oluştu : " + response.data.errorMessage);
                }
            })
            .catch((error) => {
                toast('Hata oluştu :' + error);
            });
    }

    const onRetweet = () => {
        const input = {
            "userId": user?.id
        }
        axios.post('http://localhost:9000/tweet/retweet/' + tweet.id, input, { headers: { Authorization: "Bearer " + token } })
            .then((response) => {
                if (response.data.success) {
                    toast("Gönderiyi Retweetledin!");
                    setRetweetCount(retweetCount + 1)
                } else {
                    toast("Hata oluştu : " + response.data.errorMessage);
                }
            })
            .catch((error) => {
                toast('Hata oluştu :' + error);
            });
    }

    const onShowComments = () => {
        setCommetsShow(!commentsShow)
    }
    
    return (
        <div className='tweet'>
            <img src='images/profile-empty.png' width={60} height={60} alt='profile' />
            <div className='tweet-content'>
                <div className='tweet-user-row'>
                    <div className='tweet-name'>{tweet?.userId?.fullName}</div>
                    <div className='tweet-user-time'>@{tweet?.userId?.username} - {new Date(tweet?.tweetDate).toDateString()}</div>
                </div>
                <div className='tweet-content-row'>
                    <p>
                        {tweet?.content}
                    </p>
                    <div className='tweet-action-buttons'>
                        <Link onClick={onShowComments}> <img src="images/tweet-icons/comment.svg" alt="comment" /> {commentCount ?? 0} </Link>
                        <Link onClick={onRetweet}> <img src="images/tweet-icons/retweet.svg" alt="retweet" /> {retweetCount ?? 0} </Link>
                        <Link onClick={onLike}> <img src="images/tweet-icons/like.svg" alt="like" /> {likeCount ?? 0} </Link>
                        <Link> <img src="images/tweet-icons/share.svg" alt="share" /> </Link>
                        <Link> <img src="images/tweet-icons/statistics.svg" alt="statistics" /> </Link>
                    </div>
                </div>
            </div>
            <TweetActions tweet={tweet} tweets={tweets} setTweets={setTweets} setCommentCount={setCommentCount} commentCount={commentCount} setCommetsShow={setCommetsShow} commentsShow={commentsShow} />
        </div>
    )
}

export default Tweet;