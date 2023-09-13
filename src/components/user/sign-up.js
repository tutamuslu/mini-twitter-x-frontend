import { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
import { DatePicker } from "reactstrap-date-picker";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../../styles/sign.css';
import { useTwitterContext } from "../../context/tweet-context";

const SignUp = () => {

    const { setUser, setToken } = useTwitterContext();
    const navigate = useNavigate();
    const [state, setState] = useState({
        name: '',
        user: '',
        email: '',
        password: '',
        password2: '',
        birth: new Date().toISOString()
    });

    // eğer giriş yapmışsa anasayfaya gönderelim.
    useEffect(() => {
        if(localStorage.getItem("token") !== undefined && localStorage.getItem("token") != -1){
            navigate("/");
        }
    }, []);

    const onChange = (e) => {
        const { id, value } = e.target;
        setState({
            ...state,
            [id]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const signupInput = {
            fullName: state.name,
            userName: state.user,
            email: state.email,
            password: state.password,
            birthDate: state.birth
        }
        axios
            .post('http://localhost:9000/profile/register', signupInput)
            .then((response) => {
                console.log(response)
                if (response.data.success) {
                    setToken(null)
                    setUser(response.data.user)
                    toast('Başarıyla üye oldunuz! Giriş yapabilirsiniz!!');
                    // mesajı okusun diye azıcık bekletip yönlendirdim.
                    setTimeout(() => {
                        navigate('/signin');
                    }, 1000);
                } else {
                    toast('Hata oluştu :' + response.data.errorMessage);
                }

            })
            .catch((error) => {
                toast('Hata oluştu :' + error);
            });
    };

    const handleChange = (value) => {
        setState({
            ...state,
            birth: value,
        });
    }
    return (
        <div className="main center">
            <div className="sign-area">
                <div className="logo-area">
                    <img src="images/twitter-logo.png" width={50} alt="logo" />
                </div>
                <h1>Hesap Oluştur</h1>

                <Input type="text" id="name" value={state.name} maxLength={50} placeholder="İsim" onChange={onChange} />
                <Input type="text" id="user" value={state.user} maxLength={12} placeholder="Kullanıcı Adı" onChange={onChange} />
                <Input type="text" id="email" value={state.email} maxLength={50} placeholder="Email" onChange={onChange} />
                <Input type="password" id="password" value={state.password} maxLength={50} placeholder="Şifre" onChange={onChange} />
                <Input type="password" id="password2" value={state.password2} maxLength={50} placeholder="Şifre Tekrarı" onChange={onChange} />

                <h2>Doğum Tarihi</h2>
                <DatePicker id="birth"
                    value={state.birth}
                    showClearButton={false}
                    onChange={(v) => handleChange(v)} />

                <Button id="submit" onClick={handleSubmit}>Üye Ol</Button>
            </div>
        </div>
    )
}

export default SignUp;