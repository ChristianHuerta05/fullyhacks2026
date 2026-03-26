import { useState } from "react";
import GameMachineBase from "../../assets/LandingPage/Sponsors/GameMachineBase.svg";
import GameMachineGlass from "../../assets/LandingPage/Sponsors/GameMachineGlass.svg";
import GameMachineTop from "../../assets/LandingPage/Sponsors/GameMachineTop.svg";
import Hoop from "../../assets/LandingPage/Sponsors/Hoop.svg";
import Bubbles from "../../assets/LandingPage/Sponsors/Bubbles.svg";
import Fush from "../../assets/LandingPage/Sponsors/Fush.svg";
import PufferFish from "../../assets/LandingPage/Sponsors/PufferFish.svg";

const sponsors = [
  {
    label: "dittoai",
    texture: "/sponsors/DittoAi.webp",
    alt: "Ditto AI",
    href: "https://ditto.ai/",
    rel: "nofollow",
  },
  {
    label: "figma",
    texture: "/sponsors/Figma.webp",
    alt: "Figma",
    href: "https://www.figma.com/",
    rel: "nofollow",
  },
  {
    label: "incogni",
    texture: "/sponsors/incogni.webp",
    alt: "Incogni – Data Broker Removal Service",
    href: "https://incogni.com/",
    rel: "nofollow",
  },
  {
    label: "nexosai",
    texture: "/sponsors/nexosai.webp",
    alt: "nexos.ai – All-in-one AI Platform",
    href: "https://nexos.ai/",
    rel: "nofollow",
  },
  {
    label: "acm",
    texture: "/sponsors/ACM.webp",
    alt: "ACM at CSUF",
    href: "https://acmcsuf.com/",
    rel: "nofollow",
  },
  {
    label: "nordpass",
    texture: "/sponsors/NordPass.webp",
    alt: "NordPass – Password Manager",
    href: "https://nordpass.com/",
    rel: "nofollow",
  },
  {
    label: "nordprotect",
    texture: "/sponsors/NordProtect.webp",
    alt: "NordProtect – Identity Theft Protection",
    href: "https://nordprotect.com/",
    rel: "nofollow",
  },
  {
    label: "nordvpn",
    texture: "/sponsors/NordVPN.webp",
    alt: "NordVPN – Secure VPN Service",
    href: "https://nordvpn.com/hackathons",
    rel: "nofollow sponsored",
  },
  {
    label: "saily",
    texture: "/sponsors/Saily.webp",
    alt: "Saily – eSIM Data for Travel",
    href: "https://saily.com/",
    rel: "nofollow",
  },
  {
    label: "neon",
    texture: "/sponsors/Neon.webp",
    alt: "Neon - Fast Postgres Databases",
    href: "https://neon.com/",
    rel: "nofollow",
  },
  {
    label: "esri",
    texture: "/sponsors/Esri.webp",
    alt: "Esri - Geographic Information System (GIS) Software",
    href: "https://www.esri.com/",
    rel: "nofollow",
  },
];

export function Sponsors() {
  const [bubblesTrigger, setBubblesTrigger] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);

  const handleLaunch = () => {
    if (isCooldown) return;
    setBubblesTrigger((prev) => prev + 1);
    setIsCooldown(true);
    setTimeout(() => setIsCooldown(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-slate-100 w-full relative md:mt-15 mt-8 md:gap-15 gap-6">
      <h1 className="xl:text-[146px] md:text-[86px] text-[56px] font-nemo leading-none text-[#BEF3FC]">
        Sponsors
      </h1>

      <div className="relative align-center justify-center flex flex-col w-full md:w-auto sm:px-4 px-8 md:px-10 mt-3 sm:mt-0">
        <img
          src={GameMachineTop}
          alt="Game Machine Top"
          className="md:w-full left-1/2 -translate-x-1/2 md:mx-auto absolute sm:-top-10 -top-5 z-20"
        />

        <div className="relative w-fit mx-auto">
          <div className="relative">
            <img
              src={GameMachineGlass}
              alt="Game Machine Glass"
              className="block mx-auto md:w-[600px] w-full h-auto pointer-events-none select-none relative -z-20"
            />

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
              <img
                src={Hoop}
                alt="Hoop"
                className="absolute animate-float-twist w-24 sm:w-32 md:w-40 opacity-70"
                style={{ top: "25%", left: "15%", animationDelay: "0s", animationDuration: "10s" }}
              />
              <img
                src={Hoop}
                alt="Hoop"
                className="absolute animate-float-twist w-20 sm:w-28 md:w-36 opacity-60"
                style={{ top: "60%", left: "70%", animationDelay: "-3s", animationDuration: "12s" }}
              />
              <img
                src={Hoop}
                alt="Hoop"
                className="absolute animate-float-twist w-16 sm:w-24 md:w-32 opacity-50"
                style={{ top: "45%", left: "45%", animationDelay: "-7s", animationDuration: "14s" }}
              />
            </div>

            {(() => {
              const positions = [
                { left: "8%", top: "12%", widthClass: "w-20 sm:w-28 md:w-36" },
                { left: "70%", top: "7%", widthClass: "w-20 sm:w-28 md:w-36" },
                { left: "40%", top: "10%", widthClass: "w-24 sm:w-32 md:w-40" },
                { left: "62%", top: "30%", widthClass: "w-30 sm:w-32 md:w-50" },
                { left: "30%", top: "35%", widthClass: "w-16 sm:w-20 md:w-28" },
                { left: "32%", top: "47%", widthClass: "w-32 sm:w-40 md:w-52" },
                { left: "6%", top: "70%", widthClass: "w-24 sm:w-32 md:w-40" },
                { left: "60%", top: "75%", widthClass: "w-30 sm:w-40 md:w-52" },
                { left: "38%", top: "80%", widthClass: "w-20 sm:w-28 md:w-36" },
                { left: "65%", top: "48%", widthClass: "w-30 sm:w-40 md:w-52" },
                { left: "5%", top: "42%", widthClass: "w-20 sm:w-28 md:w-36" },
              ];
              return (
                <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
                  {sponsors.map((sponsor, i) => (
                    <a
                      key={sponsor.label}
                      href={sponsor.href}
                      target="_blank"
                      rel={sponsor.rel}
                      className="pointer-events-auto absolute"
                      style={{
                        left: positions[i].left,
                        top: positions[i].top,
                        animationDelay: `${i * 0.35}s`,
                      }}
                    >
                      <img
                        src={sponsor.texture}
                        alt={sponsor.alt}
                        className={`h-auto object-contain animate-float drop-shadow-lg hover:scale-110 transition-transform duration-200 ${positions[i].widthClass}`}
                      />
                    </a>
                  ))}
                </div>
              );
            })()}

            <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
              {bubblesTrigger > 0 && (
                <img
                  key={bubblesTrigger}
                  src={Bubbles}
                  alt="Bubbles"
                  className="absolute bottom-0 left-5 w-[90%] animate-bubble-float opacity-0"
                />
              )}
            </div>
          </div>
        </div>

        <div className={`cursor-pointer transition-all duration-300`} onClick={handleLaunch}>
          <img src={GameMachineBase} alt="Game Machine Base" className="full mx-auto" />
        </div>
      </div>

      <div className="flex justify-between w-full md:px-30 px-6">
        <img src={PufferFish} alt="PufferFish" className="md:w-1/7 sm:w-1/5 w-0" />
        <img src={Fush} alt="Fish" className="md:w-1/2 sm:w-2/5 w-[1100px]" />
      </div>
    </div>
  );
}
