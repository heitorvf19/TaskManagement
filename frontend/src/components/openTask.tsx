import { BsArrowBarRight, BsFillCalendarWeekFill } from "react-icons/bs";
import FinishTaskButton from "./finishTaskButton";
import { AiFillDelete } from "react-icons/ai";
import PriorityDropdown from "./priorityDropdown";
import Title from "./title";
import { useEffect, useRef, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import Calendar from "react-calendar";

type Priority = 'Low' | 'Medium' | 'High' | 'SuperHigh';

interface OpenTaskProps {
    setCliqueBotao: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    isLate?: boolean;
    task: Task | null;
    handleEditTask: (taskId: number, newName: string) => void;
    handleTaskDeleteClick: (task: Task) => void;
    handleSaveTaskDescription: (taskId: number, newDescription: string) => void;
    handlePriorityChange: (taskId: number, newPriority: Priority) => void;
    handleToggleTaskFinish: (taskId: number, currentIsFinished: boolean) => void;
    handleUpdateExpectedFinishDate: (taskId: number, newDate: string) => void;
}

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


export default function OpenTask({ setCliqueBotao, setIsDeleted, task, handleEditTask, handleTaskDeleteClick, handleSaveTaskDescription, handlePriorityChange, handleToggleTaskFinish, handleUpdateExpectedFinishDate }: OpenTaskProps) {
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [descriptionInputValue, setDescriptionInputValue] = useState(task?.description || '');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [calendarRef]);

     const handleSaveDescription = () => {
        if (task && descriptionInputValue !== task.description) {
            handleSaveTaskDescription(task.id, descriptionInputValue);
        }
        setIsEditingDescription(false);
    };

    useEffect(() => {
        setDescriptionInputValue(task?.description || '');
    }, [task]);

    const handleDropdownChange = (newPriority: Priority) => {
        if (task) {
            handlePriorityChange(task.id, newPriority);
        }
    };

    return (
        <div className="flex flex-col items-start gap-2 bg-background border-l border-white h-screen ml-auto w-[30%]">
            <div className="flex justify-between w-full px-5 pt-14">
                <button onClick={() => setCliqueBotao(false)} className="flex p-1 cursor-pointer hover:bg-options-button-hover active:bg-options-button-pressed">
                    <BsArrowBarRight size={24} />
                </button>
                {task &&
                <FinishTaskButton
                    onClick={() => handleToggleTaskFinish(task.id, task.isFinished)}
                    isFinished={task.isFinished} 
                />} 
            </div>
            {task && (
                <div className="flex flex-col justify-center gap-4 px-16 items-center self-center">
                        <Title 
                            title="taskTitle" 
                            task={task} 
                            handleEditTask={handleEditTask} 
                            setIsDeleted={setIsDeleted} 
                            list={{id: 0, name: ''}} 
                            handleDeleteList={() => {}} 
                            setListIdToDelete={() => {}} 
                            setListNameToDelete={() => {}} 
                            setDeletionType={() => {}}
                            onListDeleteClick={() => {}}
                        />
                    <hr className="border border-line w-full" />
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">Data de conclusão</p>
                            <div ref={calendarRef}>
                                <button onClick={() => setIsCalendarOpen(!isCalendarOpen)}  className={`flex gap-2 px-2 py-1 rounded ${task.isLate ? "bg-[#DDA9A9] text-danger hover:bg-[#C29090]" : "bg-[#E0E0E0]  text-date-text hover:bg-[#F0F0F0] active:bg-options-button-pressed"} w-min whitespace-nowrap items-center justify-center cursor-pointer`}>
                                    <i><BsFillCalendarWeekFill size={16}/></i>
                                    <small className="font-semibold mt-0.5">{task.expectedFinishDate?.split("T")[0] || 'Adicionar data'}</small>
                                </button>
                            
                                {isCalendarOpen && (
                                    <div className="absolute top-60 z-50 right-10">
                                        <Calendar className="text-black"
                                            onChange={(value) => {
                                                if (value instanceof Date && task) {
                                                    const year = value.getFullYear();
                                                    const month = String(value.getMonth() + 1).padStart(2, '0');
                                                    const day = String(value.getDate()).padStart(2, '0');
                                                    const formattedDate = `${year}-${month}-${day}T12:00:00`;
                                                    handleUpdateExpectedFinishDate(task.id, formattedDate);
                                                }
                                                setIsCalendarOpen(false);
                                            }}
                                            value={task.expectedFinishDate ? new Date(task.expectedFinishDate) : new Date()}  
                                        />
                                    </div>
                                )}
                                </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">Prioridade</p>
                            <PriorityDropdown typePriority={task.priority} onPrioritySelect={(priority) => handlePriorityChange(task.id, priority)} />
                        </div>
                    </div>
                    <hr className="border border-line w-full" />
                    <div className="flex flex-col gap-4">
                        <p className="font-semibold w-full">Descrição</p>
                        {isEditingDescription ? (
                                <textarea
                                    className="w-[20.5rem]  rounded border border-white p-2 bg-transparent outline-none"
                                    value={descriptionInputValue}
                                    onChange={(e) => setDescriptionInputValue(e.target.value)}
                                    onBlur={handleSaveDescription}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter'  && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSaveDescription();
                                        }
                                    }}
                                    rows={6}
                                />  
                            ) : (
                                <div
                                    onClick={() => setIsEditingDescription(true)}
                                    className="max-w-[29.5625rem] w-full rounded border border-line p-2 cursor-pointer hover:border-white"
                                >
                                    <p className="whitespace-pre-wrap">{descriptionInputValue || 'Adicione uma descrição...'}</p>
                                </div>
                            )}
                    </div>
                    <hr className="border border-line w-full" />
                        <button onClick={() => {if(task) handleTaskDeleteClick(task)}} className="flex w-full items-center gap-2 p-2 text-danger hover:bg-options-button-hover cursor-pointer active:bg-options-button-pressed">
                            <i><AiFillDelete size={16} /></i>
                            <p className="mt-0.5">Deletar</p>
                        </button>
                </div>
            )}   
            </div>
    );
}