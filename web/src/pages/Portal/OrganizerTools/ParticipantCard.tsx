import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CHECK_IN_TYPES } from "./types";
import type { CheckInType, ParticipantData } from "./types";

interface ParticipantCardProps {
  participant: ParticipantData;
  onCheckIn: (userId: string, type: CheckInType) => Promise<void>;
}

export function ParticipantCard({ participant, onCheckIn }: ParticipantCardProps) {
  const [confirming, setConfirming] = useState<CheckInType | null>(null);
  const [loading, setLoading] = useState<CheckInType | null>(null);

  const handleCheckIn = async (type: CheckInType) => {
    if (participant[type] || loading) return;
    setLoading(type);
    try {
      await onCheckIn(participant.userId, type);
      setConfirming(type);
      setTimeout(() => setConfirming(null), 1500);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div
      className="rounded-2xl p-5 w-full"
      style={{
        background: "rgba(53, 120, 167, 0.35)",
        border: "1.5px solid rgba(239,239,239,0.3)",
        boxShadow: "6px 6px 0px rgba(0,0,0,0.2)",
      }}
    >
      <div className="mb-4">
        <p className="font-baloo text-2xl text-[#EFEFEF] font-bold">
          {participant.firstName} {participant.lastName}
        </p>
        {participant.school && (
          <p className="font-baloo text-[#EFEFEF]/80 text-lg">{participant.school}</p>
        )}
        {participant.major && (
          <p className="font-baloo text-[#EFEFEF]/60 text-base">{participant.major}</p>
        )}
        {participant.foodChoice && participant.foodChoice !== "no-preference" && (
          <p className="font-baloo text-yellow-300 text-sm mt-1">Food: {participant.foodChoice}</p>
        )}
        <p className="font-baloo text-[#EFEFEF]/40 text-xs mt-1 break-all">{participant.userId}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {CHECK_IN_TYPES.map((type) => {
          const isDone = !!participant[type.key];
          const isLoading = loading === type.key;
          const isConfirming = confirming === type.key;

          return (
            <button
              key={type.key}
              onClick={() => handleCheckIn(type.key)}
              disabled={isDone || isLoading}
              className={`
                relative flex flex-col items-center px-3 py-2 rounded-xl font-baloo text-sm font-semibold
                transition-all duration-200 min-w-[110px] justify-center
                ${isDone ? "cursor-not-allowed bg-gray-700 text-white/40" : `${type.bg} ${type.hoverBg} ${type.text} cursor-pointer active:scale-95`}
              `}
            >
              <AnimatePresence mode="wait">
                {isConfirming && (
                  <motion.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="text-white text-base leading-none mb-0.5"
                  >
                    ✓
                  </motion.span>
                )}
              </AnimatePresence>
              <span>{isLoading ? "..." : type.label}</span>
              {isDone && (
                <span className="text-white/50 text-xs font-normal leading-tight">
                  already scanned
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
