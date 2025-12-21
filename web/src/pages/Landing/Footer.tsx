import ACM from "../../assets/LandingPage/Footer/ACM.svg";
import Arrow from "../../assets/LandingPage/Footer/Arrow.svg";
import Discord from "../../assets/LandingPage/Footer/Discord.svg";
import LinkedIn from "../../assets/LandingPage/Footer/LinkedIn.svg";
import Instagram from "../../assets/LandingPage/Footer/Instagram.svg";

const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

export function Footer() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-end text-slate-100 w-full relative mt-5 mb-2">
      <div className="relative inline-block flex justify-center items-center space-y-0">
        <p className="text-[2rem] text-[#BEF3FC] font-nemo">Contact Us</p>
        <p className="text-[1rem] font-bold text-white">fullyhacks@gmail.com</p>
      </div> 

      <div className="relative inline-block flex flex-row space-x-6 pt-[15em]">
        <div className="relative inline-block">
          <a target="_blank" href="https://www.linkedin.com/company/fullyhacks/">
            <img src={LinkedIn} alt="LinkedIn" className="hidden top-0 z-[-1] w-[1.5em] h-[1.5em]" />
          </a>
        </div>  
      
        <div className="relative inline-block">
          <a target="_blank" href="https://www.instagram.com/fullyhacks/">
            <img src={Instagram} alt="Instagram" className="top-0 z-[-1] w-[1.5em] h-[1.5em]" />
          </a>
        </div>

        <div className="relative inline-block">
          <a target="_blank" href="https://acmcsuf.com/">
            <img src={Discord} alt="Discord" className="top-0 z-[-1] w-[1.5em] h-[1.5em]" />
          </a>
        </div>

        <div className="relative inline-block">
          <a target="_blank" href="https://acmcsuf.com/">
            <img src={ACM} alt="ACM" className="top-0 z-[-1] w-[1.5em] h-[1.5em]" />
          </a>
        </div>
      </div>

      <div className="relative inline-block flex flex-row space-x-1 pt-[0.5rem]">
        <div className="relative inline-block">
          <p className="text-[1rem] text-[#BEF3FC] font-nemo text-shadow-sm">Back to Top</p>
        </div>
        <div className="relative inline-block">
          <button onClick={scrollToTop}>
            <img src={Arrow} alt="Arrow" className="top-0 z-[-1] w-[1em] h-[1em]" />
          </button>
        </div>
      </div>

      <div className="bottom-0 w-full pt-[1rem] text-center">
        <p className="text-[0.5rem] text-white">© 2026 FullyHacks. All Rights Reserved.</p>
      </div>
    </div>
  );
}
