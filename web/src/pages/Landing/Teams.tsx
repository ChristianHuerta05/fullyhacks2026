import PhotoPlaceholder from "../../assets/LandingPage/Teams/PhotoPlaceholder.svg";
import Fish from "../../assets/LandingPage/Teams/Fish.svg";
export function Teams() {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-100 w-full relative mt-5">
      <img
        src={PhotoPlaceholder}
        alt="PhotoPlaceholder"
        className="absolute top-0 z-[-1] w-[100px] h-[100px]"
      />
      <img src={Fish} alt="Fish" className="absolute top-0 z-[-1] w-[100px] h-[100px]" />
      Our Team
    </div>
  );
}
