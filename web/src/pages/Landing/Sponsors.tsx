import GameMachine from "../../assets/LandingPage/Sponsors/GameMachine.svg";
import Fush from "../../assets/LandingPage/Sponsors/Fush.svg";
import PufferFish from "../../assets/LandingPage/Sponsors/PufferFish.svg";
export function Sponsors() {
  return (
    <div className="min-h-screen flex flex-col items-center  text-slate-100 w-full relative mt-15  gap-15">
      <h1 className="text-[146px] font-nemo leading-none">Sponsors</h1>
      <h1 className="text-[84px] font-bagel ">Score: 1</h1>
      <img src={GameMachine} alt="Game Machine" className="w-1/3" />
      <div className="flex gap-15">
        <img src={Fush} alt="Fush" className="w-1/3" />
        <img src={PufferFish} alt="PufferFish" className="w-1/3" />
      </div>
    </div>
  );
}
