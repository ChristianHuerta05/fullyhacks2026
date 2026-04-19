import { CHECK_IN_TYPES } from "./types";
import type { ParticipantData } from "./types";

interface CheckInStatsProps {
  participants: ParticipantData[];
  onRefresh: () => void;
  refreshing: boolean;
}

const FOOD_LABELS: Record<string, string> = {
  none: "No Preference",
  vegetarian: "Vegetarian",
  vegan: "Vegan",
  halal: "Halal",
  kosher: "Kosher",
  "gluten-free": "Gluten Free",
  other: "Other",
};

export function CheckInStats({ participants, onRefresh, refreshing }: CheckInStatsProps) {
  const total = participants.length;
  const checkedInCount = participants.filter((p) => !!p.checkedIn).length;
  const notCheckedIn = total - checkedInCount;
  const checkInRate = total > 0 ? Math.round((checkedInCount / total) * 100) : 0;

  const foodCounts = participants.reduce<Record<string, number>>((acc, p) => {
    const key = p.foodChoice?.toLowerCase() ?? "none";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const foodCheckedInCounts = participants
    .filter((p) => !!p.checkedIn)
    .reduce<Record<string, number>>((acc, p) => {
      const key = p.foodChoice?.toLowerCase() ?? "none";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});

  const foodEntries = Object.entries(foodCounts)
    .map(([key, count]) => ({
      key,
      label: FOOD_LABELS[key] ?? key,
      count,
      checkedInCount: foodCheckedInCounts[key] ?? 0,
    }))
    .sort((a, b) => b.checkedInCount - a.checkedInCount);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="font-baloo text-[#EFEFEF]/70 text-sm">
          Total accepted: <span className="text-[#EFEFEF] font-bold">{total}</span>
        </p>
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-baloo text-sm font-semibold cursor-pointer transition-all duration-150 disabled:opacity-60"
          style={{ background: "rgba(53, 120, 167, 0.4)", color: "#EFEFEF" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={refreshing ? "animate-spin" : ""}
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
          {refreshing ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {total === 0 ? (
        <p className="font-baloo text-[#EFEFEF]/50 text-center py-4">
          No accepted participants yet
        </p>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Accepted", value: total, color: "text-[#EFEFEF]" },
              { label: "Checked In", value: checkedInCount, color: "text-blue-400" },
              { label: "Not Arrived", value: notCheckedIn, color: "text-orange-400" },
              { label: "Check-in Rate", value: `${checkInRate}%`, color: "text-green-400" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-3 flex flex-col gap-1"
                style={{
                  background: "rgba(53, 120, 167, 0.25)",
                  border: "1.5px solid rgba(239,239,239,0.15)",
                }}
              >
                <p className="font-baloo text-[#EFEFEF]/60 text-xs leading-tight">{item.label}</p>
                <p className={`font-baloo text-2xl font-bold ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Meal check-ins */}
          <div>
            <p className="font-baloo text-[#EFEFEF]/60 text-xs uppercase tracking-wider mb-2">
              Meal &amp; Event Check-ins
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
                    <p className="font-baloo text-[#EFEFEF]/80 text-sm leading-tight">
                      {type.label}
                    </p>
                    <p className="font-baloo text-[#EFEFEF] text-2xl font-bold">{count}</p>
                    <p className="font-baloo text-[#EFEFEF]/50 text-xs">
                      {pct}% of {total}
                    </p>
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

          {/* Dietary preferences */}
          {foodEntries.length > 0 && (
            <div>
              <p className="font-baloo text-[#EFEFEF]/60 text-xs uppercase tracking-wider mb-2">
                Dietary Preferences
              </p>
              <div
                className="rounded-xl p-4 flex flex-col gap-3"
                style={{
                  background: "rgba(53, 120, 167, 0.25)",
                  border: "1.5px solid rgba(239,239,239,0.15)",
                }}
              >
                {/* column headers */}
                <div className="flex items-center gap-3">
                  <p className="font-baloo text-[#EFEFEF]/40 text-xs w-32 shrink-0" />
                  <p className="flex-1 font-baloo text-[#EFEFEF]/40 text-xs">
                    of {checkedInCount} checked in
                  </p>
                  <p className="font-baloo text-[#EFEFEF]/40 text-xs w-16 text-right">/ accepted</p>
                </div>
                {foodEntries.map(({ key, label, count, checkedInCount: foodCheckedIn }) => {
                  const pctOfCheckedIn =
                    checkedInCount > 0 ? Math.round((foodCheckedIn / checkedInCount) * 100) : 0;
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <p className="font-baloo text-[#EFEFEF]/80 text-sm w-32 shrink-0">{label}</p>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full bg-[#2EB2EF] transition-all duration-500"
                            style={{ width: `${pctOfCheckedIn}%` }}
                          />
                        </div>
                        <p className="font-baloo text-[#EFEFEF] text-sm font-bold w-6 text-right">
                          {foodCheckedIn}
                        </p>
                      </div>
                      <p className="font-baloo text-[#EFEFEF]/40 text-xs w-16 text-right">
                        / {count}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
