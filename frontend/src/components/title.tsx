import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai"
import { BsFillPlusCircleFill, BsPencilFill, BsThreeDots } from "react-icons/bs"
import api from "../utils/api";

interface TitleProps {
    title: 'listTitle' | 'taskTitle'
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    list: ListModel;
    handleDeleteList: (listId: number) => void;
    setListIdToDelete: React.Dispatch<React.SetStateAction<number | null>>;
    setListNameToDelete: React.Dispatch<React.SetStateAction<string | null>>;
    task?: TaskModel | null;
    handleEditTask?: (taskId: number, newName: string) => void;
    setDeletionType: React.Dispatch<React.SetStateAction<'task' | 'list' | null>>;
    onListDeleteClick: (listId: number, listName: string) => void;
}

interface TaskModel {
    id: number;
    name: string;
    description?: string;
    priority: 'Low' | 'Medium' | 'High' | 'SuperHigh';
    expectedFinishDate?: string;
    list: {
        id: number;
    }
}

interface ListModel {
    id: number;
    name: string;
}

interface EditProps {
    onRename: () => void;
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    onDelete: () => void; 
}

function Edit({ onRename, setIsDeleted, onDelete }: EditProps) {
    return (
        <div className="bg-background border-line border-[0.03125rem] w-min rounded flex flex-col mt-0.5">
            <button onClick={onRename} className="flex items-center gap-2 p-2 hover:bg-options-button-hover cursor-pointer active:bg-options-button-pressed">
                <i><BsPencilFill size={16} /></i>
                <p>Renomear</p>
            </button>
            <button onClick={() => {setIsDeleted(true); onDelete()}} className="flex items-center gap-2 p-2 text-danger hover:bg-options-button-hover cursor-pointer active:bg-options-button-pressed">
                <i><AiFillDelete size={18} /></i>
                <p className="mt-0.5">Deletar</p>
            </button>
        </div>
    )
}

export default function Title({ title, setIsDeleted, list, setListIdToDelete, handleEditTask, setListNameToDelete, task, setDeletionType, onListDeleteClick}: TitleProps) {
        const [showEdit, setShowEdit] = useState(false);
        const cardRef = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLInputElement>(null);
        const [isEditing, setIsEditing] = useState(false);

        const [listName, setListName] = useState(list.name); 
        const [taskName, setTaskName] = useState(task?.name || "");

        useEffect(() => {
            setTaskName(task?.name || "");
        }, [task]);

        useEffect(() => {
            if (!showEdit && !isEditing) return;
            function handleClickOutside(event: MouseEvent) {
                if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                    setShowEdit(false);
                    setIsEditing(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [showEdit, isEditing]);

         useEffect(() => {
            setListName(list.name);
        }, [list.name]);

        useEffect(() => {
            if (isEditing && inputRef.current) {
                inputRef.current.focus();
            }
        }, [isEditing]);

        const handleUpdateList = async () => {
            if (listName === list.name) {
                setIsEditing(false);
                return;
            }
            try {
                await api.put(`/lists/${list.id}`, { name: listName });
                setIsEditing(false);
                console.log("Lista atualizada com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar a lista:", error);
                setListName(list.name);
            }
        };

        const handleUpdateTask = async () => {
            if (!task || taskName === task.name) {
                setIsEditing(false);
                return;
            }

            try {
                await api.put(`/tasks/${task.id}`, { name: taskName });
                setIsEditing(false);
                console.log("Tarefa atualizada com sucesso!");

                if (handleEditTask) {
                    handleEditTask(task.id, taskName);
                }
            } catch (error) {
                console.error("Erro ao atualizar a tarefa:", error);
                setTaskName(task.name);
            }
        };

        const handleKeyDownList = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                handleUpdateList();
            }
        };

        const handleKeyDownTask = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                handleUpdateTask();
            }
        };

        const handleRenameClick = () => {
            setShowEdit(false);
            setIsEditing(true);
        }

        const handleDeleteClick = () => {
            // Altere a lógica para usar a nova função
            onListDeleteClick(list.id, listName);
        };
    
    if (title === 'listTitle') {
        return (
            <div className="relative justify-between items-center py-2 flex" ref={cardRef}>
                <input
                    type="text"
                    ref={inputRef}
                    className={`bg-transparent font-semibold outline-none w-full text-[1.2rem] ${isEditing ? "border border-white rounded-xl px-2 py-1 flex" : ""}`}
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    onBlur={handleUpdateList} 
                    onKeyDown={handleKeyDownList} 
                    readOnly={!isEditing}
                    onFocus={() => setShowEdit(false)}
                />
                <button onClick={() => setShowEdit(!showEdit)} className='flex px-1 py-1 cursor-pointer hover:bg-options-button-hover active:bg-options-button-pressed'>
                    <i><BsThreeDots size={24} /></i>
                </button>
                <div className="absolute z-10 -right-19 top-10">
                    {showEdit && <Edit onRename={handleRenameClick} setIsDeleted={setIsDeleted} onDelete={handleDeleteClick}/>}
                </div>
            </div>
        )
    }

    else if (title === 'taskTitle') {
        return (
            <div ref={cardRef} className="flex items-center justify-between">
                <input 
                    type="text"
                    ref={inputRef}
                    className={`bg-transparent outline-none w-full text-[2.07rem] font-bold pb-1 ${isEditing ? "border border-white rounded-xl px-2 py-1 flex" : ""}`}
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    onBlur={() => {setIsEditing(false), handleUpdateTask()}}
                    onKeyDown={handleKeyDownTask}
                    readOnly={!isEditing}
                    onClick={() => setIsEditing(true)}
                 />
            </div>
        )
    }
}  
