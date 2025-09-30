import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import PriorityTag from "./priorityTag";
import { useEffect, useState } from "react";

type PriorityType = 'Low' | 'Medium' | 'High' | 'SuperHigh';

interface PriorityDropdownProps {
    typePriority: PriorityType;
    onPrioritySelect: (priority: PriorityType) => void;
}

interface DropdownProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedPriority: React.Dispatch<React.SetStateAction<PriorityType>>;
    onPrioritySelect: (priority: PriorityType) => void;
}

function Dropdown({ setIsOpen, onPrioritySelect, setSelectedPriority }: DropdownProps) {

    const handlePrioritySelect = (priority: PriorityType) => {
        setSelectedPriority(priority);
        onPrioritySelect(priority);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col mt-3">
            <button onClick={() => handlePrioritySelect("Low")} className="flex cursor-pointer bg-background rounded px-2 py-1 hover:bg-options-button-hover hover:border-l-white hover:border-l active:bg-options-button-pressed">
                <PriorityTag typePriority="Low" />
            </button>
            <button onClick={() => handlePrioritySelect("Medium")} className="flex cursor-pointer bg-background rounded px-2 py-1 hover:bg-options-button-hover hover:border-l-white hover:border-l active:bg-options-button-pressed">
                <PriorityTag typePriority="Medium" />
            </button>
            <button onClick={() => handlePrioritySelect("High")} className="flex cursor-pointer bg-background rounded px-2 py-1 hover:bg-options-button-hover hover:border-l-white hover:border-l active:bg-options-button-pressed">
                <PriorityTag typePriority="High" />
            </button>
            <button onClick={() => handlePrioritySelect("SuperHigh")} className="flex cursor-pointer bg-background rounded px-2 py-1 hover:bg-options-button-hover hover:border-l-white hover:border-l active:bg-options-button-pressed">
                <PriorityTag typePriority="SuperHigh" />
            </button>
        </div>
    )
}

export default function PriorityDropdown({ typePriority, onPrioritySelect }: PriorityDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState<PriorityType>(typePriority);
    
    useEffect(() => {
        setSelectedPriority(typePriority);
    }, [typePriority]);

    return (
        <div className="relative">
            <div className="flex border rounded border-line items-center gap-7 px-2 py-1">
                <PriorityTag typePriority={selectedPriority} />
                <button onClick={() => setIsOpen(!isOpen)} className="p-1 cursor-pointer hover:bg-options-button-hover active:bg-options-button-pressed">
                    {isOpen ? <BsCaretUpFill size={16} /> : <BsCaretDownFill size={16} />}
                </button>
            </div>
            {isOpen && (
                <Dropdown onPrioritySelect={onPrioritySelect} setIsOpen={setIsOpen} setSelectedPriority={setSelectedPriority} />
            )}
        </div>
    )
} 