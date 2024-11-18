type TableProps = {
    todo: number[];
    preparing: number[];
    ready: number[];
};

function Table({ todo, preparing, ready }: TableProps) {
    return (
        <div className="overflow-x-auto ml-2 mr-2 rounded-xl">
            <table className="table w-full mt-4 border-4 border-orange-500 rounded-xl">
                <thead>
                    <tr>
                        <th className="text-black border-4 border-orange-500">To-Do</th>
                        <th className="text-black border-4 border-orange-500">Preparing</th>
                        <th className="text-black border-4 border-orange-500">Ready</th>
                    </tr>
                </thead>
                <tbody className="border-4 border-orange-500 rounded-xl">
                    <tr>
                        <td className="align-top border-4 border-orange-500">
                            <ul className="list-disc list-inside max-h-40 overflow-y-auto">
                                {todo.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </td>
                        <td className="align-top border-4 border-orange-500">
                            <ul className="list-disc list-inside max-h-40 overflow-y-auto">
                                {preparing.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </td>
                        <td className="align-top border-4 border-orange-500">
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