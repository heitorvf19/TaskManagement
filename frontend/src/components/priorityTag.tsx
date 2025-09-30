interface Priority{
    typePriority: 'Low' | 'Medium' | 'High' | 'SuperHigh';
}

export default function PriorityTag({typePriority}: Priority) {
    if (typePriority == 'Low')
        return(
            <div className="bg-low-priority-background text-low-priority-text inline-flex py-1 px-4 rounded justify-center items-center">
                <small className="font-semibold">Baixa Prioridade</small>
            </div>
        )

    else if (typePriority == 'Medium')
        return(
            <div className="bg-medium-priority-background text-medium-priority-text inline-flex py-1 px-4 rounded justify-center items-center">
                <small className="font-semibold">Média Prioridade</small>
            </div>
        )

    else if (typePriority == 'High')
        return(
            <div className="bg-high-priority-background text-high-priority-text inline-flex py-1 px-4 rounded justify-center items-center">
                <small className="font-semibold">Alta Prioridade</small>
            </div>
        )

    else if (typePriority == 'SuperHigh')
        return(
            <div className="bg-super-high-priority-background text-super-high-priority-text inline-flex py-1 px-4 rounded justify-center items-center">
                <small className="font-semibold">Altíssima Prioridade</small>
            </div>
        )
}       