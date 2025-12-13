import { useState, useEffect, useRef } from "react";
import Ceiling from "../../assets/LandingPage/Header/Ceiling.svg";
import MLH from "../../assets/LandingPage/Header/MLH.svg";
import Logo from "../../assets/FullyHacksLogo.svg";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 300);
  };

  const isCollapsed = isScrolled && !isHovered;

  return (
    <div className="flex items-center justify-center text-slate-100 w-full relative py-12 h-[200px]">
      <img src={Ceiling} alt="Ocean Ceiling" className="absolute top-0 z-[-1] w-screen" />

      <img src={MLH} alt="MLH Logo" className="absolute top-0 z-[-1] right-10" />
      <img src={Logo} alt="FullyHacks Logo" className="absolute top-7 z-[-1] left-10 w-40" />

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out
          flex items-center justify-center rounded-full bg-[#2EB2EF]/30 backdrop-blur-[100px] border border-[#6EF1FA] font-nemo
          
          ${
            isCollapsed
              ? "top-4 w-16 h-16 p-0 rounded-full cursor-pointer"
              : "top-15 w-auto py-3 px-8 gap-10 lg:text-3xl md:text-xl text-lg"
          }
        `}
      >
        <div className="absolute -inset-10 bg-transparent -z-10" />

        {isCollapsed ? (
          <div className="animate-in fade-in zoom-in duration-300">
            <img src={Logo} alt="Menu" className="w-10 h-10 object-contain" />
          </div>
        ) : (
          <div className="flex gap-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <button className="rounded-full bg-[#BEF3FC]/37 backdrop-blur-2xl py-3 px-6 whitespace-nowrap">
              about
            </button>
            <button className="rounded-full py-3 px-6 font-nemo whitespace-nowrap hover:scale-105 transition-transform">
              sponsor
            </button>
            <button className="rounded-full py-3 px-6 font-nemo whitespace-nowrap hover:scale-105 transition-transform">
              team
            </button>
            <button className="rounded-full py-3 px-6 font-nemo whitespace-nowrap hover:scale-105 transition-transform">
              faq
            </button>
            <button className="rounded-full py-3 px-6 font-nemo whitespace-nowrap hover:scale-105 transition-transform">
              user portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
