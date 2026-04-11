import { useState } from "react";
import PhotoPlaceholder from "../../assets/LandingPage/Teams/PhotoPlaceholder.svg";
import Fish from "../../assets/LandingPage/Teams/Fish.svg";
import Bubble from "../../assets/LandingPage/Teams/Bubble.svg";

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
    { name: "Max Rivas", role: "Director", photo: "/organizers/director/MaximilianoRivas.webp" },
    { name: "Mark Garcia", role: "Director", photo: "/organizers/director/MarkGarcia.webp" },
  ],
  Web: [
    { name: "Christian Huerta", role: "Web TL", photo: "/organizers/web/ChristianHuerta.webp" },
    { name: "Kenny Garcia", role: "Developer", photo: "/organizers/web/KennyGarcia.webp" },
    { name: "Dhara Panchal", role: "Developer", photo: "/organizers/web/DharaPanchal.webp" },
    { name: "Hannah Minji Park", role: "Developer", photo: "/organizers/web/HannahMinjiPark.webp" },
    { name: "Elena Marquez", role: "Developer", photo: "/organizers/finance/elena-marquez.webp" },
    { name: "Siddharth Vasu", role: "Developer", photo: "/organizers/web/SiddharthVasu.webp" },
  ],
  Design: [
    {
      name: "Richard Hoang",
      role: "Design TL",
      photo: "/organizers/design/RichardHoang.webp",
    },
    {
      name: "Shane Smeaton",
      role: "Designer",
      photo: "/organizers/design/ShaneSmeaton.webp",
    },
    {
      name: "Sama Ahmed",
      role: "Designer",
      photo: "/organizers/design/SamaAhmed.webp",
    },
    {
      name: "Kristen Portillo",
      role: "Designer",
      photo: "/organizers/design/KristenPortillo.webp",
    },
    {
      name: "Kayla Witecki",
      role: "Designer",
      photo: "/organizers/design/KaylaWitecki.webp",
    },
    {
      name: "Elzie Mazuca",
      role: "Designer",
      photo: "/organizers/design/ElzieMazuca.webp",
    },
    {
      name: "Charmaine Joy Cabral",
      role: "Designer",
      photo: "/organizers/design/CharmaineJoyCabral.webp",
    },
    {
      name: "Chisom Okonkwo",
      role: "Designer",
      photo: "/organizers/design/ChisomOkonkwo.webp",
    },
  ],
  Finance: [
    {
      name: "Elena Marquez",
      role: "Finance Co-Lead",
      photo: "/organizers/finance/elena-marquez.webp",
    },
    {
      name: "Kelsey Tang",
      role: "Finance Co-Lead",
      photo: "/organizers/finance/KelseyTang.webp",
    },
  ],
  Marketing: [
    {
      name: "Angel Gaspar",
      role: "Marketing TL",
      photo: "/organizers/marketing/AngelGaspar.webp",
    },
    { name: "Timothy Ou", role: "Marketing", photo: "/organizers/marketing/TimothyOu.webp" },
    {
      name: "Karina Garcia",
      role: "Marketing",
      photo: "/organizers/marketing/KarinaGarcia.webp",
    },
    {
      name: "Yuriko Ysique Lopez ",
      role: "Marketing",
      photo: "/organizers/marketing/YurikoYsique.webp",
    },
    { name: "Joel Rejive", role: "Marketing", photo: PhotoPlaceholder },
    {
      name: "Sofia Guillen",
      role: "Marketing",
      photo: "/organizers/marketing/SofiaGuillen.webp",
    },
    { name: "Daisy Martinez", role: "Marketing", photo: "/organizers/marketing/Daisy.webp" },
    { name: "Julie Yun", role: "Marketing", photo: PhotoPlaceholder },
  ],
  Operations: [
    {
      name: "Casey Dane",
      role: "Operations TL",
      photo: "/organizers/operations/CaseyDane.webp",
    },
    {
      name: "Adam Secrest",
      role: "Operations",
      photo: "/organizers/operations/AdamSecrest.webp",
    },
    { name: "Demi Chen", role: "Operations", photo: "/organizers/operations/DemiChen.webp" },
    {
      name: "Adrian Vazquez",
      role: "Operations",
      photo: "/organizers/operations/AdrianVazquez.webp",
    },
    { name: "Ngoc Tran", role: "Operations", photo: "/organizers/operations/NgocTran.webp" },
    {
      name: "Joel Daniel Rico",
      role: "Operations",
      photo: "/organizers/operations/JoelDanielRico.webp",
    },
    {
      name: "Lexie Riley",
      role: "Operations",
      photo: "/organizers/operations/LexieRiley.webp",
    },
    {
      name: "Kayla Gutierrez",
      role: "Operations",
      photo: "/organizers/operations/KaylaGutierrez.webp",
    },
    { name: "Erl-John Tauto-An", role: "Operations", photo: PhotoPlaceholder },
    { name: "Bernardo Cruz", role: "Operations", photo: PhotoPlaceholder },
    {
      name: "Brandon Parra",
      role: "Operations",
      photo: "/organizers/operations/BrandonParra.webp",
    },
    { name: "Jacob Sii", role: "Operations", photo: "/organizers/operations/JacobSii.webp" },
    {
      name: "Cyril Youssef",
      role: "Operations",
      photo: "/organizers/operations/CyrilYoussef.webp",
    },
    {
      name: "Taymas",
      role: "Operations",
      photo: "/organizers/operations/Taymas.webp",
    },
    {
      name: "Celine",
      role: "Operations",
      photo: "/organizers/operations/Celine.webp",
    },
    {
      name: "Kunj",
      role: "Operations",
      photo: "/organizers/operations/Kunj.webp",
    },
    {
      name: "Iracema",
      role: "Operations",
      photo: "/organizers/operations/Iracema.webp",
    },
    {
      name: "Cassandra",
      role: "Operations",
      photo: "/organizers/operations/Cassandra.webp",
    },
    {
      name: "LordAwesome",
      role: "Operations",
      photo: "/organizers/operations/LordAwesome.webp",
    },
    {
      name: "Tracy",
      role: "Operations",
      photo: "/organizers/operations/Tracy.webp",
    },
  ],
};

export function Teams() {
  const [activeTeam, setActiveTeam] = useState("Director");
  const teams = ["Director", "Web", "Design", "Finance", "Marketing", "Operations"];

  const prevTeam = () => {
    const idx = teams.indexOf(activeTeam);
    setActiveTeam(teams[(idx - 1 + teams.length) % teams.length]);
  };

  const nextTeam = () => {
    const idx = teams.indexOf(activeTeam);
    setActiveTeam(teams[(idx + 1) % teams.length]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-100 w-full relative py-12 md:py-20 px-4">
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

      {/* Team members display — fish nav + fixed-height container */}
      <div className="relative w-full flex items-start justify-center">
        {/* Left fish — prev team */}
        <button
          onClick={prevTeam}
          aria-label="Previous team"
          className="hidden sm:flex absolute left-2 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-20 bg-transparent border-none p-0 cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <img src={Fish} alt="Previous team" className="w-20 md:w-24 lg:w-18" />
        </button>

        {/* Fixed-height wrapper — sized for Operations, the largest team */}
        <div className="min-h-[700px] sm:min-h-[780px] md:min-h-[900px] lg:min-h-[1000px] flex items-start justify-center w-full max-w-6xl px-2 sm:px-20 md:px-28 lg:px-32">
          <div
            key={activeTeam}
            className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 md:gap-12 lg:gap-16 w-full z-10 px-2 sm:px-4"
          >
            {teamData[activeTeam].map((member, index) => (
              <div
                key={`${activeTeam}-${index}`}
                className="flex flex-col items-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Bubble overlaying the photo */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-56 xl:h-56 mb-4 sm:mb-5 md:mb-6 transition-transform duration-300 hover:scale-110">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="absolute inset-0 m-auto w-[85%] h-[85%] rounded-full object-cover"
                  />
                  <img src={Bubble} alt="Bubble" className="absolute inset-0 w-full h-full" />
                </div>
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

        {/* Right fish — next team */}
        <button
          onClick={nextTeam}
          aria-label="Next team"
          className="hidden sm:flex absolute right-2 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 bg-transparent border-none p-0 cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          <img src={Fish} alt="Next team" className="w-20 md:w-24 lg:w-18 scale-x-[-1]" />
        </button>
      </div>
    </div>
  );
}
