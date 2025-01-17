import { Button } from "reactstrap";
import { useTwitterContext } from "../../../context/tweet-context"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

export const Profile = () => {
    const { user, token, setToken } = useTwitterContext();
    const navigate = useNavigate();

    const onLogout = () => {
        axios
        .post('http://localhost:9000/profile/logout', {}, { headers: { Authorization: "Bearer " + token } })
        .then(() => {
          setToken(-1);
          navigate("/signin");
        })
        .catch((error) => {
          toast('Hata oluştu :' + error);
        });
    }

    return (
        <>
            <div className='main-left-profile'>
                <img src='images/profile-empty.png' width={50} height={50} alt='profile' />
                <div className='profile-detail'>
                    <div className='profile-name'>{user?.fullName}</div>
                    <div className='profile-user'>@{user?.username}</div>
                </div>
                <div className='profile-others'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="4" viewBox="0 0 17 4" fill="none">
                        <path d="M3.92308 2C3.92308 3.10457 3.04487 4 1.96154 4C0.878211 4 0 3.10457 0 2C0 0.895431 0.878211 0 1.96154 0C3.04487 0 3.92308 0.895431 3.92308 2Z" fill="black" />
                        <path d="M10.4615 2C10.4615 3.10457 9.58333 4 8.5 4C7.41667 4 6.53846 3.10457 6.53846 2C6.53846 0.895431 7.41667 0 8.5 0C9.58333 0 10.4615 0.895431 10.4615 2Z" fill="black" />
                        <path d="M17 2C17 3.10457 16.1218 4 15.0385 4C13.9551 4 13.0769 3.10457 13.0769 2C13.0769 0.895431 13.9551 0 15.0385 0C16.1218 0 17 0.895431 17 2Z" fill="black" />
                    </svg>
                </div>
            </div>
            <Button className="logout-button" onClick={onLogout}>Çıkış</Button>
        </>
    )
}