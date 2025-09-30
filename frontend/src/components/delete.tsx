import { AiFillDelete } from "react-icons/ai";
import { BsFillXCircleFill } from "react-icons/bs";

interface DeleteProps {
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
    setCliqueBotao: React.Dispatch<React.SetStateAction<boolean>>;
    cliqueBotao: boolean;
    setDeletionType: React.Dispatch<React.SetStateAction<'task' | 'list' | null>>;
    onConfirm: () => void;
    listNameToDelete: string | null;
    taskNameToDelete?: string | null;
    deletionType: 'task' | 'list' | null;
}

export default function Delete({ setIsDeleted, setIsClicked, setCliqueBotao, cliqueBotao, setDeletionType, onConfirm, listNameToDelete, taskNameToDelete, deletionType}: DeleteProps) {
    return (
        <div className="bg-black/45 fixed inset-0 z-50 flex items-center justify-center">
            <div className="flex flex-col bg-background rounded-xl border border-white py-3 px-4 max-w-[25.8125rem]">
                <button onClick={() => setIsDeleted(false)} className="flex ml-auto p-1 cursor-pointer hover:bg-options-button-hover active:bg-options-button-pressed"><BsFillXCircleFill size={24} /></button>
                <div className="flex flex-col gap-4">
                    {deletionType === 'task' ? <h6 className="font-semibold">Tem certeza que deseja deletar a tarefa {taskNameToDelete}?</h6> : <h6 className="font-semibold">Tem certeza que deseja deletar a lista {listNameToDelete}?</h6>}
                    <p>Essa ação não é reversível.</p>
                    <div className="flex items-start">
                        <button onClick={() => {
                            setIsDeleted(false);
                            onConfirm();
                        }} className="flex items-center gap-2 p-2 text-danger hover:bg-options-button-hover cursor-pointer active:bg-options-button-pressed">
                            <i><AiFillDelete size={18} /></i>
                            <p className="mt-0.5">Deletar</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}