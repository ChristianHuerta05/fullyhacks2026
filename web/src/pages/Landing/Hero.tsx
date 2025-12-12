import HeroMountains from "../../assets/LandingPage/Hero/HeroMountains.svg";
import SchoolOfFish from "../../assets/LandingPage/Hero/SchoolofFish.svg";

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-100 w-full relative mt-5 bg-[#020617]">
      <img src={HeroMountains} alt="Hero Mountains" className="w-full absolute top-0" />
      <img src={SchoolOfFish} alt="School of Fish" className="absolute top-0 right-50" />
    </div>
  );
}
