import { Link } from "react-router-dom"

export const TweetIconArea = () => {
    return (
        <div className='tweet-icon-area'>
            <Link to={'/#'}> <img src="images/tweet-icons/photo.svg" alt="photo" /> </Link>
            <Link to={'/#'}> <img src="images/tweet-icons/gif.svg" alt="gif" /> </Link>
            <Link to={'/#'}> <img src="images/tweet-icons/pool.svg" alt="pool" /> </Link>
            <Link to={'/#'}> <img src="images/tweet-icons/emoji.svg" alt="emoji" /> </Link>
            <Link to={'/#'}> <img src="images/tweet-icons/date.svg" alt="date" /> </Link>
        </div>
    )
}