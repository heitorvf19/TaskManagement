import { BsFillPlusCircleFill } from "react-icons/bs";

interface NewTaskProps {
    handleCreateTask: () => void;
}

export default function NewTask({ handleCreateTask }: NewTaskProps) {

    return (
        <button onClick={handleCreateTask} className="inline-flex items-center gap-4 p-2.5 hover:bg-options-button-hover cursor-pointer">
            <i><BsFillPlusCircleFill size={20} /></i>
            <p>Nova tarefa</p>
        </button>
    );
}