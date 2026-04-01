import { useState } from "react";
import bubblesL from "../../assets/PortalPage/Shared/bubblesL.svg";
import bubblesR from "../../assets/PortalPage/Shared/bubblesR.svg";
import plant from "../../assets/PortalPage/Shared/plant.svg";
import FullyHacksLogo from "../../assets/FullyHacksLogo.svg";
import discordLogo from "../../assets/PortalPage/Shared/discordLogo.svg";

import { Home } from "./Home";
import { Events } from "./Events";
import { JudgeInfo } from "./JudgeInfo";
import { TracksPrizes } from "./TracksPrizes";
import { Fullypacks } from "./Fullypacks";
import { FAQ } from "./FAQ";
import { Resources } from "./Resources";
import { Profile } from "./Profile";

interface UserPortalPageProps {
  displayName: string;
  onSignOut: () => void;
}

const NAV_ITEMS = [
  { key: "home", label: "home" },
  { key: "judges information", label: "judges information" },
  { key: "events", label: "events" },
  { key: "tracks and prizes", label: "tracks and prizes" },
  { key: "fullypacks", label: "fullypacks" },
  { key: "resources", label: "resources" },
  { key: "faq", label: "faq" },
  { key: "profile", label: "profile" },
];

export function UserPortalPage({ displayName, onSignOut }: UserPortalPageProps) {
  const [currentPage, setCurrentPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  return (
    <div
      className="flex flex-col lg:flex-row w-full h-full min-h-dvh min-w-dvw relative"
      style={{ background: "linear-gradient(180deg, #2EB2EF 0%, #163474 100%)" }}
    >
      <img
        src={plant}
        className="absolute bottom-0 right-0 w-[200px] lg:w-[400px] pointer-events-none"
      />
      <img
        src={bubblesL}
        className="absolute bottom-50 left-20 w-[80px] pointer-events-none hidden lg:block"
      />
      <img
        src={bubblesR}
        className="absolute top-20 right-20 w-[100px] pointer-events-none hidden lg:block"
      />

      {!menuOpen && (
        <div className="lg:hidden flex items-center justify-between px-4 py-3 relative z-30">
          <button onClick={() => setMenuOpen(true)} className="text-[#EFEFEF] cursor-pointer p-2">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 6H21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M3 18H21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>

          <img src={FullyHacksLogo} className="w-[120px]" />

          <div className="w-11" />
        </div>
      )}

      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 p-8 overflow-hidden"
          style={{ background: "linear-gradient(180deg, #2EB2EF 0%, #163474 100%)" }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 left-4 text-[#EFEFEF] cursor-pointer p-2"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <img src={FullyHacksLogo} className="w-[90px] mb-4" />

          <p className="font-baloo text-2xl text-[#EFEFEF] text-center">Welcome, {displayName}</p>

          <ul className="flex flex-col items-center font-baloo text-3xl gap-5 mt-4">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.key}
                onClick={() => navigateTo(item.key)}
                className={`cursor-pointer transition-colors ${currentPage === item.key ? "text-[#69CEC3]" : "text-[#EFEFEF]"}`}
              >
                {item.label}
              </li>
            ))}
          </ul>

          <button
            className="font-baloo text-2xl cursor-pointer text-[#EFEFEF]/70 mt-4"
            onClick={onSignOut}
          >
            Sign Out
          </button>

          <div className="bg-[#72D6E6] h-[4px] w-48 mt-4 rounded-full" />

          <a
            href="https://acmcsuf.com/"
            className="font-baloo text-xl mt-2 flex flex-row gap-3 items-center"
          >
            <img src={discordLogo} className="w-[40px]" />
            <p className="whitespace-nowrap text-2xl text-[#EFEFEF]">Discord Server</p>
          </a>
        </div>
      )}

      <div className="hidden lg:flex flex-col items-end pl-20 shrink-0">
        <img src={FullyHacksLogo} className="w-[250px] self-center pb-10 pt-10" />
        <p className="font-baloo text-4xl whitespace-nowrap pb-10 self-center">
          Welcome, {displayName}
        </p>

        <ul className="flex flex-col items-end font-baloo text-4xl gap-6">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.key}
              onClick={() => navigateTo(item.key)}
              className={`cursor-pointer transition-colors ${currentPage === item.key ? "text-[#69CEC3]" : ""}`}
            >
              {item.label}
            </li>
          ))}
          <button className="font-baloo text-3xl cursor-pointer" onClick={onSignOut}>
            Sign Out
          </button>
        </ul>
        <div className="bg-[#72D6E6] h-[5px] w-full mt-6 rounded-full" />
        <a
          href="https://acmcsuf.com/"
          className="font-baloo text-2xl mt-6 flex flex-row gap-5 items-center self-center"
        >
          <img src={discordLogo} className="w-[60px]" />
          <p className="whitespace-nowrap text-4xl">Discord Server</p>
        </a>
      </div>

      <div className="flex flex-col items-center flex-1 min-w-0 z-10 overflow-y-auto">
        {currentPage === "home" && <Home />}
        {currentPage === "judges information" && <JudgeInfo />}
        {currentPage === "events" && <Events />}
        {currentPage === "tracks and prizes" && <TracksPrizes />}
        {currentPage === "fullypacks" && <Fullypacks />}
        {currentPage === "resources" && <Resources />}
        {currentPage === "faq" && <FAQ />}
        {currentPage === "profile" && <Profile />}
      </div>
    </div>
  );
}
