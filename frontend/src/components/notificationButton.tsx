import { BsBellFill } from "react-icons/bs";

const notification = true;

export default function NotificationButton() {
    return(
        <button className='flex p-1 cursor-pointer hover:bg-options-button-hover active:bg-options-button-pressed'>
            <i><BsBellFill size={24}/></i>
            {notification && <div className="w-2 h-2 bg-[#800] rounded-full -ml-2"></div>}
            
        </button>
    )
}