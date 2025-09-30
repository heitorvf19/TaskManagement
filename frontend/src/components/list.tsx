import NewTask from "./newTask";
import TaskCard from "./taskCard";
import Title from "./title";

import React, { useState } from "react";

interface ListProps {
    setCliqueBotao: React.Dispatch<React.SetStateAction<boolean>>;
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    handleCreateTask: (listId: number) => void;
    handleDeleteList: (listId: number) => void;
    setListIdToDelete: React.Dispatch<React.SetStateAction<number | null>>;
    setListNameToDelete: React.Dispatch<React.SetStateAction<string | null>>;
    list: {
        id: number;
        name: string;
        tasks: Task[];
    };
    onTaskSelect: (task: Task) => void;
    handleTaskDeleteFromCard: (task: Task) => void;
    setDeletionType: React.Dispatch<React.SetStateAction<'task' | 'list' | null>>;
    onListDeleteClick: (listId: number, listName: string) => void;
    handleDuplicateTask: (task: Task) => void;
}

interface Task {
    id: number;
    name: string;
    description?: string;
    priority: 'Low' | 'Medium' | 'High' | 'SuperHigh';
    expectedFinishDate?: string;
    isFinished: boolean;
    list: {
        id: number;
    }
}

export default function List({ setCliqueBotao, setIsDeleted, handleCreateTask, list, setListIdToDelete, handleDeleteList, setListNameToDelete, onTaskSelect, handleTaskDeleteFromCard, onListDeleteClick, handleDuplicateTask}: ListProps) {
    const [deletionType, setDeletionType] = useState<'task' | 'list' | null>(null);

    return (
    <div className="flex flex-col border border-line rounded-xl px-4 pt-4 pb-6 gap-3 max-w-[29.821rem] w-full min-h-[52.4rem] flex-shrink-0">
            <div>
                <Title title="listTitle" setIsDeleted={setIsDeleted} list={list} setListIdToDelete={setListIdToDelete} handleDeleteList={handleDeleteList} setListNameToDelete={setListNameToDelete} setDeletionType={setDeletionType} onListDeleteClick={onListDeleteClick}/>
            </div>
            {(list.tasks || []).map(task => {
                if (task) {
                    return (
                        <TaskCard 
                            setCliqueBotao={setCliqueBotao} 
                            setIsDeleted={setIsDeleted} 
                            typePriority={"Low"} 
                            key={task.id} 
                            task={task} 
                            onTaskSelect={onTaskSelect} 
                            handleTaskDeleteFromCard={handleTaskDeleteFromCard} 
                            handleDuplicateTask={handleDuplicateTask}
                        />                           
                    )
                }
                return null;
            })}
            <div>
                <NewTask handleCreateTask={() => handleCreateTask(list.id)} />
            </div>
        </div>
    );
}