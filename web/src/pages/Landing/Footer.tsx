import ACM from "../../assets/LandingPage/Footer/ACM.svg";
import Arrow from "../../assets/LandingPage/Footer/Arrow.svg";
import Discord from "../../assets/LandingPage/Footer/Discord.svg";
import LinkedIn from "../../assets/LandingPage/Footer/LinkedIn.svg";
import Instagram from "../../assets/LandingPage/Footer/Instagram.svg";

export function Footer() {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-100 w-full relative mt-5 ">
      <img src={ACM} alt="ACM" className="absolute top-0 z-[-1] w-[100px] h-[100px]" />
      <img src={Arrow} alt="Arrow" className="absolute top-0 z-[-1] w-[100px] h-[100px]" />
      <img src={Discord} alt="Discord" className="absolute top-0 z-[-1] w-[100px] h-[100px]" />
      <img src={LinkedIn} alt="LinkedIn" className="absolute top-0 z-[-1] w-[100px] h-[100px]" />
      <img src={Instagram} alt="Instagram" className="absolute top-0 z-[-1] w-[100px] h-[100px]" />
      Footer
    </div>
  );
}
