type TableProps = {
    todo: number[];
    preparing: number[];
    ready: number[];
};

function Table({ todo, preparing, ready }: TableProps) {
    return (
        <div className="overflow-x-auto ml-2 mr-2">
            <table className="table w-full mt-4">
                <thead>
                    <tr>
                        <th>To-Do</th>
                        <th>Preparing</th>
                        <th>Ready</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="align-top">
                            <ul className="list-disc list-inside max-h-40 overflow-y-auto">
                                {todo.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </td>
                        <td className="align-top">
                            <ul className="list-disc list-inside max-h-40 overflow-y-auto">
                                {preparing.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </td>
                        <td className="align-top">
                            <ul className="list-disc list-inside max-h-40 overflow-y-auto">
                                {ready.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Table;