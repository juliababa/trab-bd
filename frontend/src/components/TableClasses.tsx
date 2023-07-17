type Classes = {
  turma: string;
  materia: string;
  professor: string;
};

type TableClassesType = {
  data: Array<Classes>;
};
const TableClasses = ({ data }: TableClassesType) => {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
            >
              Turma
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
            >
              Matéria
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
            >
              Professor
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {/* Table rows go here */}
          {data.map(({ turma, materia, professor }) => (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{turma}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{materia}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{professor}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default TableClasses;
