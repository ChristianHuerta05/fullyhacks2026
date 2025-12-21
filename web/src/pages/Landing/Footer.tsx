import ACM from "../../assets/LandingPage/Footer/ACM.svg";
import Arrow from "../../assets/LandingPage/Footer/Arrow.svg";
import Discord from "../../assets/LandingPage/Footer/Discord.svg";
import LinkedIn from "../../assets/LandingPage/Footer/LinkedIn.svg";
import Instagram from "../../assets/LandingPage/Footer/Instagram.svg";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export function Footer() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-end md:justify-center lg:justify-start text-slate-100 w-full relative mt-5 mb-2">
      <div className="relative inline-block flex justify-center items-center">
        <p className="text-[2em] md:text-[3em] lg:text-[4em] text-[#BEF3FC] font-nemo">
          Contact Us
        </p>
        <p className="text-[1em] md:text-[1.5em] lg:text-[2em] font-bold text-white">
          fullyhacks@gmail.com
        </p>
      </div>

      <div className="relative inline-block flex flex-row space-x-6 md:space-x-9 lg:space-x-12 pt-[10em] md:pt-60 lg:pt-80">
        <div className="relative inline-block">
          <a target="_blank" href="https://www.linkedin.com/company/fullyhacks/">
            <img
              src={LinkedIn}
              alt="LinkedIn"
              className="hidden top-0 z-[-1] w-[1.5em] md:w-9 lg:w-12 h-[1.5em] md:h-9 lg:h-12"
            />
          </a>
        </div>

        <div className="relative inline-block">
          <a target="_blank" href="https://www.instagram.com/fullyhacks/">
            <img
              src={Instagram}
              alt="Instagram"
              className="top-0 z-[-1] w-[1.5em] md:w-9 lg:w-12 h-[1.5em] md:h-9 lg:h-12"
            />
          </a>
        </div>

        <div className="relative inline-block">
          <a target="_blank" href="https://acmcsuf.com/">
            <img
              src={Discord}
              alt="Discord"
              className="top-0 z-[-1] w-[1.5em] md:w-9 lg:w-12 h-[1.5em] md:h-9 lg:h-12"
            />
          </a>
        </div>

        <div className="relative inline-block">
          <a target="_blank" href="https://acmcsuf.com/">
            <img
              src={ACM}
              alt="ACM"
              className="top-0 z-[-1] w-[1.5em] md:w-9 lg:w-12 h-[1.5em] md:h-9 lg:h-12"
            />
          </a>
        </div>
      </div>

      <div className="relative inline-block flex flex-row space-x-1 lg:space-x-2 pt-[0.5rem] md:pt-3 lg:pt-4">
        <div className="relative inline-block">
          <p className="text-[1em] md:text-[1.25em] lg:text-[1.5em] text-[#BEF3FC] font-nemo text-shadow-sm">
            Back to Top
          </p>
        </div>

        <div className="relative inline-block">
          <button onClick={scrollToTop}>
            <img
              src={Arrow}
              alt="Arrow"
              className="top-0 z-[-1] w-[1em] md:w-6 lg:w-8 h-[1em] md:h-6 lg:h-8"
            />
          </button>
        </div>
      </div>

      <div className="bottom-0 w-full pt-[1rem] md:pt-6 lg:pt-8 text-center">
        <p className="text-[0.5rem] md:text-[0.625rem] lg:text-[0.75rem] text-white">
          © 2026 FullyHacks. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
