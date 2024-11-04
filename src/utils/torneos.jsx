import img from "../assets/knockout.png";

export const torneos = [
  {
    id: "1",
    nombre: "Knockouto",
    descripcion: "Torneo de Eliminación Directa",
    jugabilidad:
      "Los equipos se enfrentan en partidos de eliminación directa; el perdedor queda fuera.",
    img,
    reglas: [
      "El equipo perdedor de cada partido es eliminado.",
      "El ganador avanza a la siguiente ronda hasta quedar un campeón.",
      "En caso de empate, se juegan tiempos extras o penales.",
    ],
  },
  {
    id: "2",
    nombre: "Round Robin",
    descripcion: "Torneo de Liga o Todos contra Todos",
    jugabilidad: "Cada equipo juega contra todos los demás al menos una vez.",
    img,
    reglas: [
      "3 puntos por victoria, 1 por empate, 0 por derrota.",
      "Gana el equipo con más puntos al final.",
      "Se puede definir un criterio de desempate como diferencia de goles.",
    ],
  },
  {
    id: "3",
    nombre: "Grupo y Eliminación",
    descripcion: "Torneo de Fase de Grupo y Eliminación",
    jugabilidad:
      "Los equipos juegan en grupos y los mejores avanzan a eliminatorias.",
    img,
    reglas: [
      "Fase de grupos todos contra todos.",
      "Los dos mejores de cada grupo avanzan a la fase de eliminación.",
      "Eliminación directa para definir el campeón.",
    ],
  },
  {
    id: "4",
    nombre: "Doble Eliminación",
    descripcion: "Torneo de Doble Eliminación",
    jugabilidad: "Cada equipo debe perder dos veces para ser eliminado.",
    img,
    reglas: [
      "Un equipo queda eliminado después de dos derrotas.",
      "Cuadro de ganadores y cuadro de perdedores.",
      "Los últimos equipos de cada cuadro se enfrentan en la final.",
    ],
  },
  {
    id: "5",
    nombre: "Torneo Suizo",
    descripcion: "Torneo con sistema Suizo",
    jugabilidad:
      "Los equipos juegan varias rondas contra oponentes de nivel similar.",
    img,
    reglas: [
      "Cada equipo juega varias rondas predeterminadas.",
      "Se emparejan con equipos de rendimiento similar cada ronda.",
      "No hay eliminación directa, pero los puntos determinan el ganador.",
    ],
  },
  {
    id: "6",
    nombre: "Torneo Relámpago",
    descripcion: "Torneo corto con partidos rápidos",
    jugabilidad:
      "Cada partido dura un tiempo corto y el torneo se completa en un solo día.",
    img,
    reglas: [
      "Los partidos duran menos tiempo de lo normal.",
      "Ideal para organizar en un solo día.",
      "El equipo que gana avanza, eliminando al perdedor.",
    ],
  },
  {
    id: "7",
    nombre: "Liguilla",
    descripcion: "Torneo de Fase Final después de una Liga",
    jugabilidad:
      "Tras la liga regular, los mejores equipos juegan una fase de eliminación.",
    img,
    reglas: [
      "Se juega tras una fase de liga regular.",
      "Los equipos mejor clasificados compiten en eliminación directa.",
      "El equipo ganador de la liguilla es el campeón.",
    ],
  },
  {
    id: "8",
    nombre: "Round Robin Doble",
    descripcion: "Torneo de Liga ida y vuelta",
    jugabilidad:
      "Cada equipo juega dos veces contra cada oponente: una de local y otra de visitante.",
    img,
    reglas: [
      "Los equipos juegan contra todos dos veces (local y visitante).",
      "Gana el equipo con más puntos al final.",
      "En caso de empate, se utilizan goles a favor como desempate.",
    ],
  },
  {
    id: "9",
    nombre: "Eliminación Simple con Consolación",
    descripcion: "Eliminación directa con partidos de consolación",
    jugabilidad:
      "Los equipos eliminados juegan partidos para posiciones secundarias.",
    img,
    reglas: [
      "Los perdedores juegan para decidir posiciones menores.",
      "Gana el campeón del cuadro principal.",
      "Permite que todos los equipos jueguen más partidos.",
    ],
  },
  {
    id: "10",
    nombre: "Torneo Escalonado",
    descripcion: "Equipos juegan en varias rondas con ascensos y descensos",
    jugabilidad:
      "Equipos avanzan a niveles superiores o descienden según su rendimiento.",
    img,
    reglas: [
      "Los equipos se agrupan en niveles.",
      "Los ganadores ascienden, y los perdedores descienden de nivel.",
      "La ronda final decide al campeón de todos los niveles.",
    ],
  },
];