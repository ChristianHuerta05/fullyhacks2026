import { useState } from "react";
import PhotoPlaceholder from "../../assets/LandingPage/Teams/PhotoPlaceholder.svg";
import Fish from "../../assets/LandingPage/Teams/Fish.svg";

interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

interface TeamData {
  [key: string]: TeamMember[];
}

const teamData: TeamData = {
  Director: [
    { name: "Max Rivas", role: "Director", photo: PhotoPlaceholder },
    { name: "Mark Garcia", role: "Director", photo: PhotoPlaceholder },
  ],
  Web: [
    { name: "Christian Huerta", role: "Web TL", photo: PhotoPlaceholder },
    { name: "Kenny Garcia", role: "Developer", photo: PhotoPlaceholder },
    { name: "Dhara Panchal", role: "Developer", photo: PhotoPlaceholder },
    { name: "Hannah Minji Park", role: "Developer", photo: PhotoPlaceholder },
    { name: "Elena Marquez", role: "Developer", photo: PhotoPlaceholder },
    { name: "Siddharth Vasu", role: "Developer", photo: PhotoPlaceholder },
  ],
  Design: [
    { name: "Richard Hoang", role: "Design TL", photo: PhotoPlaceholder },
    { name: "Shane Smeaton", role: "Designer", photo: PhotoPlaceholder },
    { name: "Sama Ahmed", role: "Designer", photo: PhotoPlaceholder },
    { name: "Kristen Portillo", role: "Designer", photo: PhotoPlaceholder },
    { name: "Kayla Witecki", role: "Designer", photo: PhotoPlaceholder },
    { name: "Elzie Mazuca", role: "Designer", photo: PhotoPlaceholder },
    { name: "Charmaine Joy Cabral", role: "Designer", photo: PhotoPlaceholder },
    { name: "Chisom Okonkwo", role: "Designer", photo: PhotoPlaceholder },
  ],
  Finance: [
    { name: "Elena Marquez", role: "Finance", photo: PhotoPlaceholder },
    { name: "Kelsey Tang", role: "Finance", photo: PhotoPlaceholder },
  ],
  Marketing: [
    { name: "Angel Gaspar", role: "Marketing TL", photo: PhotoPlaceholder },
    { name: "Timothy Ou", role: "Marketing", photo: PhotoPlaceholder },
    { name: "Karina Garcia", role: "Marketing", photo: PhotoPlaceholder },
    { name: "Yuriko", role: "Marketing", photo: PhotoPlaceholder },
    { name: "Joel", role: "Marketing", photo: PhotoPlaceholder },
    { name: "Sofia Guillen", role: "Marketing", photo: PhotoPlaceholder },
  ],
  Operations: [
    { name: "Casey Dane", role: "Operations TL", photo: PhotoPlaceholder },
    { name: "Adam Secrest", role: "Operations", photo: PhotoPlaceholder },
    { name: "Demi Chen", role: "Operations", photo: PhotoPlaceholder },
    { name: "Adrian Vazquez", role: "Operations", photo: PhotoPlaceholder },
    { name: "Ngoc Tran", role: "Operations", photo: PhotoPlaceholder },
    { name: "Joel Daniel Rico", role: "Operations", photo: PhotoPlaceholder },
    { name: "Lexie Riley", role: "Operations", photo: PhotoPlaceholder },
    { name: "Kayla Gutierrez", role: "Operations", photo: PhotoPlaceholder },
    { name: "Erl-John Tauto-An", role: "Operations", photo: PhotoPlaceholder },
    { name: "Bernardo Cruz", role: "Operations", photo: PhotoPlaceholder },
    { name: "Brandon Parra", role: "Operations", photo: PhotoPlaceholder },
    { name: "Yves Velasquez Vega", role: "Operations", photo: PhotoPlaceholder },
    { name: "Jacob Sii", role: "Operations", photo: PhotoPlaceholder },
    { name: "Cyril Youssef", role: "Operations", photo: PhotoPlaceholder },
  ],
};

export function Teams() {
  const [activeTeam, setActiveTeam] = useState("Director");
  const teams = ["Director", "Web", "Design", "Finance", "Marketing", "Operations"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-100 w-full relative py-12 md:py-20 px-4">
      {/* Background fish images */}
      <img
        src={Fish}
        alt="Fish"
        className="absolute left-2 sm:left-4 md:left-8 lg:left-12 top-[65%] -translate-y-1/2 w-0 sm:w-20 md:w-24 lg:w-18 z-0 "
      />
      <img
        src={Fish}
        alt="Fish"
        className="absolute right-2 sm:right-4 md:right-8 lg:right-12 top-[65%] -translate-y-1/2 w-0 sm:w-20 md:w-24 lg:w-18 scale-x-[-1] z-0"
      />

      {/* Title */}
      <h1 className="text-[56px] md:text-7xl lg:text-8xl xl:text-9xl font-nemo text-[#BEF3FC] mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-center tracking-wider lowercase">
        our team
      </h1>

      {/* Team category buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-14 md:mb-16 lg:mb-20 w-full max-w-4xl z-10 px-2 sm:px-0">
        {teams.map((team) => (
          <button
            key={team}
            onClick={() => setActiveTeam(team)}
            className={`
              px-4 sm:px-6 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 rounded-full font-sans font-bold 
              text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
              transition-all duration-300 ease-in-out
              ${
                activeTeam === team
                  ? "bg-[#BEF3FC] text-[#1B3B80] shadow-lg scale-105"
                  : "bg-[#1B3B80] text-white border-2 border-[#2768A8] hover:bg-[#2768A8]"
              }
            `}
          >
            {team}
          </button>
        ))}
      </div>

      {/* Team members display*/}
      <div
        key={activeTeam}
        className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 md:gap-12 lg:gap-16 w-full max-w-6xl z-10 px-2 sm:px-4"
      >
        {teamData[activeTeam].map((member, index) => (
          <div
            key={`${activeTeam}-${index}`}
            className="flex flex-col items-center animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Heat photo */}
            <img
              src={member.photo}
              alt={member.name}
              className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-56 xl:h-56 mb-4 sm:mb-5 md:mb-6 transition-transform duration-300 hover:scale-110"
            />
            {/* Name */}
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-sans font-bold text-white text-center">
              {member.name}
            </h3>
            {/* Role */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans text-[#BEF3FC] text-center">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
