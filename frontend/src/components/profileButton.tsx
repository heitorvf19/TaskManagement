import { FaUserCircle } from "react-icons/fa";

export default function ProfileButton() {
    return(
        <button className='flex items-center justify-center gap-2 px-4 py-1 rounded-xl cursor-pointer hover:bg-options-button-hover'>
            <i><FaUserCircle size={24}/></i>
            <p className='font-semibold'>José</p>
        </button>
    )
}