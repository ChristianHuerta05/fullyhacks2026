import Octopus from "../../assets/LandingPage/Rolls/Octopus.svg";
import Capybara from "../../assets/LandingPage/Rolls/Capybara.svg";
import Fish from "../../assets/LandingPage/Rolls/Fish.svg";
import Turtles from "../../assets/LandingPage/Rolls/Turtles.svg";
export function Rolls() {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-100 w-full relative mt-5 bg-yellow-400">
      Choose Your Roll
      <img src={Octopus} alt="Octopus" className="w-1/3" />
      <img src={Capybara} alt="Capybara" className="w-1/3" />
      <img src={Fish} alt="Fish" className="w-1/3" />
      <img src={Turtles} alt="Turtles" className="w-1/3" />
    </div>
  );
}
