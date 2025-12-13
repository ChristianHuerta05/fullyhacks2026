import JellyFishGroup from "../../assets/LandingPage/AboutUs/JellyFishGroup.svg";

export function AboutUs() {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-100 w-full relative mt-5 bg-slate-900">
      <img src={JellyFishGroup} alt="JellyFishGroup" className="w-full absolute top-0" />
    </div>
  );
}
