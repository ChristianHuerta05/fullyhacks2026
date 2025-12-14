import JellyFishGroup from "../../assets/LandingPage/AboutUs/JellyFishGroup.svg";
import Frame from "../../assets/LandingPage/AboutUs/Frame.svg";
export function AboutUs() {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-100 w-full relative mt-60 ">
      <img src={JellyFishGroup} alt="JellyFishGroup" className="w-full h-auto top-0" />
      <img src={Frame} alt="Frame" className="absolute top-0 z-[-1] w-[100px] h-[100px]" />
    </div>
  );
}
