import { BsFillPlusCircleFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

interface NewListProps {
    handleCreateList: (event: React.FormEvent, 
    listName: string, 
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>, 
    setInputValue: React.Dispatch<React.SetStateAction<string>>) => void;
}

export default function NewList({ handleCreateList }: NewListProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null); 
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        if (!isEditing) return;
        function handleClickOutside(event: MouseEvent) {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setIsEditing(false);
                setInputValue("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing]);

    const onSubmit = (event: React.FormEvent) => {
        handleCreateList(event, inputValue.trim(), setIsEditing, setInputValue);
    };

    return (
        <div className="flex-col relative justify-between items-center py-2 flex mr-10" ref={cardRef}>
            {!isEditing ? (
                <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 p-2 rounded-xl hover:bg-options-button-hover cursor-pointer max-w-[18.75rem] w-full"
                >
                    <i><BsFillPlusCircleFill size={24} /></i>
                    <h6 className="font-semibold whitespace-nowrap">Nova lista</h6>
                </button>
            ) : (
                <form onSubmit={onSubmit} className="w-full max-w-[18.75rem]">
                    <input
                        ref={inputRef}
                        type="text"
                        className="bg-transparent font-semibold outline-none w-[18.75rem] text-[1.2rem] border  border-white rounded-xl px-2 py-1 flex"
                        placeholder="Digite o nome da lista aqui"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                </form>
            )}
        </div>
    );
}