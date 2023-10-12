import React from "react";
import PropTypes from "prop-types";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProfile } from "../../redux/profileSlice";

function Profile({ profile }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
      // Función para manejar el clic en un perfil
  const handleProfileClick = (profile) => {
    // Preparar los datos del perfil
    const data = {
      name: profile.name,
      status: profile.status,
      species: profile.species,
      gender: profile.gender,
      image: profile.image,
      location: profile.location,
      episode: profile.episode,
    };
    // Agregarlos al estado
    dispatch(addProfile(data));
    // Navegar a la página de perfil
    navigate("/profile");
  };

  // Función para obtener la clase de color del "status" según el estado del perfil
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
    <div
      onClick={() => handleProfileClick(profile)}
      className="profile p-4 sm:p-0 border-2 border-gray-100 rounded-md cursor-pointer"
    >
      <img src={profile.image} alt="Profile Img" />
      <div className="flex flex-col gap-2 justify-center align-center px-0 pt-2 sm:p-4">
        <h4
          id="name"
          className="whitespace-nowrap overflow-hidden text-ellipsis text-lg font-semibold text-blue"
        >
          {profile.name}
        </h4>
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
  );
}

// PropTypes para el componente Profile
Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    episode: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Profile;
