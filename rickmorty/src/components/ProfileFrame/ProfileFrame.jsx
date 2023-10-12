import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Accordion from "../Accordion";
import { useNavigate } from "react-router-dom";
import "./ProfileFrame.css";

function ProfileFrame() {
  // Obtener el perfil del estado global
  const profile = useSelector((state) => state.profile);

  // Estados locales
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null); // Indice del acordeon abierto
  const [episodesData, setEpisodesData] = useState([]); // Estado para almacenar datos de episodios

  // Función para navegar de regreso a la página anterior
  const navigate = useNavigate();
  const handleNavigateBack = () => navigate("/");

  // Comprueba si el perfil está vacío y navega de regreso
  useEffect(() => {
    if (profile.name === "") handleNavigateBack();
  }, []);

  // Función para obtener la clase de color de texto del según el estado del perfil
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

  // Función para manejar el click en los acordeones
  const handleAccordionClick = (index) => {
    if (openAccordionIndex === index) {
      setOpenAccordionIndex(null); // Cierra el acordeón si se hace click en el activo
    } else {
      setOpenAccordionIndex(index); // Abre el acordeón si se hace click en otro
    }
  };

  useEffect(() => {
    // Función para cargar los datos de episodios
    const fetchEpisodes = async () => {
      const episodePromises = profile.episode.map((episodeURL) =>
        fetch(episodeURL).then((response) => response.json())
      );

      // Espera todas las promesas de episodios y establece los datos cuando estén listos
      Promise.all(episodePromises)
        .then((episodes) => {
          setEpisodesData(episodes);
        })
        .catch((error) => {
          console.error("Error al cargar los episodios", error);
        });
    };

    // Llama a la función para cargar los datos de episodios cuando cambia el perfil o cuando se carga el componente
    fetchEpisodes();
  }, [profile.episode]);

  return (
    <div
      id="layout"
      className="flex flex-col w-full h-screen justify-around items-center py-20"
    >
      <div
        id="profile"
        className="flex flex-col flex-grow justify-center items-center"
      >
        <div
          id="detail"
          className="flex flex-col justify-center items-center gap-4"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img className="w-full h-full" src={profile.image} alt="" />
          </div>
          <span>
            <h4 className="text-2xl text-blue font-semibold">{profile.name}</h4>
            <ul className="flex justify-center">
              <li
                className={`font-semibold border-r-2 border-gray-300 pr-2 ${getTextColorClass(
                  profile.status
                )}`}
              >
                {profile.status}
              </li>
              <li className="border-r-2 text-gray-400 border-gray-300 px-2">
                {profile.species}
              </li>
              <li className=" pl-2 text-gray-400">{profile.gender}</li>
            </ul>
          </span>
        </div>

        <div id="accordions" className="flex flex-col flex-grow gap-6 mt-12">
          <Accordion
            title="Locations"
            icon="/LocationIcon.svg"
            content={<p className="text-gray-400">{profile.location.name}</p>}
            isOpen={openAccordionIndex === 0}
            onToggle={() => handleAccordionClick(0)}
          />
          <Accordion
            title="Episodes"
            icon="/EpisodesIcon.svg"
            content={
              <div className="flex flex-col gap-2">
                {episodesData.map((episode) => (
                  <p className="text-gray-400" key={episode.id}>
                    {`${episode.name} (${episode.episode})`}
                  </p>
                ))}
              </div>
            }
            isOpen={openAccordionIndex === 1}
            onToggle={() => handleAccordionClick(1)}
          />
        </div>
      </div>
      <div className="back bg-brigthblue text-white font-semibold rounded-md mt-12">
        <button
          id="backwards"
          className="py-4 px-36"
          onClick={() => {
            handleNavigateBack();
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ProfileFrame;
