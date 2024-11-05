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
            equipos: { ...state.usuario.equipos, ...nuevosEquipo },
          },
        })),

      createUser: (userName) =>
        set((state) => ({
          usuario: { ...state.usuario, nombre: userName },
        })),

      eliminarEquipo: (id_equipo) =>
        set((state) => {
          console.log(id_equipo);

          const { [id_equipo]: _, ...nuevosEquipos } = state.usuario.equipos;

          return {
            usuario: {
              ...state.usuario,
              equipos: nuevosEquipos,
            },
          };
        }),
      addEquipo: (obj) =>
        set((state) => (state.usuario.equipos[obj.id] = obj.object)),
    }),
    {
      name: "store-usuario",
    }
  )
);

export default useStoreUsuario;
