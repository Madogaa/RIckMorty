import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function ProfileFrame() {
  const profile = useSelector((state) => state.profile);

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

  return (
    <div className="flex flex-col w-full h-screen justify-around items-center">
      <div className="profile">
        <div className="w-32 h-32 rounded-full overflow-hidden">
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
          <li className="px-2 text-gray-400">{profile.gender}</li>
        </ul>
      </div>
      <div className="back bg-brigthblue text-white font-semibold py-4 px-32 rounded-md">
        <button className="">Back</button>
      </div>
    </div>
  );
}

export default ProfileFrame;
