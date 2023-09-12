import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTwitterContext } from '../../../context/tweet-context';
import { useState } from 'react';

const Tweet = (props) => {
    const { token, user } = useTwitterContext();
    const { tweet } = props;
    const [commentCount, setCommentCount] = useState(tweet?.commentCount)
    const [likeCount, setLikeCount] = useState(tweet?.likeCount)
    const [retweetCount, setRetweetCount] = useState(tweet?.retweetCount)

    const onLike = () => {
        const input = {
            "userId": user?.id
        }
        axios.post('http://localhost:9000/tweet/like/' + tweet.id, input, { headers: { Authorization: "Bearer " + token }})
            .then((response) => {
                if (response.data.success) {
                    toast("Gönderiyi beğendin!");
                    setLikeCount(likeCount+1)
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
        axios.post('http://localhost:9000/tweet/retweet/' + tweet.id, input, { headers: { Authorization: "Bearer " + token }})
            .then((response) => {
                if (response.data.success) {
                    toast("Gönderiyi Retweetledin!");
                    setRetweetCount(retweetCount+1)
                } else {
                    toast("Hata oluştu : " + response.data.errorMessage);
                }
            })
            .catch((error) => {
                toast('Hata oluştu :' + error);
            });
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
                        <Link> <img src="images/tweet-icons/comment.svg" alt="comment" /> {commentCount ?? 0} </Link>
                        <Link onClick={onRetweet}> <img src="images/tweet-icons/retweet.svg" alt="retweet" /> {retweetCount ?? 0} </Link>
                        <Link onClick={onLike}> <img src="images/tweet-icons/like.svg" alt="like" /> {likeCount ?? 0} </Link>
                        <Link> <img src="images/tweet-icons/share.svg" alt="share" /> </Link>
                        <Link> <img src="images/tweet-icons/statistics.svg" alt="statistics" /> </Link>
                    </div>
                </div>
            </div>
            <div className='tweet-content-actions'>
                <Link><svg xmlns="http://www.w3.org/2000/svg" width="17" height="4" viewBox="0 0 17 4" fill="none">
                    <path d="M3.92308 2C3.92308 3.10457 3.04487 4 1.96154 4C0.878211 4 0 3.10457 0 2C0 0.895431 0.878211 0 1.96154 0C3.04487 0 3.92308 0.895431 3.92308 2Z" fill="black" />
                    <path d="M10.4615 2C10.4615 3.10457 9.58333 4 8.5 4C7.41667 4 6.53846 3.10457 6.53846 2C6.53846 0.895431 7.41667 0 8.5 0C9.58333 0 10.4615 0.895431 10.4615 2Z" fill="black" />
                    <path d="M17 2C17 3.10457 16.1218 4 15.0385 4C13.9551 4 13.0769 3.10457 13.0769 2C13.0769 0.895431 13.9551 0 15.0385 0C16.1218 0 17 0.895431 17 2Z" fill="black" />
                </svg></Link>
            </div>
        </div>
    )
}

export default Tweet;