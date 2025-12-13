import { useState, useEffect } from "react";
import HeroMountains from "../../assets/LandingPage/Hero/HeroMountains.svg";
import SchoolOfFish from "../../assets/LandingPage/Hero/SchoolofFish.svg";
import FullyHacksText from "../../assets/LandingPage/Hero/FullyHacksText.svg";
import Bottle from "../../assets/LandingPage/Hero/Bottle.svg";

export function Hero() {
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-01-31T23:59:59") - +new Date();
    if (difference > 0) {
      return {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
      };
    }
    return { d: 0, h: 0, m: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center text-slate-100 w-full relative mt-5">
      <img src={HeroMountains} alt="Hero Mountains" className="w-full absolute top-0 -z-20" />
      <img src={SchoolOfFish} alt="School of Fish" className="absolute top-10 right-10" />
      <img src={FullyHacksText} alt="Fully Hacks Text" className="w-2/3 mb-25" />

      <div className="relative flex flex-col items-center justify-center animate-float mb-25">
        <h1 className="text-[90px] text-[#BEF3FC] font-nemo text-shadow-sm z-20 -mb-8">
          cd building: csuf cs 24-25
        </h1>

        <div className="relative z-10 flex flex-col items-center justify-center py-20 px-55">
          <img
            src={Bottle}
            alt="Bottle Background"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[140%] w-auto max-w-none -z-10 pointer-events-none"
          />

          <h1 className="font-picture text-[80px] md:text-[120px] leading-none -translate-x-35">
            {timeLeft.d}d : {timeLeft.h}h : {timeLeft.m}m
          </h1>

          <h1 className="font-bagel text-blue-200 text-[30px] md:text-[60px] leading-none -mt-2 md:-mt-4 -translate-x-35">
            until applications close
          </h1>
        </div>
      </div>
      <div>
        <button className="shadow-[0px_4px_4px_rgba(255,255,255,0.25)] font-bagel text-[48px] font-bold px-5 py-3 rounded-3xl cursor-pointer backdrop-blur-[100px]">
          Sponsor Us
        </button>
        <button className="shadow-[0px_4px_4px_rgba(255,255,255,0.25)] font-bagel text-[48px] font-bold px-5 py-3 rounded-3xl cursor-pointer backdrop-blur-[100px]">
          Apply
        </button>
      </div>
    </div>
  );
}
