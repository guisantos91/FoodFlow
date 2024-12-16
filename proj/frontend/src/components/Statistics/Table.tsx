type TableProps = {
    todo: number[];
    preparing: number[];
    ready: number[];
};

function Table({ todo, preparing, ready }: TableProps) {
    return (
        <div className="overflow-x-auto ml-2 mr-2 rounded-xl">
            <table className="w-full mt-4 border-4 border-orange-500 rounded-xl min-h-[300px]">
                <thead className="sticky top-0 z-10">
                    <tr>
                        <th className="text-black border-2 border-orange-500 px-4 py-2 h-12">To-Do</th>
                        <th className="text-black border-2 border-orange-500 px-4 py-2 h-12">Preparing</th>
                        <th className="text-black border-2 border-orange-500 px-4 py-2 h-12">Ready</th>
                    </tr>
                </thead>

                <tbody className="overflow-y-auto min-h-[300px]">
                    <tr>
                        <td className="align-top border-2 border-orange-500 px-4 py-2 min-h-[300px] overflow-y-auto">
                            <ul className="text-black list-disc list-inside">
                                {todo.map((item, index) => (
                                    <li key={index} className="py-1">{item}</li>
                                ))}
                            </ul>
                        </td>
                        <td className="align-top border-2 border-orange-500 px-4 py-2 min-h-[300px] overflow-y-auto">
                            <ul className="text-black list-disc list-inside">
                                {preparing.map((item, index) => (
                                    <li key={index} className="py-1">{item}</li>
                                ))}
                            </ul>
                        </td>
                        <td className="align-top border-2 border-orange-500 px-4 py-2 min-h-[300px] overflow-y-auto">
                            <ul className="text-black list-disc list-inside">
                                {ready.map((item, index) => (
                                    <li key={index} className="py-1">{item}</li>
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