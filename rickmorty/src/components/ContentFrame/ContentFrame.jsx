import React, { useCallback, useEffect, useState } from "react";
import "./ContentFrame.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addProfile } from "../../redux/profileSlice"

function ContentFrame() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profile);

  const [profiles, setProfiles] = useState([]);
  const [showAllProfiles, setShowAllProfiles] = useState(false);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1); // Página actual
  const [totalPages, setTotalPages] = useState(1); // Número total de páginas

  const filteredProfiles = filter === "All"
  ? profiles
  : profiles.filter((profile) => profile.status === filter);

  const displayedProfiles = showAllProfiles ? filteredProfiles : filteredProfiles.slice(0, 8);

  const getTextColorClass = (status) => {
    switch (status) {
      case "Dead":
        return "text-red-400"; // Rojo para "Dead"
      case "Alive":
        return "text-green-400"; // Verde para "Alive"
      case "unknown":
        return "text-blue-400"; // Azul para "unknown"
      default:
        return "text-gray-700"; // Otros colores por defecto
    }
  };

  const loadMoreProfiles = useCallback(() => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      setShowAllProfiles(true)
    } else if(page === totalPages) setShowAllProfiles(false)
  }, [page, totalPages]);

  const handleProfileClick = (profile) => {
    const data = {
      name: profile.name,
      status: profile.status,
      species: profile.species,
      gender: profile.gender,
      image: profile.image,
      location: profile.location,
      episode: profile.episode,
    }
    dispatch(addProfile(data))
    navigate('/profile')
  }

  useEffect(() => {
    // Usar la URL de la página actual en la solicitud
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((data) => data.json())
      .then((response) => {
        // Actualizar los perfiles y la información de paginación
        setProfiles((prevProfiles) => [...prevProfiles, ...response.results]);
        setTotalPages(response.info.pages);
      });
  }, [page]); // Volver a cargar cuando cambie la página




  return (
    <div>
      <div className="relative py-8">
      <h1 id="title" className='text-3xl font-semibold'>Rick & Morty</h1>
      <div className={`${profile.name === "" ? "hidden" : "" } absolute flex justify-center items-center gap-3 right-0 top-0 h-full py-8`}>
        <img className="w-10 sm:w-12 mr-2 sm:mr-0 rounded-full" src={profile.image} alt="Profile Image" />
        <p className="hidden sm:block">My Profile</p>
      </div>
      </div>

      <ul id="switcher" className="flex gap-6 justify-center pb-6 text-xl font-semibold">
        <li className={filter === "All" ? "active-filter" : ""} onClick={() => setFilter("All")}>All</li>
        <li className={filter === "Alive" ? "active-filter" : ""} onClick={() => setFilter("Alive")}>Alive</li>
        <li className={filter === "Dead" ? "active-filter" : ""} onClick={() => setFilter("Dead")}>Dead</li>
        <li className={filter === "unknown" ? "active-filter" : ""} onClick={() => setFilter("unknown")}>Unknown</li>
      </ul>

      <div className="layout grid grid-cols-[repeat(2,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 sm:gap-8">
        {displayedProfiles
          .map((profile,index) => (
            <div
              onClick={()=> { handleProfileClick(profile) }}
              className="profile p-4 sm:p-0 border-2 border-gray-100 rounded-md cursor-pointer"
              key={index}
            >
              <img src={profile.image} alt="Profile Img" />
              <div className="flex flex-col gap-2 justify-center align-center px-0 pt-2 sm:p-4">
                <h4 id="name" className="whitespace-nowrap overflow-hidden text-ellipsis text-lg font-semibold text-blue">{profile.name}</h4>
                <ul className="attributes flex justify-center flex-wrap">
                  <li
                    className={`w-full sm:w-auto font-semibold border-r-2 border-none sm:border-gray-300 px-2 ${getTextColorClass(
                      profile.status
                    )}`}
                  >
                    {profile.status}
                  </li>
                  <li className="border-r-2 text-gray-400 border-gray-300 pr-1 sm:px-2">
                    {profile.species}
                  </li>
                  <li className="pl-1 sm:px-2 text-gray-400">{profile.gender}</li>
                </ul>
              </div>
            </div>
          ))}
      </div>

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

    </div>
  );
}

export default ContentFrame;
