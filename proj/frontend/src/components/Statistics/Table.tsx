type TableProps = {
    processing: number[];
    preparing: number[];
    ready: number[];
};

function Table({ processing, preparing, ready }: TableProps) {
    return (
        <div className="overflow-x-auto ml-2 mr-2">
            <table className="min-w-full divide-y divide-gray-200 mt-4 border border-orange-500 rounded-lg table-fixed">
                <thead className="border border-orange-500">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Processing
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Preparing
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ready
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 align-top">
                            <ul className="list-disc list-inside">
                                {processing.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 align-top">
                            <ul className="list-disc list-inside">
                                {preparing.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 align-top">
                            <ul className="list-disc list-inside">
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