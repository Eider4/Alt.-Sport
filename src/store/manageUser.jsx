import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStoreUsuario = create(
  persist(
    (set) => ({
      usuario: { nombre: "", equipos: {} },

      AddEquipos: (nuevosEquipo) =>
        set((state) => ({
          usuario: {
            ...state.usuario,
            equipos: { ...state.usuario.equipos, ...nuevosEquipo }, // Añade nuevo equipo al array
          },
        })),

      createUser: (userName) =>
        set((state) => ({
          usuario: { ...state.usuario, nombre: userName },
        })),
    }),
    {
      name: "store-usuario", // Clave de persistencia
    }
  )
);

export default useStoreUsuario;
