export default function Tabla({ ganadoresRonda }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full table-auto text-sm text-gray-700">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs sm:text-sm">Ganador</th>
            <th className="px-4 py-3 text-left text-xs sm:text-sm">Goles</th>
            <th className="px-4 py-3 text-left text-xs sm:text-sm">Puntos</th>
            <th className="px-4 py-3 text-left text-xs sm:text-sm">Perdedor</th>
            <th className="px-4 py-3 text-left text-xs sm:text-sm">Goles</th>
            <th className="px-4 py-3 text-left text-xs sm:text-sm">Puntos</th>
            <th className="px-4 py-3 text-left text-xs sm:text-sm">Penaltis</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(ganadoresRonda).map((partido, index) => (
            <tr
              key={index}
              className="border-t border-gray-300 hover:bg-gray-50"
            >
              <td className="px-4 py-3 text-left text-sm font-medium text-gray-800">
                {partido.ganador.nombre}
              </td>
              <td className="px-4 py-3 text-center text-sm text-gray-800">
                {partido.ganador.goles}
              </td>
              <td className="px-4 py-3 text-center text-sm text-gray-800">
                {partido.ganador.golesTotales * 3}
              </td>
              <td className="px-4 py-3 text-left text-sm font-medium text-gray-800">
                {partido.perdedor.nombre}
              </td>
              <td className="px-4 py-3 text-center text-sm text-gray-800">
                {partido.perdedor.goles}
              </td>
              <td className="px-4 py-3 text-center text-sm text-gray-800">
                {partido.perdedor.golesTotales * 3}
              </td>
              <td className="px-4 py-3 text-center text-sm">
                {partido.penaltis ? "Si" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
