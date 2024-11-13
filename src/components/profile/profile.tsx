import imgProfile from '../../../public/profile-image.jpg'
import MenuProfile from '../menu-profile/menu-profile';
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
