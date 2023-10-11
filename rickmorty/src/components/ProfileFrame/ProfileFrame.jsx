import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Accordion from "../Accordion";
import { useNavigate } from "react-router-dom";
import "./ProfileFrame.css";

function ProfileFrame() {
  const profile = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const handleNavigateBack = () => navigate("/");

  useEffect(() => {
    if (profile.name === "") handleNavigateBack();
  }, []);

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

  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const handleAccordionClick = (index) => {
    if (openAccordionIndex === index) {
      setOpenAccordionIndex(null); // Cierra el acordeón si se hace clic en el activo
    } else {
      setOpenAccordionIndex(index); // Abre el acordeón si se hace clic en otro
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen justify-around items-center p-20">
      <div className="profile flex flex-col justify-center items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
          <img className="w-full h-full" src={profile.image} alt="" />
        </div>
        <h4 className="text-2xl text-blue font-semibold">{profile.name}</h4>
        <ul className="flex justify-center">
          <li
            className={`font-semibold border-r-2 border-gray-300 px-2 ${getTextColorClass(
              profile.status
            )}`}
          >
            {profile.status}
          </li>
          <li className="border-r-2 text-gray-400 border-gray-300 px-2">
            {profile.species}
          </li>
          <li className=" px-2 text-gray-400">{profile.gender}</li>
        </ul>

        <div className="flex flex-col gap-6 pt-12">
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
                {profile.episode.map((episode, index) => (
                  <p className="text-gray-400" key={index}>
                    {episode}
                  </p>
                ))}
              </div>
            }
            isOpen={openAccordionIndex === 1}
            onToggle={() => handleAccordionClick(1)}
          />
        </div>
      </div>
      <div className="back bg-brigthblue text-white font-semibold rounded-md mt-10">
        <button
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
