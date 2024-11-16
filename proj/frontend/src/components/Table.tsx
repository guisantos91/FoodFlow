function Table({ processing, preparing, ready }) {
    return (
        <div className="overflow-x-auto ml-2 mr-2">
            <table className="min-w-full divide-y divide-gray-200 mt-4">
                <thead className="">
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {processing.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {preparing.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {ready.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Table;