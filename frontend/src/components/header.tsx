import logo from '../assets/LOGO_ProjetoTrainee.png';
import ProfileButton from './profileButton';
import NotificationButton from './notificationButton';


export default function Header() {
    return(
        <header className="bg-gradient-to-r from-[#5B5B5B] to-[#4C4444] flex px-20 py-3 items-center justify-between">
            <div className='flex items-center gap-1 w-16'>
                <img src={logo} alt="Logo" className='w-[3,41rem] h-[3.75rem]' />
                <p className='font-semibold'>Peugeot Tasks</p>
            </div>
            <div className='flex items-center gap-3'>
                <NotificationButton />
                <ProfileButton />
            </div>
        </header>
    )
}