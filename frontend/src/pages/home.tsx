import { useEffect, useState } from "react";
import Header from "../components/header";
import NewTask from "../components/newTask";
import OpenTask from "../components/openTask";
import TaskCard from "../components/taskCard";
import Title from "../components/title";
import Delete from "../components/delete";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import NewList from "../components/newList";
import List from "../components/list";
import api from "../utils/api";
import axios from "axios";

interface MessageProps {
    setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
    deletionType: 'task' | 'list' | null;
}

interface ListModel { 
    id: number;
    name: string;
    tasks: Task[];
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

function Message({ setIsClicked, deletionType }: MessageProps) {
    return (
        <div className="text-success items-center flex gap-4 bg-background border-[0.03125rem] rounded-xl border-white px-4 py-2 top-16">
            <i><BsCheckCircleFill size={20} /></i>
            {deletionType === 'task' ? <p>Task deletada com sucesso!</p> : <p>Lista deletada com sucesso!</p>}
            <button onClick={() => setIsClicked(false)} className="ml-2 cursor-pointer hover:bg-options-button-hover active:bg-options-button-pressed"><MdClose size={24} /></button>
        </div>
    )
}

export default function Home() {
    const [cliqueBotao, setCliqueBotao] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [deletionType, setDeletionType] = useState<'task' | 'list' | null>(null);

    const [listIdToDelete, setListIdToDelete] = useState<number | null>(null);
    const [listNameToDelete, setListNameToDelete] = useState<string | null>(null);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [lists, setLists] = useState<ListModel[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

    type Priority = 'Low' | 'Medium' | 'High' | 'SuperHigh';

    useEffect(() => {
        if (isClicked) {
            const timer = setTimeout(() => setIsClicked(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isClicked]);

    useEffect(() => {
        getLists();
    }, []);

     const getLists = async () => {
        try {
            const response = await api.get('/lists');

            const today = new Date();
            today.setHours(0, 0, 0, 0); // Zera o horário para a comparação

            const listsWithLateStatus = response.data.map((list: ListModel) => {
                const tasksWithLateStatus = list.tasks.map((task: Task) => {
                    const isLate = task.expectedFinishDate 
                        ? new Date(task.expectedFinishDate) < today 
                        : false;
                    return { ...task, isLate };
                });
                return { ...list, tasks: tasksWithLateStatus };
            });

            setLists(listsWithLateStatus);

        } catch (error) {
            console.error("Erro ao buscar as listas:", error);
        }
    };

    const handleTaskSelect = (task: Task) => {
        setSelectedTask(task);
        setCliqueBotao(true);
    };

    const handleCreateTask = async (listId: number) => {
    try {
        const newTaskData = {
            name: "Task Title",
            priority: "Low",
            list: {
                id: listId
            }
        };

        const response = await api.post("/tasks", newTaskData);
        const createdTask = response.data;

        setLists(prevLists =>
            prevLists.map(list =>
                list.id === listId
                    ? { ...list, tasks: [...list.tasks, createdTask] }
                    : list
            )
        );

        setSelectedTask(createdTask);
        setCliqueBotao(true);
    } catch (error) {
        console.error("Erro ao criar a tarefa:", error);
        alert("Não foi possível criar a tarefa. Verifique o console para mais detalhes.");
    }
};

    useEffect(() => {
        async function fetchLists() {
            try {
                const response = await api.get('/lists');
                setLists(response.data);
            } catch (error) {
                console.error("Erro ao buscar as listas:", error);
            }
        }
        fetchLists();
    }, []);

    const handleCreateList = async (event: React.FormEvent, listName: string, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>, setInputValue: React.Dispatch<React.SetStateAction<string>>) => {
    event.preventDefault();
    if (!listName) {
        setIsEditing(false);
        return;
    }
    try {
        const response = await api.post('/lists', { name: listName });
        const createdList = response.data;

        const newListWithTasks = { ...createdList, tasks: [] };
        setLists(prevLists => [...prevLists, newListWithTasks]);

        console.log("Lista criada com sucesso:", createdList);
        setIsEditing(false);
        setInputValue("");
        console.log("Lista criada com sucesso:", response.data);
        setIsEditing(false);
        setInputValue("");
        } catch (error) {
            console.error("Erro ao criar a lista:", error);
            alert("Não foi possível criar a lista.");
        }
    };

    const handleDeleteList = async () => {
        try {
            if (listIdToDelete === null) {
                return;
            }
            await api.delete(`/lists/${listIdToDelete}`);
            setLists(prevLists => prevLists.filter(list => list.id !== listIdToDelete));
            setDeletionType('list');
            setIsClicked(true);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Erro ao deletar a lista:", error.response?.data);
                alert("Não foi possível deletar a lista. Verifique se ela está vazia.");
            } else {
                console.error("Erro desconhecido:", error);
                alert("Ocorreu um erro desconhecido.");
            }
        } finally {
            setListIdToDelete(null);
            setListNameToDelete(null);
            setIsDeleted(false);
        }
    };

  const handleEditTask = async (taskId: number, newName: string) => {
        try {
            await api.put(`/tasks/${taskId}`, { name: newName });
            
            setLists(prevLists => {
                const updatedLists = prevLists.map(list => ({
                    ...list,
                    tasks: list.tasks.map(task => 
                        task.id === taskId ? { ...task, name: newName } : task
                    )
                }));
                return updatedLists;
            });

            setSelectedTask(prevTask => {
                if (prevTask && prevTask.id === taskId) {
                    return { ...prevTask, name: newName };
                }
                return prevTask;
            });

            setTaskToDelete(prevTaskToDelete => {
                if (prevTaskToDelete && prevTaskToDelete.id === taskId) {
                    return { ...prevTaskToDelete, name: newName };
                }
                return prevTaskToDelete;
            });

        } catch (error) {
            console.error("Erro ao atualizar o nome da tarefa:", error);
            alert("Não foi possível atualizar a tarefa.");
        }
    };

    const handleTaskDeleteClick = (task: Task) => {
        setTaskToDelete(task); 
        setDeletionType('task'); 
        setIsDeleted(true); 
    };

    const handleDeleteTask = async () => {
        if (!taskToDelete) return;

        try {
            await api.delete(`/tasks/${taskToDelete.id}`);
            
            setLists(prevLists =>
                prevLists.map(list => ({
                    ...list,
                    tasks: list.tasks.filter(task => task.id !== taskToDelete.id)
                }))
            );

            setCliqueBotao(false);
            setIsClicked(true);

            console.log(`Tarefa com ID ${taskToDelete.id} deletada com sucesso!`);
        } catch (error) {
            console.error("Erro ao deletar a tarefa:", error);
            alert("Não foi possível deletar a tarefa.");
        } finally {
            setTaskToDelete(null);
        }
    };

    const handleTaskDeleteFromCard = (task: Task) => {
        setTaskToDelete(task);
        setSelectedTask(task);
        setDeletionType('task');
        setIsDeleted(true);
        setCliqueBotao(true)
    };

    const handleSaveTaskDescription = async (taskId: number, newDescription: string) => {
    try {
        await api.put(`/tasks/${taskId}`, { description: newDescription });

        setLists(prevLists =>
            prevLists.map(list => ({
                ...list,
                tasks: list.tasks.map(task =>
                    task.id === taskId ? { ...task, description: newDescription } : task
                )
            }))
        );
        console.log("Descrição da tarefa atualizada com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar a descrição da tarefa:", error);
        alert("Não foi possível salvar a descrição.");
    }
    };

    const handlePriorityChange = async (taskId: number, newPriority: Priority) => {
    try {
        const response = await api.put(`/tasks/${taskId}`, { priority: newPriority });
        const updatedTask = response.data;

        setLists(prevLists =>
                prevLists.map(list => ({
                    ...list,
                    tasks: list.tasks.map(task => {
                        if (task.id === taskId) {
                            const oldIsLate = task.isLate;
                            return { ...updatedTask, isLate: oldIsLate };
                        }
                        return task;
                    })
                }))
        );
        setSelectedTask(prevTask => {
                if (prevTask && prevTask.id === taskId) {
                    return { ...prevTask, ...updatedTask, isLate: prevTask.isLate };
                }
                return prevTask;
            });

        console.log(`Prioridade da tarefa ${taskId} atualizada para ${newPriority} com sucesso!`);
    } catch (error) {
        console.error("Erro ao atualizar a prioridade da tarefa:", error);
        alert("Não foi possível atualizar a prioridade.");
    }
};

    const handleListDeleteClick = (listId: number, listName: string) => {
        setListIdToDelete(listId);
        setListNameToDelete(listName);
        setDeletionType('list');
        setIsDeleted(true);
    };

    const handleDuplicateTask = async (taskToDuplicate: Task) => {
        console.log("Tentando duplicar:", taskToDuplicate);

        const listId = taskToDuplicate.list?.id || lists.find(l => l.tasks.some(t => t.id === taskToDuplicate.id))?.id;

        if (!listId) {
            console.error("Erro: não foi possível identificar a lista da tarefa.");
            return;
        }

        const newTaskData = {
            name: taskToDuplicate.name,
            description: taskToDuplicate.description,
            priority: taskToDuplicate.priority,
            expectedFinishDate: taskToDuplicate.expectedFinishDate,
            list: { id: listId }
        };

        try {
            const response = await api.post("/tasks", newTaskData);
            const duplicatedTask = response.data;

            setLists(prevLists =>
                prevLists.map(list =>
                    list.id === listId
                        ? { ...list, tasks: [...list.tasks, duplicatedTask] }
                        : list
                )
            );
            console.log("Tarefa duplicada com sucesso:", duplicatedTask);
        } catch (error) {
            console.error("Erro ao duplicar a tarefa:", error);
        }
    };

    const handleToggleTaskFinish = async (taskId: number, currentIsFinished: boolean) => {
        try {
            await api.put(`/tasks/${taskId}`, { isFinished: !currentIsFinished });
            getLists(); 
            if (selectedTask && selectedTask.id === taskId) {
                setSelectedTask(prevTask => prevTask ? { ...prevTask, isFinished: !currentIsFinished } : null);
            }
        } catch (error) {
            console.error('Erro ao alternar o estado da tarefa:', error);
        }
    };

    const handleUpdateExpectedFinishDate = async (taskId: number, newDate: string) => {
        try {
            await api.put(`/tasks/${taskId}`, { expectedFinishDate: newDate });
            getLists();
            if (selectedTask && selectedTask.id === taskId) {
                setSelectedTask(prevTask => prevTask ? { ...prevTask, expectedFinishDate: newDate } : null);
            }
        } catch (error) {
            console.error('Erro ao atualizar a data de finalização:', error);
        }
    };


    return (
        <div>
            <Header />
            <div className="overflow-x-scroll flex-nowrap">
                <div className="flex mt-16 ml-20 gap-6 items-start ">
                    {lists.map(list =>(
                        <List 
                            key={list.id} 
                            list={list} 
                            handleCreateTask={handleCreateTask} 
                            handleDeleteList={handleDeleteList}
                            setIsDeleted={setIsDeleted} 
                            setCliqueBotao={setCliqueBotao}
                            setListIdToDelete={setListIdToDelete}
                            setListNameToDelete={setListNameToDelete}
                            onTaskSelect={handleTaskSelect}
                            handleTaskDeleteFromCard={handleTaskDeleteFromCard}
                            setDeletionType={setDeletionType}
                            onListDeleteClick={handleListDeleteClick}
                            handleDuplicateTask={handleDuplicateTask}
                        />

                    ))}
                    <div>
                        <NewList handleCreateList={handleCreateList} />
                    </div>
                </div>
                <div
                    className={`fixed top-0 w-full transition-transform duration-800 ease-in-out
                    ${cliqueBotao ? '-translate-x-0' : 'translate-x-full'}
                    `}
                >
                    <OpenTask 
                        setIsDeleted={setIsDeleted} 
                        setCliqueBotao={setCliqueBotao} 
                        task={selectedTask} 
                        handleEditTask={handleEditTask} 
                        handleTaskDeleteClick={handleTaskDeleteClick}
                        handleSaveTaskDescription={handleSaveTaskDescription}
                        handlePriorityChange={handlePriorityChange}
                        handleToggleTaskFinish={handleToggleTaskFinish}
                        handleUpdateExpectedFinishDate={handleUpdateExpectedFinishDate}
                    />
                </div>
                <div>
                    {isDeleted && <Delete 
                        setIsDeleted={setIsDeleted} 
                        setIsClicked={setIsClicked} 
                        setCliqueBotao={setCliqueBotao} 
                        cliqueBotao={cliqueBotao} 
                        setDeletionType={setDeletionType}
                        deletionType={deletionType}
                        onConfirm={deletionType === 'task' ? handleDeleteTask : handleDeleteList} 
                        listNameToDelete={listNameToDelete} 
                        taskNameToDelete={taskToDelete?.name}
                    />}     
                </div>
                <div>
                    {isClicked &&
                        <div className="fixed top-16 left-1/2 -translate-x-1/2">
                            <Message setIsClicked={setIsClicked} deletionType={deletionType}  />
                        </div>
                    }
                </div>
            </div>
        </div>

    )

}