import { AuthContext } from '../../context/auth-context';
import imgProfile from '../../assets/profile-image.jpg';
import MenuProfile from '../menu-profile/menu-profile';
import { useContext } from 'react';
import './profile.css';

const Profile = (): JSX.Element => {
  const authContext = useContext(AuthContext);

  return (
    <div className='profile__component'>
      <img className='img__profile' src={imgProfile} alt="profile image" />
      {authContext && authContext.user && (
        <p>{authContext.user.name} {authContext.user.lastName}</p>
      )}
      <MenuProfile />
    </div>
  );
};

export default Profile;