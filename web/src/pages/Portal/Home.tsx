import { useState } from "react";

const TODO_ITEMS = [
  { id: 1, label: "Join the Discord server", defaultChecked: false },
  { id: 2, label: "Fill out your profile information", defaultChecked: false },
  { id: 3, label: "Find teammates in #team-finding", defaultChecked: false },
  { id: 4, label: "Review the hackathon rules & code of conduct", defaultChecked: false },
  { id: 5, label: "Check the event schedule", defaultChecked: false },
  { id: 6, label: "Set up your development environment", defaultChecked: false },
  { id: 7, label: "Brainstorm project ideas", defaultChecked: false },
  { id: 8, label: "RSVP for the opening ceremony", defaultChecked: false },
];

export function Home() {
  const [showBanner, setShowBanner] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
              🎉 Congratulations!
            </h2>
            <p className="font-baloo text-sm md:text-base text-[#EFEFEF]/80">
              You have been accepted to FullyHacks 2026! This is your hacker portal. Check back here
              for all event info, your QR code, and more.
            </p>
          </div>
          <button
            onClick={() => setShowBanner(false)}
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
        <h2 className="font-baloo text-xl md:text-2xl text-[#EFEFEF] font-bold">To Do</h2>
        <ul className="flex flex-col gap-3">
          {TODO_ITEMS.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-6 h-6 min-w-6 rounded-md border-2 border-[#72D6E6] flex items-center justify-center cursor-pointer transition-colors"
                style={{
                  background: checkedItems.has(item.id) ? "#72D6E6" : "transparent",
                }}
              >
                {checkedItems.has(item.id) && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7L5.5 10.5L12 3.5"
                      stroke="#246B8A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              <span
                className={`font-baloo text-sm md:text-base transition-all ${
                  checkedItems.has(item.id) ? "text-[#EFEFEF]/40 line-through" : "text-[#EFEFEF]/90"
                }`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
        <p className="font-baloo text-xs text-[#EFEFEF]/40 mt-2">
          {checkedItems.size} / {TODO_ITEMS.length} completed
        </p>
      </div>

      {showQR && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
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

            <div
              className="w-56 h-56 md:w-64 md:h-64 rounded-2xl flex items-center justify-center"
              style={{ background: "#E5E7EB" }}
            >
              <p className="font-baloo text-base text-gray-400 text-center px-4">
                QR Code Placeholder
              </p>
            </div>

            <p className="font-baloo text-sm text-gray-500 text-center">
              Show this at check-in to get your badge
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
