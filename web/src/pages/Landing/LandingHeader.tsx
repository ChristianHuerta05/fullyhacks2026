import { useState, useEffect, useRef } from "react";
import Ceiling from "../../assets/LandingPage/Header/Ceiling.svg";
import Logo from "../../assets/FullyHacksLogo.svg";

const NAV_ITEMS = [
  { id: "about", label: "about" },
  { id: "sponsors", label: "sponsor" },
  { id: "team", label: "team" },
  { id: "faq", label: "faq" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const closeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.15 },
    );

    for (const item of NAV_ITEMS) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const isCollapsed = isScrolled && !isHovered;

  return (
    <div className="flex items-center justify-center text-slate-100 w-full relative py-12 h-[200px]">
      <img src={Ceiling} alt="Ocean Ceiling" className="absolute top-0 z-[-1] w-full" />

      <img src={Logo} alt="FullyHacks Logo" className="absolute top-7 z-[-1] left-10 w-40" />

      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-[2ms] ease-in-out
          flex items-center justify-center rounded-full bg-[#2EB2EF]/30 backdrop-blur-[100px] border border-[#6EF1FA] font-nemo
          
          ${
            isCollapsed
              ? "top-4 w-16 h-16 p-0 rounded-full cursor-pointer"
              : "top-15 w-auto py-3 px-8 gap-10 lg:text-3xl md:text-xl text-lg"
          }
        `}
      >
        <div
          className={`absolute bg-transparent -z-10 ${isCollapsed ? "-inset-4" : "-inset-[-2]"}`}
        />

        <div
          className={`transition-all duration-300 ${
            isCollapsed
              ? "opacity-100 scale-100"
              : "opacity-0 scale-50 absolute pointer-events-none"
          }`}
        >
          <img src={Logo} alt="Menu" className="w-10 h-10 object-contain" />
        </div>

        <div
          className={`flex gap-10 transition-all duration-300 ${
            isCollapsed
              ? "opacity-0 translate-y-2 absolute pointer-events-none"
              : "opacity-100 translate-y-0"
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`rounded-full py-3 px-6 whitespace-nowrap hover:scale-105 transition-all cursor-pointer ${
                activeSection === item.id ? "bg-[#BEF3FC]/37 backdrop-blur-2xl" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
          <button className="rounded-full py-3 px-6 font-nemo whitespace-nowrap hover:scale-105 transition-transform cursor-pointer">
            user portal
          </button>
        </div>
      </div>
    </div>
  );
}
