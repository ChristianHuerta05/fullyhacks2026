import { useEffect, useRef, useState } from "react";
import type { ParticipantData } from "./types";

interface NameSearchProps {
  participants: ParticipantData[];
  onSelect: (participant: ParticipantData) => void;
}

export function NameSearch({ participants, onSelect }: NameSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ParticipantData[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      const q = query.toLowerCase();
      setResults(
        participants
          .filter((p) => `${p.firstName} ${p.lastName}`.toLowerCase().includes(q))
          .slice(0, 8),
      );
    }, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, participants]);

  const handleSelect = (p: ParticipantData) => {
    setQuery("");
    setResults([]);
    onSelect(p);
  };

  return (
    <div className="w-full relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a name to search..."
        className="w-full px-4 py-3 rounded-xl font-baloo text-[#EFEFEF] text-lg placeholder-[#EFEFEF]/40 outline-none"
        style={{
          background: "rgba(53, 120, 167, 0.35)",
          border: "1.5px solid rgba(239,239,239,0.3)",
        }}
        autoFocus
      />

      {results.length > 0 && (
        <ul
          className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-20"
          style={{
            background: "rgba(22, 52, 116, 0.97)",
            border: "1.5px solid rgba(239,239,239,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {results.map((p) => (
            <li
              key={p.userId}
              onClick={() => handleSelect(p)}
              className="px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors border-b border-white/10 last:border-0"
            >
              <p className="font-baloo text-[#EFEFEF] text-lg">
                {p.firstName} {p.lastName}
              </p>
              {p.school && <p className="font-baloo text-[#EFEFEF]/60 text-sm">{p.school}</p>}
            </li>
          ))}
        </ul>
      )}

      {query.trim() && results.length === 0 && (
        <p className="mt-2 font-baloo text-[#EFEFEF]/50 text-sm text-center">No results found</p>
      )}
    </div>
  );
}
