import React, { useCallback, useEffect, useState } from "react";
import "./ContentFrame.css";
import { useSelector } from "react-redux";
import Profile from "./Profile/Profile";

function ContentFrame() {
  // Estado del perfil del usuario
  const profile = useSelector((state) => state.profile);

  // Estados locales
  const [isLoading, setIsLoading] = useState(false); // Control de carga de perfiles
  const [profiles, setProfiles] = useState([]); // Almacén de perfiles
  const [showAllProfiles, setShowAllProfiles] = useState(false); // Cantidad de perfiles en View
  const [filter, setFilter] = useState("All"); // Filtro de perfiles
  const [page, setPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Número total de páginas

  // Filtrar perfiles según el estado
  const filteredProfiles =
    filter === "All"
      ? profiles
      : profiles.filter((profile) => profile.status === filter);

  // Limitar la cantidad de perfiles mostrados
  const displayedProfiles = showAllProfiles
    ? filteredProfiles
    : filteredProfiles.slice(0, 8);

  // Función para cargar más perfiles
  const loadMoreProfiles = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1); // Avanza una pagina
      setShowAllProfiles(true); // Muestra todos los perfiles disponibles en memoria
    } else if (page === totalPages) setShowAllProfiles(false); // Dejar de mostrar boton LOAD MORE cuando todos los perfiles estan cargados
  }, [page, totalPages]);

  // Efecto para cargar perfiles desde la API
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((data) => data.json())
      .then((response) => {
        // Actualizar los perfiles y la información de paginación
        setProfiles((prevProfiles) => [...prevProfiles, ...response.results]);
        setTotalPages(response.info.pages);
        setIsLoading(false); // Deja de mostrar el "loader"
      });
  }, [page]); // Volver a cargar cuando cambie la página

  return (
    <div>
      <div className="relative py-8">
        <h1 id="title" className="text-3xl font-semibold">
          Rick & Morty
        </h1>
        <div
          className={`${
            profile.name === "" ? "hidden" : ""
          } absolute flex justify-center items-center gap-3 right-0 top-0 h-full py-8`}
        >
          <img
            className="w-10 sm:w-12 mr-2 sm:mr-0 rounded-full"
            src={profile.image}
            alt="Profile Image"
          />
          <p className="hidden sm:block">My Profile</p>
        </div>
      </div>

      <ul
        id="switcher"
        className="flex gap-6 justify-center pb-6 text-xl font-semibold"
      >
        <li
          className={filter === "All" ? "active-filter" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </li>
        <li
          className={filter === "Alive" ? "active-filter" : ""}
          onClick={() => setFilter("Alive")}
        >
          Alive
        </li>
        <li
          className={filter === "Dead" ? "active-filter" : ""}
          onClick={() => setFilter("Dead")}
        >
          Dead
        </li>
        <li
          className={filter === "unknown" ? "active-filter" : ""}
          onClick={() => setFilter("unknown")}
        >
          Unknown
        </li>
      </ul>

      <div className="layout grid grid-cols-[repeat(2,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 sm:gap-8">
        {displayedProfiles.map((profile, index) => (
          <Profile key={index} profile={profile} />
        ))}
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center items-center mt-40">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex justify-center mt-5 mb-5">
          {page < totalPages && (
            <button
              onClick={loadMoreProfiles}
              className="text-blue-400 py-1 text-xl border-b-2 border-blue-400"
            >
              LOAD MORE
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ContentFrame;
