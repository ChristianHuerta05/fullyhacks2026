import { CHECK_IN_TYPES } from "./types";
import type { ParticipantData } from "./types";

interface CheckInStatsProps {
  participants: ParticipantData[];
}

export function CheckInStats({ participants }: CheckInStatsProps) {
  const total = participants.length;

  if (total === 0) {
    return (
      <p className="font-baloo text-[#EFEFEF]/50 text-center py-4">No accepted participants yet</p>
    );
  }

  return (
    <div>
      <p className="font-baloo text-[#EFEFEF]/70 text-sm mb-3">
        Total accepted: <span className="text-[#EFEFEF] font-bold">{total}</span>
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {CHECK_IN_TYPES.map((type) => {
          const count = participants.filter((p) => !!p[type.key]).length;
          const pct = Math.round((count / total) * 100);

          return (
            <div
              key={type.key}
              className="rounded-xl p-3 flex flex-col gap-1"
              style={{
                background: "rgba(53, 120, 167, 0.25)",
                border: "1.5px solid rgba(239,239,239,0.15)",
              }}
            >
              <div className={`w-3 h-3 rounded-full ${type.bg}`} />
              <p className="font-baloo text-[#EFEFEF]/80 text-sm leading-tight">{type.label}</p>
              <p className="font-baloo text-[#EFEFEF] text-2xl font-bold">{count}</p>
              <p className="font-baloo text-[#EFEFEF]/50 text-xs">
                {pct}% of {total}
              </p>
              {/* progress bar */}
              <div className="w-full h-1.5 rounded-full bg-white/10 mt-1">
                <div
                  className={`h-1.5 rounded-full ${type.bg} transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
