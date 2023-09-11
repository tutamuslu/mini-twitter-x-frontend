import { useState } from "react";
import { Button, Input } from "reactstrap";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/sign.css'

const SignIn = () => {

    const navigate = useNavigate();
    const [state, setState] = useState({
        user: '',
        password: ''
    })
    const onChange = (e) => {
        const { id, value } = e.target;
        setState({
            ...state,
            [id]: value,
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:9000/profile/login', state)
            .then((response) => {
                if(response.data.success){
                    toast('Başarıyla giriş yaptınız! Bekleyin yönlendiriliyorsunuz.');
                // mesajı okusun diye azıcık bekletip yönlendirdim.
                setTimeout(() => {
                    navigate('/');
                }, 1000);
                }else{
                    toast('Hata oluştu :' + response.data.errorMessage);
                }
                
            })
            .catch((error) => {
                toast('Hata oluştu :' + error);
            });
    };

    return (
        <div className="main center">
            <div className="sign-area sign-in">
                <img src="images/twitter-logo.png" width={50} alt="logo" />
                <h1>Giriş Yap</h1>
                <Input type="text" id="user" value={state.user} maxLength={50} placeholder="Kullanıcı Adı" onChange={onChange} />
                <Input type="password" id="password" value={state.password} maxLength={12} placeholder="Şifre" onChange={onChange} />
                <Button id="submit" onClick={handleSubmit}>Giriş Yap</Button>
                <div className="sign-footer">
                    <Link to={'/signin#'}>Şifremi unuttum?</Link>
                    <Link to={"/signup"}>Üye Ol</Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn;