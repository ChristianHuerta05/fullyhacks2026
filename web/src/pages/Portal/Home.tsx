import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";

const TODO_ITEMS = [
  { label: "Join the FullyHacks Discord", link: "https://discord.gg/N6yykApS6h" },
  {
    label: "Claim your Free $100 Credits from Neon",
    link: "https://console.neon.tech/app/?promo=fully-hacks-2026-with-neon",
  },
  { label: "Find teammates in #team-finding" },
  {
    label: "Review the hackathon rules & code of conduct",
    link: "https://github.com/MLH/mlh-policies/tree/main",
  },
  { label: "Check out the event schedule" },
  { label: "Brainstorm project ideas" },
];

interface HomeProps {
  uid: string;
  firstName: string;
  lastName: string;
}

export function Home({ uid, firstName, lastName }: HomeProps) {
  const [showBanner, setShowBanner] = useState(() => {
    return localStorage.getItem("fullyhacks-banner-dismissed") !== "true";
  });
  const [showQR, setShowQR] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem("fullyhacks-banner-dismissed", "true");
  };

  useEffect(() => {
    if (showQR && canvasRef.current) {
      const qrData = JSON.stringify({
        uid,
        firstName,
        lastName,
      });
      QRCode.toCanvas(canvasRef.current, qrData, {
        width: 256,
        margin: 2,
        color: {
          dark: "#246B8A",
          light: "#FFFFFF",
        },
      });
    }
  }, [showQR, uid, firstName, lastName]);

  return (
    <div className="w-full h-full px-6 md:px-20 pt-10 md:pt-20 pb-20 flex flex-col gap-8 items-center md:items-start">
      <h1 className="font-nemo text-4xl md:text-7xl text-[#BEF3FC] text-center md:text-left">
        home
      </h1>

      {showBanner && (
        <div
          className="w-full max-w-2xl rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            background: "rgba(53, 120, 167, 0.5)",
            border: "3px solid #EFEFEF",
            boxShadow: "10px 10px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-baloo text-xl md:text-2xl text-[#EFEFEF] font-bold">
              Congratulations!
            </h2>
            <p className="font-baloo text-sm md:text-base text-[#EFEFEF]/80">
              You have been accepted to FullyHacks 2026! This is your hacker portal. Check back here
              for all event info, your QR code, and more.
            </p>
          </div>
          <button
            onClick={dismissBanner}
            className="font-baloo text-sm px-4 py-2 rounded-xl border-2 border-[#EFEFEF]/50 text-[#EFEFEF]/70 hover:bg-[#EFEFEF]/10 transition-colors cursor-pointer whitespace-nowrap self-end sm:self-center"
          >
            Dismiss
          </button>
        </div>
      )}

      <button
        onClick={() => setShowQR(true)}
        className="font-baloo text-lg md:text-xl px-8 py-4 rounded-2xl bg-[#72D6E6] text-[#246B8A] hover:bg-[#5bc0d0] transition-colors cursor-pointer font-bold w-full max-w-2xl"
        style={{ boxShadow: "6px 6px 0px rgba(0, 0, 0, 0.2)" }}
      >
        Open Your QR Code
      </button>

      <div
        className="w-full max-w-2xl rounded-2xl p-6 md:p-8 flex flex-col gap-4"
        style={{
          background: "rgba(53, 120, 167, 0.5)",
          border: "3px solid #EFEFEF",
          boxShadow: "10px 10px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <h2 className="font-baloo text-xl md:text-2xl text-[#EFEFEF] font-bold">
          Event Location & Parking
        </h2>
        <ul className="flex flex-col gap-4">
          <li className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="font-baloo text-base md:text-lg font-bold text-[#EFEFEF]">
                CSUF Address:
              </span>
              <span className="font-baloo text-sm md:text-base hover:text-[#72D6E6] underline">
                <a
                  href="https://maps.app.goo.gl/ubCjexiBagyiwmRd6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  800 N State College Blvd, Fullerton, CA 92831
                </a>
              </span>
            </div>
          </li>
          <li className="flex flex-col gap-1">
            <div className="flex flex-col gap-3">
              <span className="font-baloo text-base md:text-lg font-bold text-[#EFEFEF]">
                Event Buildings:
              </span>
            </div>
            <div className="font-baloo text-sm md:text-base text-[#EFEFEF]/90">
              <p>
                <b>Mihaylo Hall (SGMH)</b> for Check-in and Opening/Closing Ceremonies
              </p>
              <p>
                <b>Computer Science Building (CS)</b> for Hacking/Workshops/Judging
              </p>
            </div>
          </li>
          <li className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="font-baloo text-base md:text-lg font-bold text-[#EFEFEF]">
                Parking{" "}
                <span className="text-[#72D6E6] text-sm mt-1">
                  (<b>Free</b> on weekends)
                </span>
              </span>
            </div>
            <div className="font-baloo text-sm md:text-base text-[#EFEFEF]/90">
              <p>
                Park in lots <b>E1</b>, <b>Eastside North Parking Structure</b> (ENPS), or{" "}
                <b>Eastside South Parking Structure</b> (ESPS). Reference the map below for lot
                locations.
              </p>
            </div>
          </li>
          <li className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="font-baloo text-base md:text-lg font-bold text-[#EFEFEF]">
                Campus Map
              </span>
            </div>
            <div className="font-baloo text-sm md:text-base text-[#EFEFEF]/90">
              <span className="font-baloo text-sm md:text-base hover:text-[#72D6E6] underline">
                <a
                  href="https://parking.fullerton.edu/_resources/pdfs/campus-parking-map.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Access the CSUF Campus Map here!{" "}
                </a>
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div
        className="w-full max-w-2xl rounded-2xl p-6 md:p-8 flex flex-col gap-4"
        style={{
          background: "rgba(53, 120, 167, 0.5)",
          border: "3px solid #EFEFEF",
          boxShadow: "10px 10px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <h2 className="font-baloo text-xl md:text-2xl text-[#EFEFEF] font-bold">To Do</h2>
        <ul className="flex flex-col gap-3">
          {TODO_ITEMS.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="text-[#72D6E6] text-lg">•</span>
              <span className="font-baloo text-sm md:text-base text-[#EFEFEF]/90">
                {item.link ? (
                  <span className="font-baloo text-sm md:text-base hover:text-[#72D6E6] underline">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  </span>
                ) : (
                  item.label
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {showQR &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0, 0, 0, 0.8)" }}
            onClick={() => setShowQR(false)}
          >
            <div
              className="relative bg-white rounded-3xl p-8 md:p-12 flex flex-col items-center gap-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl cursor-pointer font-bold leading-none"
              >
                ✕
              </button>

              <h2 className="font-baloo text-2xl text-[#246B8A] font-bold">Your QR Code</h2>

              <canvas ref={canvasRef} className="rounded-2xl" />

              <div className="flex flex-col items-center gap-1">
                <p className="font-baloo text-lg text-[#246B8A] font-semibold">
                  {firstName} {lastName}
                </p>
                <p className="font-baloo text-xs text-gray-400 select-all">{uid}</p>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
