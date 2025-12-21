import Octopus from "../../assets/LandingPage/Rolls/Octopus.svg";
import Capybara from "../../assets/LandingPage/Rolls/Capybara.svg";
import Fish from "../../assets/LandingPage/Rolls/Fish.svg";
import Turtles from "../../assets/LandingPage/Rolls/Turtles.svg";

type Roll = {
  title: string;
  titleColor: string;
  description: string;
  color: string;
};

const rollList: Roll[] = [
  {
    title: "Judges",
    titleColor: "#3B087D",
    description:
      "Provide expert feedback, evaluate projects fairly, and inspire participants with constructive criticism and encouragement.",
    color: "#8E69CE",
  },
  {
    title: "Hackers",
    titleColor: "#080E7D",
    description:
      "Work in teams to develop innovative solutions and  present your projects to industry professionals.",
    color: "#6991CE",
  },
  {
    title: "Mentors",
    titleColor: "#08717D",
    description:
      "Help guide participants manage their ideas and cultivate an environment that ensures a smooth and enjoyable experience for everyone.",
    color: "#69CEC3",
  },
];

export function Rolls() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-100 w-full relative mt-5">
      <h2 className="font-nemo text-[#BEF3FC] text-center px-10 text-6xl lg:text-7xl xl:text-9xl font-normal lowercase my-12">
        Choose Your Roll
      </h2>
      <div className="w-full flex items-center flex-col lg:flex-row gap-13 justify-center lg:px-5">
        {rollList.map((roll, index) => (
          <div
            key={`rollList-${index}`}
            className="flex flex-col min-w-70 lg:w-70 max-w-[80%] w-96 xl:w-96 h-120 lg:h-145 xl:h-155 rounded-3xl relative overflow-visible"
            style={{ backgroundColor: roll.color }}
          >
            <h3
              className="py-3 lg:py-7 w-full text-center text-5xl xl:text-6xl font-normal font-nemo"
              style={{ color: roll.titleColor }}
            >
              {`${roll.title}`}
            </h3>
            <p className="font-bagel text-center text-white text-xl font-normal px-5">
              {`${roll.description}`}
            </p>
          </div>
        ))}
      </div>
      <div className="relative flex w-full items-end justify-center">
        <img
          src={Octopus}
          alt="Octopus"
          className="absolute transform -translate-y-254 translate-x-2 lg:-translate-x-85 lg:translate-y-5 xl:-translate-x-108 xl:translate-y-12 min-w-100 w-100 lg:w-100 xl:w-130 h-auto"
        />
        <img
          src={Capybara}
          alt="Capybara"
          className="absolute transform -translate-y-128 lg:-translate-y-10 min-w-85 w-90 lg:w-85 xl:w-105 h-auto"
        />
        <img
          src={Fish}
          alt="Fish"
          className="absolute transform translate-y-5 lg:translate-x-85 lg:-translate-y-8 xl:translate-x-110 min-w-85 w-85 lg:w-90 xl:w-110 h-auto"
        />
      </div>
      <div className="flex flex-row w-full h-50 mt-5 lg:mt-20 justify-center lg:justify-start">
        <img src={Turtles} alt="Turtles" className="items-start w-60 lg:w-120 h-auto" />
      </div>
    </div>
  );
}
