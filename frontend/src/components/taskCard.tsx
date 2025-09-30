import FinishTaskButton from "./finishTaskButton"
import PriorityTag from "./priorityTag"
import { useState, useRef, useEffect } from "react";
import { BsFillCalendarWeekFill, BsPencilFill, BsPlusSquareDotted } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

interface Task {
    id: number;
    name: string;
    description?: string;
    priority: 'Low' | 'Medium' | 'High' | 'SuperHigh';
    expectedFinishDate?: string;
    isFinished: boolean;
    isLate?: boolean;
    list: {
        id: number;
    }
}

interface TaskCardProps {
    isLate?: boolean;
    typePriority: 'Low' | 'Medium' | 'High' | 'SuperHigh';
    setCliqueBotao: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    task: Task;
    onTaskSelect: (task: Task) => void;
    handleTaskDeleteFromCard: (task: Task) => void;
    handleDuplicateTask: (task: Task) => void;
}

interface EditProps {
    setCliqueBotao: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    handleTaskDeleteFromCard: (task: Task) => void;
    task: Task;
    handleDuplicateTask: (task: Task) => void;
}

function Edit({setCliqueBotao, setIsDeleted, handleTaskDeleteFromCard, task, handleDuplicateTask}: EditProps) {
    return (
        <div className="bg-background border-line border-[0.03125rem] w-min rounded flex flex-col">
            <button onClick={() => setCliqueBotao(true)} className="flex items-center gap-2 p-2 hover:bg-options-button-hover cursor-pointer active:bg-options-button-pressed">
                <i><BsPencilFill size={16} /></i>
                <p>Editar</p>
            </button>
            <button onClick={() => {
                if (task) {
                    handleDuplicateTask(task);
                } else {
                    console.error("Erro: Tarefa não encontrada para duplicação.");
                }
            }} className="flex items-center gap-2 p-2 hover:bg-options-button-hover cursor-pointer active:bg-options-button-pressed">
                <i><BsPlusSquareDotted size={16} /></i>
                <p className="mt-0.5">Duplicar</p>
            </button>
            <button onClick={() => handleTaskDeleteFromCard(task)} className="flex items-center gap-2 p-2 text-danger hover:bg-options-button-hover cursor-pointer active:bg-options-button-pressed">
                <i><AiFillDelete size={18} /></i>
                <p className="mt-0.5">Deletar</p>
            </button>
        </div>
    )
}


export default function TaskCard({isLate = false, typePriority, setCliqueBotao, setIsDeleted, task, onTaskSelect, handleTaskDeleteFromCard, handleDuplicateTask}: TaskCardProps) {
    const [showEdit, setShowEdit] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!showEdit) return;
        function handleClickOutside(event: MouseEvent) {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setShowEdit(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showEdit]);

    return (
        <div className="relative" ref={cardRef}>
            <div onContextMenu={(e) => { e.preventDefault(); setShowEdit(!showEdit); }} onClick={() => onTaskSelect(task)} className={`relative flex-col rounded-lg border-line border max-w-[27.8125rem] py-3 px-2 ${task.isLate ? "hover:bg-gradient-to-r from-[#553434] to-[#381D1D]" : "hover:bg-gradient-to-r from-[#393939] to-[#232323]"} hover:border-white`}>
                <div className="flex justify-between items-center">
                    <PriorityTag typePriority={task.priority} />
                    <FinishTaskButton isFinished={task.isFinished} />
                </div>
                <div className="mt-3">
                    <h6 className="font-semibold">{task.name}</h6>
                    <p className="mt-1 whitespace-pre-wrap">{task.description}</p>
                </div>
                <div className="mt-3">
                    <div className={`flex gap-2 px-2 py-1 rounded ${task.isLate ? "bg-[#DDA9A9] text-danger" : "bg-[#E0E0E0]  text-date-text"} w-min whitespace-nowrap items-center justify-center`}>
                        <i><BsFillCalendarWeekFill size={16}/></i>
                        <small className="font-semibold mt-0.5">{task.expectedFinishDate?.split("T")[0]}</small>
                    </div>
                </div>
            </div>
            <div className="absolute z-10 -right-6 top-4/6">
                {showEdit && <Edit setCliqueBotao={setCliqueBotao} setIsDeleted={setIsDeleted} handleTaskDeleteFromCard={handleTaskDeleteFromCard} task={task} handleDuplicateTask={handleDuplicateTask} />}
            </div>
        </div>
    );
}