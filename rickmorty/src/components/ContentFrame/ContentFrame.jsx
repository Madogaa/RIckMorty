import React, { useEffect, useState } from "react";
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

  const toggleShowAllProfiles = () => {
    setShowAllProfiles(!showAllProfiles);
  };

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
    fetch("https://rickandmortyapi.com/api/character")
      .then((data) => data.json())
      .then((response) => setProfiles(response.results));
  }, []);



  return (
    <div>
      <div className="relative py-8">
      <h1 className='text-3xl font-semibold'>Rick & Morty</h1>
      <div className={`${profile.name === "" ? "hidden" : "" } absolute flex justify-center items-center gap-3 right-0 top-0 h-full py-8`}>
        <img className="w-12 rounded-full" src={profile.image} alt="Profile Image" />
        <p>My Profile</p>
      </div>
      </div>

      <ul className="switcher flex gap-6 justify-center pb-6 text-xl font-semibold">
        <li className={filter === "All" ? "active-filter" : ""} onClick={() => setFilter("All")}>All</li>
        <li className={filter === "Alive" ? "active-filter" : ""} onClick={() => setFilter("Alive")}>Alive</li>
        <li className={filter === "Dead" ? "active-filter" : ""} onClick={() => setFilter("Dead")}>Dead</li>
        <li className={filter === "unknown" ? "active-filter" : ""} onClick={() => setFilter("unknown")}>Unknown</li>
      </ul>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
        {displayedProfiles
          .map((profile) => (
            <div
              onClick={()=> { handleProfileClick(profile) }}
              className="profile border-2 border-gray-100 rounded-md cursor-pointer"
              key={profile.id}
            >
              <img src={profile.image} alt="Profile Img" />
              <div className="flex flex-col gap-2 justify-center align-center p-4">
                <h4 className="text-lg font-semibold text-blue">{profile.name}</h4>
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
            </div>
          ))}
      </div>

      <div className="flex justify-center mt-5">
        <button
          onClick={toggleShowAllProfiles}
          className="text-blue-400 py-1 text-xl border-b-2 border-blue-400"
        >
          {showAllProfiles ? "SEE LESS" : "LOAD MORE"}
        </button>
      </div>
    </div>
  );
}

export default ContentFrame;
