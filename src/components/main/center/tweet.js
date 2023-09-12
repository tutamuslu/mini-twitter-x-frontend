import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTwitterContext } from '../../../context/tweet-context';
import { useState } from 'react';
import Modal from 'react-modal';
import { Button, Input } from 'reactstrap';

const Tweet = (props) => {
    const { token, user } = useTwitterContext();
    const { tweet, onDeleteTweet, onTweetUpdate } = props;
    const [commentCount, setCommentCount] = useState(tweet?.commentCount)
    const [likeCount, setLikeCount] = useState(tweet?.likeCount)
    const [retweetCount, setRetweetCount] = useState(tweet?.retweetCount)
    const [commentsShow, setCommetsShow] = useState(false);
    const [comment, setComment] = useState('');
    const [showActions, setShowActions] = useState(false);
    const [updateShow, setUpdateShow] = useState(false);
    const [updatedValue, setUpdatedValue] = useState(tweet?.content)

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

    const onAddComment = () => {
        const input = {
            "userId": user?.id,
            "comment": comment
        }
        axios.post('http://localhost:9000/tweet/reply/' + tweet.id, input, { headers: { Authorization: "Bearer " + token } })
            .then((response) => {
                if (response.data.success) {
                    toast("Yorum eklendi");
                    setCommentCount(commentCount + 1);
                    setCommetsShow(false);
                    setComment('');
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

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: '350px',
            height: '150px',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

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
            <div className='tweet-content-actions'>
                <Link onClick={() => {setShowActions(!showActions)}}><svg xmlns="http://www.w3.org/2000/svg" width="17" height="4" viewBox="0 0 17 4" fill="none">
                    <path d="M3.92308 2C3.92308 3.10457 3.04487 4 1.96154 4C0.878211 4 0 3.10457 0 2C0 0.895431 0.878211 0 1.96154 0C3.04487 0 3.92308 0.895431 3.92308 2Z" fill="black" />
                    <path d="M10.4615 2C10.4615 3.10457 9.58333 4 8.5 4C7.41667 4 6.53846 3.10457 6.53846 2C6.53846 0.895431 7.41667 0 8.5 0C9.58333 0 10.4615 0.895431 10.4615 2Z" fill="black" />
                    <path d="M17 2C17 3.10457 16.1218 4 15.0385 4C13.9551 4 13.0769 3.10457 13.0769 2C13.0769 0.895431 13.9551 0 15.0385 0C16.1218 0 17 0.895431 17 2Z" fill="black" />
                </svg></Link>
                {
                    showActions &&
                    <div className='tweet-actions'>
                    <Link onClick={() => {setUpdateShow(true)}}>Düzenle</Link>
                    <Link onClick={() => {onDeleteTweet(tweet.id)}}>Sil</Link>
                    </div>
                }
            </div>
            {
                commentsShow &&
                <Modal
                    isOpen={commentsShow}
                    style={customStyles}
                    shouldCloseOnEsc={true}
                    contentLabel="Yorum Ekle"

                >
                    <div>
                        <Input name='comment' id='comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
                        <Button onClick={onAddComment}>Kaydet</Button>
                        <button onClick={() => { setCommetsShow(false) }}>close</button>
                    </div>
                </Modal>
            }
            {
                updateShow &&
                <Modal
                    isOpen={updateShow}
                    style={customStyles}
                    shouldCloseOnEsc={true}
                    contentLabel="Tweet Düzenle"

                >
                    <div>
                        <Input name='updatedvalue' id='updatedvalue' value={updatedValue} onChange={(e) => { setUpdatedValue(e.target.value) }} />
                        <Button onClick={() => { onTweetUpdate(tweet.id, updatedValue); setUpdateShow(false); }}>Kaydet</Button>
                        <button onClick={() => { setUpdateShow(false) }}>close</button>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default Tweet;