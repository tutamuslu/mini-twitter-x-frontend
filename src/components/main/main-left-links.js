import { Link } from 'react-router-dom';

const MainLeftLinks = () => {
    return (
        <>
            <Link to={'/#'}> <img src='images/home.svg' alt='home' /> Anasayfa </Link>
            <Link to={'/#'}> <img src='images/explore.svg' alt='home' /> Keşfet </Link>
            <Link to={'/#'}> <img src='images/notification.svg' alt='home' /> Bildirimler </Link>
            <Link to={'/#'}> <img src='images/messages.svg' alt='home' /> Mesajlar </Link>
            <Link to={'/#'}> <img src='images/bookmarks.svg' alt='home' /> Kaydedilenler </Link>
            <Link to={'/#'}> <img src='images/lists.svg' alt='home' /> Listeler </Link>
            <Link to={'/#'}> <img src='images/profile.svg' alt='home' /> Profil </Link>
            <Link to={'/#'}> <img src='images/more.svg' alt='home' /> Diğer </Link>
        </>
    )
}

export default MainLeftLinks;