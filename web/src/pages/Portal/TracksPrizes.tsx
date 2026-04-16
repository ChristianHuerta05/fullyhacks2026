import prizebox from "../../assets/PortalPage/Shared/prizebox.svg";
import arrow from "../../assets/PortalPage/Shared/nextarrow.svg";
import { useState } from "react";

const TRACKS = [
  {
    title: "Best Entertainment",
    description:
      "Build a project that captivates your audience through immersive gaming, creative digital media, or a unique interactive storytelling experience.",
  },
  {
    title: "Best Health & Wellness",
    description:
      "Develop a solution that empowers individuals to improve their lives, focusing on physical fitness, mental well-being, or medical accessibility.",
  },
  {
    title: "Best Education & Social Justice",
    description:
      "Create a tool that breaks down barriers to learning or directly addresses systemic inequities to champion a fairer society.",
  },
  {
    title: "Best Social Impact & Sustainability",
    description:
      "Engineer a hack that tackles urgent global challenges, from protecting our environment to driving meaningful change in your local community.",
  },
  {
    title: "Best Use of AI/ML",
    description:
      "AI is the defining frontier of our generation, so dig deep and build an intelligent system, not just a simple wrapper, that uses data-driven insights to solve complex problems in ways we haven’t seen before.",
  },
  {
    title: "Best Beginner Project",
    description:
      "Jump into the deep end for your first hackathon by focusing on learning new skills, documenting your journey, and shipping a functional foundation. (Team must be >50% first-time hackers)",
  },
  {
    title: "Most Technical",
    description:
      "Flex your engineering muscles by architecting a high-performance system defined by complex back-end logic, sophisticated integrations, and robust code.",
  },
  {
    title: "Best UI/UX",
    description:
      "Prioritize the human at the other side of the screen by designing a seamless, beautiful, and intuitive interface that makes navigation feel like second nature.",
  },
  {
    title: "Esri's Sponsored Track",
    description: "More info coming soon...",
  },
  {
    title: "MLH Track",
    description: "More info coming soon...",
  },
];

const prizes = [
  {
    track: "Best Entertainment",
    prize: "/prizes/entertainment.webp",
    title: "8BitDo Retro Joystick and Mechanical Keyboard",
  },
  {
    track: "Best Health & Wellness",
    prize: "/prizes/health_wellness.webp",
    title: "Amazon Echo Dot",
  },
  {
    track: "Best Education & Social Justice",
    prize: "/prizes/best_education.webp",
    title:
      "Sony WH-CH520 Wireless Headphones + 1-year subscription for NordVPN, NordPass, NordProtect, and Incogni",
  },
  {
    track: "Best Social Impact & Sustainability",
    prize: "/prizes/social_impact_sustainability.webp",
    title: "Mini Projector + 1 GB of free data for Saily",
  },
  {
    track: "Best Use of AI/ML",
    prize: "/prizes/best_ai.webp",
    title:
      "CRUA 24” 240Hz Gaming Monitor + 3-month access and $235 credit for nexos.ai + $500 Neon credits",
  },
  {
    track: "Best Beginner",
    prize: "/prizes/best_beginner.webp",
    title: "LEGO Set - Creator 3 in 1 Sea Animals: Beautiful Dolphins",
  },
  {
    track: "Most Technical",
    prize: "/prizes/mice.webp",
    title: "Demon Slayer Themed Pulsar X2V2 Gaming Mouse + $1k Neon credits",
  },
  {
    track: "Best UI/UX",
    prize: "/prizes/best_uiux.webp",
    title: "Jellycat Amuseables Peanut Star Student Plushie",
  },
  {
    track: "Best Use of ArcGIS (Esri's Sponsored Track)",
    prize: "/prizes/best_arcgis.webp",
    title: "Esri Swag Bag + Portable Charger 50000mAh Power Bank",
  },
];

function TrackCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-1 sm:gap-3 bg-[#2162B1]/40 rounded-lg p-2 sm:p-5 justify-center items-center border-2 border-[#BEF3FC] min-h-[260px] min-w-[260px]">
      <h3 className="font-baloo text-sm sm:text-xl md:text-2xl lg:text-2xl text-[#EFEFEF] text-center leading-tight">
        {title}
      </h3>
      <p className="font-coheadline text-[0.6rem] leading-tight sm:text-sm md:text-base lg:text-base text-center sm:leading-snug">
        {description}
      </p>
    </div>
  );
}

function PrizeCard({ prize, title, track }: { prize: string; title: string; track: string }) {
  return (
    <div className="flex flex-col items-center w-full shrink-0 px-4 overflow-hidden">
      <div className="relative w-full max-w-2xl aspect-[16/10] mx-auto">
        <img
          src={prizebox}
          alt="Prize box"
          className="absolute -inset-x-8 w-full h-full object-fill"
        />
        <div className="absolute inset-0 flex items-center justify-center pl-[3%] pt-[15%]">
          <img
            src={prize}
            alt={title}
            className="max-w-[50%] max-h-[60%] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 text-center mt-4 w-3/4 sm:ml-6 md:ml-4">
        <h3 className="font-baloo text-xl md:text-2xl text-[#EFEFEF]">{title}</h3>
        <p className="font-coheadline text-base text-[#EFEFEF]/70">{track}</p>
      </div>
    </div>
  );
}

export function TracksPrizes() {
  const [prizeIndex, setPrizeIndex] = useState(0);

  const nextPrize = () => {
    setPrizeIndex((prev) => (prev + 1) % prizes.length);
  };

  const prevPrize = () => {
    setPrizeIndex((prev) => (prev - 1 + prizes.length) % prizes.length);
  };

  return (
    <div className="w-full px-4 md:px-10 lg:px-16 pt-10 md:pt-16 pb-20 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-nemo text-4xl md:text-6xl lg:text-7xl text-[#BEF3FC]">
          tracks and prizes
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-baloo text-xl md:text-2xl text-[#EFEFEF] font-semibold">Tracks</h2>
        <div
          className="grid gap-2 sm:gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
        >
          {TRACKS.map((track) => (
            <TrackCard key={track.title} title={track.title} description={track.description} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-baloo text-xl md:text-2xl text-[#EFEFEF] font-semibold">Prizes</h2>
        <div
          className="rounded-2xl p-5"
          style={{
            background: "rgba(53, 120, 167, 0.3)",
            border: "1px solid rgba(239, 239, 239, 0.2)",
          }}
        >
          {TRACKS.filter((track) => !track.main).map((track) => (
            <TrackCard key={track.title} title={track.title} description={track.description} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h2 className="font-baloo text-xl md:text-2xl text-[#EFEFEF] font-semibold">Prizes</h2>

        <div className="relative group max-w-5xl mx-auto w-full">
          <button
            onClick={prevPrize}
            className="absolute -left-5 md:left-[-50px] top-1/2 -translate-y-1/2 z-20 p-2 hover:scale-110 transition-transform"
            aria-label="Previous prize"
          >
            <img
              src={arrow}
              alt="Previous"
              className="w-10 h-10 md:w-12 md:h-12 transform rotate-180"
            />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${prizeIndex * 100}%)`,
              }}
            >
              {prizes.map((p, idx) => (
                <PrizeCard key={idx} prize={p.prize!} title={p.title!} track={p.track!} />
              ))}
            </div>
          </div>

          <button
            onClick={nextPrize}
            className="absolute -right-5 md:right-[-50px] top-1/2 -translate-y-1/2 z-20 p-2 hover:scale-110 transition-transform"
            aria-label="Next prize"
          >
            <img src={arrow} alt="Next" className="w-10 h-10 md:w-12 md:h-12" />
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-4">
          {prizes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPrizeIndex(idx)}
              className={`h-2 transition-all duration-300 rounded-full ${
                idx === prizeIndex ? "w-8 bg-[#BEF3FC]" : "w-2 bg-[#EFEFEF]/30"
              }`}
              aria-label={`Go to prize ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
