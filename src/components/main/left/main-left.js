import { Button } from 'reactstrap';
import { Links } from './links';
import { Profile } from './profile';

const MainLeft = () => {
    return (
        <div className='main-left'>
            <div className='main-left-content'>
                <img src="images/twitter-logo.png" height={25} width={25} alt="logo" />
                <Links />
                <Button>Tweet</Button>
                <Profile />
            </div>
        </div>
    )
}

export default MainLeft;