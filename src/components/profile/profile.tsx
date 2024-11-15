import MenuProfile from '../menu-profile/menu-profile';
import imgProfile from '../../assets/profile-image.jpg'
import './profile.css'

const Profile = (): JSX.Element => {
    return (
        <div className='profile__component'>
            <img className='img__profile' src={imgProfile} alt="profile image" />
            <p>SebasstianAhr</p>
            <MenuProfile/>
        </div>
    )
}

export default Profile;
