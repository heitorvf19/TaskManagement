import { useState } from "react";
import { BsCheck2 } from "react-icons/bs";

interface FinishTaskButtonProps {
    onClick?: () => void;
    isFinished?: boolean;
}

export default function FinishTaskButton({onClick, isFinished}: FinishTaskButtonProps) {

    return (
        <button onClick={onClick} className={`cursor-pointer flex items-center justify-center gap-2 ${isFinished ? "text-low-priority-text" : "hover:text-[#15C384]"}`}>
            <div className="border-dashed border rounded-full p-1"><i><BsCheck2 size={24} /></i></div>
            <p className="rounded px-1">{isFinished === true ? "Finalizado" : "Finalizar"}</p>
        </button>
    )
}